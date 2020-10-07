import {ALERT_ACTION} from '../actions/types'

export const alertReducer = (state = {}, action) => {

    switch(action.type){
        case ALERT_ACTION:
            return {...state, msg: action.payload.msg, type: action.payload.type}
        default:
            return state
    }
}