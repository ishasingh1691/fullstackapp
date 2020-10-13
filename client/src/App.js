import React, { Fragment } from 'react';
import './App.css';
import {Router, Route, Switch} from 'react-router-dom'

import Navbar from './components/landing/Navbar'
import Landing from './components/landing/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import ProtectedRoute from './components/routes/protectedRoute'
import CreateProfile from './components/dashboard/createProfile'
import history from './history'

  

function App(props) {
  return (
    
    <Router history={history}>
      <Fragment>
        <Route path="/" component={Navbar}/>
        <Route exact path="/" component={Landing}/>

       <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <ProtectedRoute path="/dashboard" component={Dashboard}/>
          <ProtectedRoute path="/createProfile" component={CreateProfile}/>
        </Switch>
      </Fragment>
    </Router>

  );
}
export default App;
