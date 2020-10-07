import {REGISTER_ACTION} from './types'
import axios from '../axios'
import {alert_action} from './alert'

export const registerAction = (registerData) => (dispatch) => {
    axios.post('/users/', registerData).then(response => {
        dispatch({
            type: REGISTER_ACTION,
            payload: {registerData, token:response.data.token}
        })
    }).catch(err => {
        dispatch(alert_action({msg: err.response.data.errors.msg, type:'danger'}))
    })
}