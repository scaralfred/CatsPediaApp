import { createStore, applyMiddleware } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk'
import { AsyncStorage } from 'react-native';

const config = { key: 'root', storage: AsyncStorage, blacklist: ['global'] }


import global from './global/globalReducer';
import scanner from './scanner/scannerReducer';

// Combine reducers
const reducers = persistCombineReducers(config, {
    global,
    scanner
});

const reduxStore = () => createStore(reducers, {}, applyMiddleware(thunk));

export default reduxStore;
