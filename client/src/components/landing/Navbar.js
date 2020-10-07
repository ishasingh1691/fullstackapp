import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { loginAction, logoutAction } from "../../actions/login";
import { connect } from "react-redux";

const Navbar = (props) => {
  const logout = () => {
    props.logoutAction();
    props.history.push("/");
  };

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">login</Link>
      </li>
    </Fragment>
  );
  const authLinks = (
    <Fragment>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <button className="btn btn-primary" onClick={logout}>
          Logout
        </button>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <a href="profiles.html">Developers</a>
        </li>

        {props.data.isLoggedIn === true ? authLinks : guestLinks}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  loginAction: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    data: state.loginData,
  };
};

export default connect(mapStateToProps, { loginAction, logoutAction })(Navbar);
