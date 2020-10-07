import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import {alert_action} from '../actions/alert'

const alertClass = (type) => {
   if(type === 'danger'){
       return 'alert-danger'
   }
   else if(type === 'success'){
       return 'alert-success'
   }
}

const Alert = (props) => {
    return (
        <Fragment>
            <div className={"alert " + alertClass(props.type) }>
                <h1>{props.message}</h1>
            </div>
        </Fragment>
    )
}

export default connect(null, {alert_action})(Alert)

