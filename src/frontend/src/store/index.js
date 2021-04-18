import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from '../reducers';

export default () => {
    const store = createStore(persistReducer({
        key: 'root',
        storage,
        whitelist: [
            'common',
            'items'
        ]
    }, reducers), {}, applyMiddleware(thunk));
    const persistor = persistStore(store);
    return {store, persistor}
}






