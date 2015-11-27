import React, { Component, PropTypes } from 'react'
import selector from '../selectors/options'
import { connect } from 'react-redux'
import { changeTrailStyle, changeRegionsVisibility } from '../actions'
import IconButton from 'material-ui/lib/icon-button'
import Icon from 'material-ui/lib/svg-icons/navigation/menu'
import LeftNav from 'material-ui/lib/left-nav'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ListDivider from 'material-ui/lib/lists/list-divider'
import SelectField from 'material-ui/lib/select-field'
import Toggle from 'material-ui/lib/toggle'
import Colors from 'material-ui/lib/styles/colors'
import Avatar from 'material-ui/lib/avatar'

const STYLES = {
    ICON_BUTTON: {
        position: 'fixed',
        right: 15,
        top: 15,
        zIndex: 1,
    },
}
const actions = {
    changeTrailStyle,
    changeRegionsVisibility,
}

@connect(selector, actions)
export default class OptionsPanelContainer extends Component {
    handleIconClick(event) {
        this.panel.toggle()
    }
    get panel() {
        return this.refs.panel
    }
    handleTrailStyleChange(event, index) {
        const { changeTrailStyle, trails } = this.props

        changeTrailStyle(trails.menuItems[index].payload)
    }
    renderTrailsSection() {
        const { trails, trailStyles } = this.props

        return (
            <List subheader='Trails'>
                <ListItem style={{paddingTop:0, paddingBottom:0}} disabled>
                    <SelectField style={{width:224}} onChange={::this.handleTrailStyleChange} {...trails} />
                </ListItem>
                {[...trailStyles].map(([value, color]) => (
                    <ListItem
                        leftAvatar={<Avatar backgroundColor={color}>T</Avatar>}
                        primaryText={value} />
                ))}
                <ListItem rightToggle={<Toggle value='show-trail-direction' defaultToggled />}>
                    Show trail directions
                </ListItem>
            </List>
        )
    }
    handleShowRegionToggle(event, toggled) {
        this.props.changeRegionsVisibility(toggled)
    }
    renderRegionsSection() {
        const { regionsVisibility } = this.props
        const toggle = (
            <Toggle
                value='show-regions'
                defaultToggled={regionsVisibility}
                onToggle={::this.handleShowRegionToggle} />
        )

        return (
            <List subheader='Regions'>
                <ListItem rightToggle={toggle}>
                    Show regions
                </ListItem>
            </List>
        )
    }
    render() {
        return (
            <div>
                <IconButton style={STYLES.ICON_BUTTON} onClick={::this.handleIconClick}>
                    <Icon />
                </IconButton>
                <LeftNav ref='panel' docked={false}>
                    {this.renderTrailsSection()}
                    <ListDivider />
                    {this.renderRegionsSection()}
                </LeftNav>
            </div>
        )
    }
}
