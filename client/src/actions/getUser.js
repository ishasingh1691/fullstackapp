import axios from '../axios'
import {GET_LOGGEDIN_USER_ACTION} from './types'

export const getLoggedInUserAction = () => (dispatch) => {
    axios.get('/profile/me').then(res=> {
        dispatch({
            type: GET_LOGGEDIN_USER_ACTION,
            payload: res
        })
    }).catch(err => {
        console.log(err)
    })
}