import { createSelector, createStructuredSelector } from 'reselect';
import { getSearchTerm, getRouter, getTrails, getRegions } from '../getters';
import Sifter from 'sifter';

const SIFTER_OPTIONS = {
    fields: ['title', 'description'],
    sort: [{
        field: 'title',
        direction: 'asc',
    },{
        field: 'description', 
        direction: 'asc',
    }],
    limit: 3
}

const getData = createStructuredSelector({
    trails: createSelector(getTrails, trails => trails.toArray()),
    regions: createSelector(getRegions, regions => regions.toArray()),
})

const getSifters = createStructuredSelector({
    trails: createSelector(getData, data => new Sifter(data.trails)),
    regions: createSelector(getData, data => new Sifter(data.regions)),
})

const items = createSelector(
    [getSearchTerm, getData, getSifters],
    (term, data, sifters) => {
        term = term || '';

        const trailResults = sifters.trails.search(term, SIFTER_OPTIONS)
        const regionResults = sifters.regions.search(term, SIFTER_OPTIONS)

        const trails = trailResults.items.map(item => data.trails[item.id]);
        const regions = regionResults.items.map(item => data.regions[item.id]);

        return [...trails, ...regions];
    }
)

export default createStructuredSelector({
    items,
    term: getSearchTerm,
})
