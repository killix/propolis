import { createSelector, createStructuredSelector } from 'reselect';
import { getFeature } from '../getters';
import * as TYPES from '../constants/feature-types';

export default createStructuredSelector({
    feature: getFeature,
})
