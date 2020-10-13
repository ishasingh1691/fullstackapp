import {CREATE_PROFILE, GET_PROFILE} from './types'
import axios from '../axios'
import history from '../history'

export const CreateProfileAction = (profileData) => async (dispatch) => {
    const response = await axios.post('/profile/', profileData);
    
    dispatch({
        type: CREATE_PROFILE,
        payload: response.data
    })
    
}

export const GetProfile = () =>  (dispatch) => {
    axios.get('/profile/me').then(response => {
        history.push('/dashboard')
        dispatch({
            type: GET_PROFILE,
            payload: response.data
        })
    }).catch(err => {
        history.push('/createProfile')
        console.log(err.response)
    });   
}

