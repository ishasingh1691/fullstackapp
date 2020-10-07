import {CREATE_PROFILE} from './types'
import axios from '../axios'

export const CreateProfileAction = (profileData) => async (dispatch) => {
    await axios.post('/profile/', profileData);

    dispatch({
        type: CREATE_PROFILE
    })
    
}