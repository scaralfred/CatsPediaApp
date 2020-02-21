// Actions
export const INCREASE_OPEN_APP_COUNT = 'INCREASE_OPEN_APP_COUNT';
export const RESET_OPEN_APP_COUNT = 'RESET_OPEN_APP_COUNT';
export const APP_RATING_GIVEN = 'APP_RATING_GIVEN';
export const SET_TAB = 'SET_TAB';
export const SET_SEARCH = 'SET_SEARCH';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const CHANGE_MAIN_LAYOUT = 'CHANGE_MAIN_LAYOUT';
export const CHANGE_FAVORITES_LAYOUT = 'CHANGE_FAVORITES_LAYOUT';
export const CHANGE_HEIGHT_UNIT_OF_MEASURE = 'CHANGE_HEIGHT_UNIT_OF_MEASURE';
export const CHANGE_WEIGHT_UNIT_OF_MEASURE = 'CHANGE_WEIGHT_UNIT_OF_MEASURE';
export const CHANGE_SHOW_FLICKR = 'CHANGE_SHOW_FLICKR';
export const CHANGE_SHOW_YOUTUBE = 'CHANGE_SHOW_YOUTUBE';
export const CHANGE_SHOW_INSTAGRAM = 'CHANGE_SHOW_INSTAGRAM';
export const SET_INITIAL_FILTERS = 'SET_INITIAL_FILTERS';
export const SET_FILTERS = 'SET_FILTERS';
export const RESET_FILTERS = 'RESET_FILTERS';
export const CLEAR_SEARCH_FIELD = 'CLEAR_SEARCH_FIELD'; 
export const SORT_BY_CRITERIA = 'SORT_BY_CRITERIA'; 

// THEMES //
import { themes } from '../../styles/themes';

// INITIAL FILTERS //
import breeds from '../../../scraper/breeds';
import { isIos } from '../../lib/util';

const minHeight = Math.min(...breeds.map(el => el.heightRange && el.heightRange.min ? el.heightRange.min : null ));
const maxHeight = Math.max(...breeds.map(el => el.heightRange && el.heightRange.max ? el.heightRange.max : null));
const minWeight = Math.min(...breeds.map(el => el.weightRange && el.weightRange.min ? el.weightRange.min : null));
const maxWeight = Math.max(...breeds.map(el => el.weightRange && el.weightRange.max ? el.weightRange.max : null));

// Settings Reducer
const initialState = {
    appOpenCount: 0,
    appRatingGiven: false,
    tab: 0,
    theme: themes['white'],
    search: '',
    favorites: [],
    breedGroups: [...new Set(breeds.map(el => el.breedGroup))],
    sortBy: 'name',
    filters: { 
        heightRange: [minHeight, maxHeight],
        weightRange: [minWeight, maxWeight],
        lifeSpan: [1, 20],
        selectedBreedGroups: [],
        selectedClubs: []
    },
    initialFilters: { 
        heightRange: [minHeight, maxHeight],
        weightRange: [minWeight, maxWeight],
        lifeSpan: [1, 20],
        selectedBreedGroups: [], 
        selectedClubs: []
    },
    settings: {
        heightUnitOfMeasure: 'Cm',
        weightUnitOfMeasure: 'Kg',
        mainLayout: '3',
        favoritesLayout: '2',
        showFlickr: true,
        showYoutube: false,
        showInstagram: true
    }
}

export default globalReducer = (state = initialState, action) => {
    switch (action.type) {

        // GLOBAL //
        case INCREASE_OPEN_APP_COUNT:
        return { ...state, appOpenCount: state.appOpenCount + 1 };
        
        case RESET_OPEN_APP_COUNT:
        return { ...state, appOpenCount: 0 };

        case APP_RATING_GIVEN:
        return { ...state, appRatingGiven: true };

        case SET_TAB:
        return { ...state, tab: action.payload };

        case SET_SEARCH:
        return { ...state, search: action.payload };

        case ADD_TO_FAVORITES:
        return { ...state, favorites: state.favorites.concat(action.payload) };

        case REMOVE_FROM_FAVORITES:
        return { ...state, favorites: state.favorites.filter((elem) => elem !== action.payload) };
        
        // FILTERS //
        case SET_INITIAL_FILTERS:
        return { ...state, initialFilters: { ...state.initialFilters, heightRange: [minHeight,maxHeight], weightRange: [minWeight,maxWeight]} };

        case SET_FILTERS:
        return { ...state, filters: action.payload };

        case RESET_FILTERS:
        return { ...state, filters: state.initialFilters };

        case CLEAR_SEARCH_FIELD:
        return { ...state, search: '' };

        case SORT_BY_CRITERIA:
        return { ...state, sortBy: action.payload };

        // SETTINGS //
        case CHANGE_MAIN_LAYOUT:
        return { ...state, settings: {...state.settings, mainLayout: action.payload } };

        case CHANGE_FAVORITES_LAYOUT:
        return { ...state, settings: {...state.settings, favoritesLayout: action.payload } };

        case CHANGE_HEIGHT_UNIT_OF_MEASURE:
        return { ...state, settings: {...state.settings, heightUnitOfMeasure: action.payload } };

        case CHANGE_WEIGHT_UNIT_OF_MEASURE:
        return { ...state, settings: {...state.settings, weightUnitOfMeasure: action.payload } };

        case CHANGE_SHOW_FLICKR:
        return { ...state, settings: {...state.settings, showFlickr: !state.settings.showFlickr } };

        case CHANGE_SHOW_YOUTUBE:
        return { ...state, settings: {...state.settings, showYoutube: !state.settings.showYoutube } };

        case CHANGE_SHOW_INSTAGRAM:
        return { ...state, settings: {...state.settings, showInstagram: !state.settings.showInstagram } };

        default:
        return state;
    }
}