import React, { Component, PropTypes } from 'react'
import selector from '../selectors/search'
import { connect } from 'react-redux'
import { changeSearchTerm, fitMapToFeature } from '../actions'
import Paper from 'material-ui/lib/paper'
import TextField from 'material-ui/lib/text-field'
import IconButton from 'material-ui/lib/icon-button'
import ActionSearch from 'material-ui/lib/svg-icons/action/search'
import List from 'material-ui/lib/lists/list'
import ListDivider from 'material-ui/lib/lists/list-divider'
import ListItem from 'material-ui/lib/lists/list-item'
import Colors from 'material-ui/lib/styles/colors'
import { Link } from 'react-router'

const STYLES = {
    TOOLBAR: {
        position: 'fixed',
        left: 15,
        top: 15,
        zIndex: 1,
        backgroundColor: Colors.grey100,
    },
    FIELD: {
        paddingRight: '8px',
    },
    ICON_BUTTON: {
        verticalAlign: 'bottom',
    },
}
const actions = {
    changeSearchTerm,
    fitMapToFeature,
}

@connect(selector, actions)
export default class SearchContainer extends Component {
    state = {
        hasFocus: false
    }
    handleChange() {
        const term = this.refs.field.getValue()

        this.props.changeSearchTerm(term)
    }
    handleSearchClick() {
        this.refs.field.focus()
    }
    handleFieldFocus() {
        this.setState({ hasFocus: true })
    }
    handleFieldBlur() {
        setTimeout(() => {
            this.setState({ hasFocus: false })
        }, 150)
    }
    handleFeatureLinkClick(feature) {
        this.props.fitMapToFeature(feature)
    }
    renderList() {
        const { items } = this.props

        if (items.length === 0) {
            return null
        }

        return (
            <List>
                {items.map(item => {
                    const link = (
                        <Link to={`/${item.type}/${item.alias}`} onClick={this.handleFeatureLinkClick.bind(this, item)}>
                            {item.title}
                        </Link>
                    )
                    const props = {
                        linkButton: true,
                        primaryText: item.title,
                        containerElement: link,

                    }

                    return (
                        <ListItem {...props} />
                    )

                })}
            </List>
        )
    }
    render() {
        const { term } = this.props
        const { hasFocus } = this.state

        return (
            <Paper zDepth={2} style={{...STYLES.TOOLBAR, opacity: hasFocus ? 0.95 : 0.7}}>
                <IconButton
                    style={STYLES.ICON_BUTTON}
                    onClick={::this.handleSearchClick} >
                    <ActionSearch />
                </IconButton>
                <TextField
                    onFocus={::this.handleFieldFocus}
                    onBlur={::this.handleFieldBlur}
                    style={STYLES.FIELD}
                    ref='field'
                    value={term}
                    onChange={::this.handleChange}
                    hintText='Search a trail or a region' />
                {hasFocus && this.renderList()}
            </Paper>
        )
    }
}
