import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';
import SignupForm from './signup/SignupForm';

import { signupUser } from '../actions';

class Signup extends Component {
  state = {
    submitted: false,
    username: '',
    email: '',
    firstName: '',
    lastName: ''
  }

  render() {
    return (
      <div>
        <SignupForm />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(Signup);
