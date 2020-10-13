import React, { Fragment, useState } from "react";
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginAction} from '../../actions/login'

import PropTypes from 'prop-types';



const Login = (props) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const formOnChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value})
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    props.loginAction(loginData)
 
  }

  if(props.isAuthenticated){
      return <Redirect to='/dashboard'/>
  }



  return (
    <Fragment>
      <section className="landing login-container" onSubmit={onFormSubmit}>
          <div className="container">
        { props.alertdata.msg &&
            <div className="alert alert-danger">Invalid credentials</div>
        }
        <h1 className="large text-center">SIGN IN</h1>
        <p className="lead text-center">
          <i className="fas fa-user"></i> SIGN IN TO YOUR ACCOUNT
        </p>
        <div className="form-container">
      
        <form className="form" action="dashboard.html">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={loginData.email}
              onChange = {e =>  formOnChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange = {e =>  formOnChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary pink-btn align-center" value="Login" />
          <p className="my-1 text-center white-color pull-right">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
        </form>
        </div>
        </div>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    alertdata: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        isAuthenticated:  state.loginData.isLoggedIn,
        alertdata: state.alertdata,
    }
}

export default connect(mapStateToProps, {loginAction})(Login)
