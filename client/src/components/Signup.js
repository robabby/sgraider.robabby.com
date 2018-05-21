import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SignupForm from './signup/SignupForm';

import { signupUser } from '../actions';

class LoginForm extends Component {
  state = {
    submitted: false,
    username: '',
    email: '',
    firstName: '',
    lastName: ''
  }
  handleFormSubmit(prop) {
    this.setState({
      submitted: true
    });

    signupUser();
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <SignupForm
          onFormSubmit={() => this.handleFormSubmit()}
        />
        <p>
          {this.state.submitted.toString()}
        </p>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  return errors;
}

export default reduxForm({
  form: 'signupForm', // required property
  validate,
  destroyOnUnmount: false
})(LoginForm);
