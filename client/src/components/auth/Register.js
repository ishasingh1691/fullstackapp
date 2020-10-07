import React, { Fragment, useState } from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {registerAction} from '../../actions/register'
import {alert_action} from '../../actions/alert'
import Alert from '../Alert'


const Register = (props) => {

 const [formData, setFormData] = useState({
     name: '',
     email: '',
     password: '',
     password2:''
 });  

 const setFormState =  (e) => {
    return setFormData({...formData, [e.target.name]: e.target.value})
 }

 const formSubmit = e => {
   console.log(props)
     e.preventDefault();
     if(formData.password !== formData.password2){
        props.alert_action({msg:'Password did not match', type:"danger"});
     }
     else{
      props.registerAction(formData)  
      setFormData({name:'', email: '', password:'', password2:'' })
      props.history.push('/login')
     }
 }

  return (
    <Fragment>

      { props.alertMsg &&
        <Alert message = {props.alertMsg.msg} type = {props.alertMsg.type}></Alert>
      }
    
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={e => formSubmit(e)}>
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange = {e => setFormState(e)}  required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value = {formData.email} onChange= {e => setFormState(e)} />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value= {formData.password}
              onChange = {e => setFormState(e)}
              minLength="6"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={formData.password2}
              onChange= {e => setFormState(e)}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    alertMsg : state.alertdata
  }
}

export default connect(mapStateToProps, {registerAction, alert_action})(Register)


