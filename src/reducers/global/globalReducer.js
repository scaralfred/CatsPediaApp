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


// Settings Reducer
const initialState = {
    appOpenCount: 0,
    appRatingGiven: false,
    tab: 0,
    theme: themes['white'],
    search: '',
    favorites: [],
    breedOrigin: [...new Set(breeds.map(el => el.origin).filter(elem => elem != "" && elem != null))],
    bodyType: [...new Set(breeds.map(el => el.bodyType).filter(elem => elem != "" && elem != null))],
    coatLength: [...new Set(breeds.map(el => el.coatLength).filter(elem => elem != "" && elem != null))],
    sortBy: 'name',
    filters: { 
        lifeSpan: [1, 20],
        selectedCoatLength: [],
        selectedBodyType: [],
        selectedBreedOrigin: [],
        selectedAssociations: []
    },
    initialFilters: { 
        lifeSpan: [1, 20],
        selectedCoatLength: [],
        selectedBodyType: [],
        selectedBreedOrigin: [], 
        selectedAssociations: []
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
        return { ...state, initialFilters: { ...state.initialFilters } };

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