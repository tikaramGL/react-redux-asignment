import { combineReducers } from 'redux';
import { headerReducer } from './header-reducer';

const allReducer = combineReducers({
    header: headerReducer,
})

export default allReducer