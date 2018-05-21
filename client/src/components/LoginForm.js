import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';

class LoginForm extends Component {
  render() {
    return (
      <div>
        Login
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  return errors;
}

export default reduxForm({
  form: 'loginForm', // required property
  validate,
  destroyOnUnmount: false
})(LoginForm);
