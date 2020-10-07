import {LOGIN_ACTION, LOGOUT_ACTION} from './types'
import axios from '../axios'
import {alert_action} from '../actions/alert'


export const loginAction = (logindata) => (dispatch) => {
    axios.post('/auth/', logindata).then(response => {

    localStorage.setItem('token', response.data.token)

    dispatch({
           type: LOGIN_ACTION,
           payload: response.data
    })
       
   }).catch(err => {
    dispatch(alert_action({msg: err.response.data.err.msg, type:'danger'}))
   })
}

export const logoutAction = () => {
    localStorage.clear()

    return{
        type: LOGOUT_ACTION
    }
}