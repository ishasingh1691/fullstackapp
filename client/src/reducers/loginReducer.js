import {LOGIN_ACTION, LOGOUT_ACTION, GET_LOGGEDIN_USER_ACTION} from '../actions/types'


const INITIAL_STATE = {
    token:localStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('token') ? true : false
}

export const loginReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LOGIN_ACTION:
            return {...state, token: action.payload.token, name: action.payload.name, email:action.payload.email, avatar:action.payload.avatar, isLoggedIn: true}
        case LOGOUT_ACTION:
            return {...state, token: '', isLoggedIn: false}
        case GET_LOGGEDIN_USER_ACTION:
            return {...state, user:action.payload}
        default:
            return state
    }
}