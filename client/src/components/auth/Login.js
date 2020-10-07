import React, { Fragment, useState } from "react";
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginAction} from '../../actions/login'
import {alert_action} from '../../actions/alert'
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
     return  <Redirect to="/dashboard"/>
  }

  return (
    <Fragment>
      <section className="container" onSubmit={onFormSubmit}>
          
        { props.alertdata.msg &&
            <div className="alert alert-danger">Invalid credentials</div>
        }
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
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
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    alertdata: PropTypes.object.isRequired,
  };


const mapStateToProps = (state) => {
    console.log(state.alertdata)
    return {
        isAuthenticated:  state.loginData.isLoggedIn,
        alertdata: state.alertdata
    }
}

export default connect(mapStateToProps, {loginAction, alert_action})(Login)
