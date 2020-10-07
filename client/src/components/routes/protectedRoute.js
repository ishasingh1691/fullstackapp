import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {loginAction} from '../../actions/login'
import {connect} from 'react-redux'

const ProtectedRoute = ({component: Component, isLoggedIn , ...rest}) => {
    return <Route {...rest} render={(props) => isLoggedIn ? (<Component {...props}/>) : (<Redirect to='/login'/>)}/>
}

const mapStatetoProps = (state) => {
    return {isLoggedIn: state.loginData.isLoggedIn}
}

export default connect(mapStatetoProps, {loginAction})(ProtectedRoute)
