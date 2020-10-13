import {LOGIN_ACTION, LOGOUT_ACTION} from '../actions/types'


const INITIAL_STATE = {
    token:localStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('token') ? true : false
}

export const loginReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LOGIN_ACTION:
            return {...state, token:action.payload.token, data:{name: action.payload.name, avatar: action.payload.avatar, email: action.payload.email}, isLoggedIn: true}
        case LOGOUT_ACTION:
            return {...state, isLoggedIn: false, data: null, token:null}
        default:
            return state
    }
}