import moment from "moment";
import { generateUniqueId } from "../../lib/util";

// Actions
export const SCAN_IMAGE_TROUGH_SERVER_REQUEST = 'SCAN_IMAGE_TROUGH_SERVER_REQUEST';
export const SCAN_IMAGE_TROUGH_SERVER_SUCCESS = 'SCAN_IMAGE_TROUGH_SERVER_SUCCESS';
export const SCAN_IMAGE_TROUGH_SERVER_ERROR = 'SCAN_IMAGE_TROUGH_SERVER_ERROR';
export const REMOVE_ITEM_FROM_HISTORY = 'REMOVE_ITEM_FROM_HISTORY';

// Settings Reducer
const initialState = {
    scanImageThroughServerRequest: false,
    scanResult: null,
    scanImageThroughServerError: false,
    scanHistory: []
}


export default scannerReducer = (state = initialState, action) => {

    switch (action.type) {

        case SCAN_IMAGE_TROUGH_SERVER_REQUEST:
        return { ...state, scanImageThroughServerRequest: true, scanImageThroughServerError: false, scanResult: null };

        case SCAN_IMAGE_TROUGH_SERVER_SUCCESS:
        return { ...state, scanResult: action.payload, scanImageThroughServerRequest: false, scanHistory: [...state.scanHistory, {result: action.payload, timeStamp: moment(), id: generateUniqueId()}] };

        case SCAN_IMAGE_TROUGH_SERVER_ERROR:
        return { ...state, scanImageThroughServerError: action.payload, scanImageThroughServerRequest: false };

        case REMOVE_ITEM_FROM_HISTORY:
        return { ...state, scanHistory: state.scanHistory.filter((item) => item.id !== action.payload) };

        default:
        return state;

    }
}