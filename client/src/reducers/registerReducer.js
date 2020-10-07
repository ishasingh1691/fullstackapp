import {REGISTER_ACTION} from '../actions/types';

export const registerReducer = (state = {}, action) => {
    switch (action.type){
        case REGISTER_ACTION:
            return {...state, data: action.payload}
        default:
            return state
    }
}