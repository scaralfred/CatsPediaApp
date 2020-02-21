import { 
    INCREASE_OPEN_APP_COUNT,
    RESET_OPEN_APP_COUNT,
    APP_RATING_GIVEN,
    SET_TAB,
    SET_SEARCH, 
    ADD_TO_FAVORITES, 
    REMOVE_FROM_FAVORITES, 
    CHANGE_MAIN_LAYOUT, 
    CHANGE_FAVORITES_LAYOUT,
    CHANGE_HEIGHT_UNIT_OF_MEASURE,
    CHANGE_WEIGHT_UNIT_OF_MEASURE,
    CHANGE_SHOW_FLICKR,
    CHANGE_SHOW_YOUTUBE,
    CHANGE_SHOW_INSTAGRAM,
    SET_INITIAL_FILTERS,
    SET_FILTERS,
    RESET_FILTERS,
    CLEAR_SEARCH_FIELD,
    SORT_BY_CRITERIA
} from "./globalReducer";

// GLOBAL //
export const increaseOpenAppCount = () => ({ type: INCREASE_OPEN_APP_COUNT});
export const resetOpenAppCount = () => ({ type: RESET_OPEN_APP_COUNT});
export const appRatingGiven = () => ({ type: APP_RATING_GIVEN});
export const setTab = (tabIndex) => ({ type: SET_TAB, payload: tabIndex});
export const setSearch = (text) => ({ type: SET_SEARCH, payload: text });
export const addToFavorites = (breedId) => ({ type: ADD_TO_FAVORITES, payload: breedId });
export const removeFromFavorites = (breedId) => ({ type: REMOVE_FROM_FAVORITES, payload: breedId }); 

// FILTERS //
export const setInitialFilters = () => ({ type: SET_INITIAL_FILTERS });
export const setFilters = (values) => ({ type: SET_FILTERS, payload: values });
export const resetFilters = () => ({ type: RESET_FILTERS });
export const clearSearchField = () => ({ type: CLEAR_SEARCH_FIELD });
export const sortByCriteria = (criteria) => ({ type: SORT_BY_CRITERIA, payload: criteria })

// SETTINGS
export const changeMainLayout = (layoutId) => ({ type: CHANGE_MAIN_LAYOUT, payload: layoutId });
export const changeFavoritesLayout = (layoutId) => ({ type: CHANGE_FAVORITES_LAYOUT, payload: layoutId });
export const changeHeightUnitOfMeasure = (heightUnitOfMeasure) => ({ type: CHANGE_HEIGHT_UNIT_OF_MEASURE, payload: heightUnitOfMeasure });
export const changeWeightUnitOfMeasure = (weightUnitOfMeasure) => ({ type: CHANGE_WEIGHT_UNIT_OF_MEASURE, payload: weightUnitOfMeasure });
export const changeShowFlickr = () => ({ type: CHANGE_SHOW_FLICKR });
export const changeShowYoutube = () => ({ type: CHANGE_SHOW_YOUTUBE });
export const changeShowInstagram = () => ({ type: CHANGE_SHOW_INSTAGRAM });