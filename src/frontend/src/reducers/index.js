import {combineReducers} from 'redux';

import common from './common'
import items from "./items";
import search from './search';

export default combineReducers({
    common,
    items,
    search
});