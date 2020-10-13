import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import {loginAction} from '../../actions/login'
import {connect} from 'react-redux'

const Landing = ({isAuthenticated}) => {
  if(isAuthenticated){
    return <Redirect to="/dashboard"></Redirect>
  }

    return (
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h3>CONNECT WITH</h3>
            <h1 className="x-large">PASSIONATE DEVELOPERS</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help from
              other developers
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary pink-btn">Sign Up</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
    )
}

const MapStateToProps = (state) => {
  return{
    isAuthenticated : state.loginData.isLoggedIn
  }
}

export default connect(MapStateToProps, {loginAction})(Landing)
