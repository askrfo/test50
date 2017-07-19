import authentication from './authentication';

import { combineReducers } from 'redux';
import cart from './cart';

const reducers = combineReducers({
    authentication,
    cart
});

export default reducers;