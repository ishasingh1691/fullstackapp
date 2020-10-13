import {GET_PROFILE, CREATE_PROFILE, LOGOUT_ACTION} from '../actions/types'

export const ProfileReducer = (state = [], action) => {
    switch(action.type){
        case GET_PROFILE:
            return {...state, userProfile: action.payload}
        case CREATE_PROFILE:
            return {...state, userProfile: action.payload}
        case LOGOUT_ACTION:
            return {...state, userProfile: null}
        default:
            return state
    }
}