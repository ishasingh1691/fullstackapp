import {ALERT_ACTION} from './types'

export const alert_action = (alertData) => {
    return {
        type: ALERT_ACTION,
        payload: alertData
    }
}