import {combineReducers} from 'redux';
import {registerReducer} from '../reducers/registerReducer'
import {alertReducer} from './alertReducer'
import {loginReducer} from './loginReducer'
import {ProfileReducer} from './Profile'

export default combineReducers({
    registerdata : registerReducer,
    alertdata : alertReducer,
    loginData: loginReducer,
    profile: ProfileReducer
});