import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import signupFields from './config/signupFields.js';
import * as actions from '../../actions';

import SignupField from './SignupField';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginForm extends Component {
  state = {
    submitted: false,
    username: '',
    email: '',
    name: '',
  }
  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  renderSignupFields() {
    return _.map(signupFields, ({ type, label, name, testVal }) => {
      return (
        <Field
          key={name}
          component={SignupField}
          type={type}
          label={label}
          name={name}
          testVal={testVal}
        />
      );
    });
  }


  handleFormSubmit(values) {
    console.log(values);
    this.setState({
      submitted: true
    });
    this.props.signupUser(values);
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(values => this.handleFormSubmit(values))}
        >
          {this.renderSignupFields()}
          <div>
            <Button
              type="submit"
              variant="raised"
              color="primary"
              className={'login-submit'}
            >
              Submit
            </Button>
          </div>
        </form>
        <p>
          {this.state.submitted.toString()}
        </p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

LoginForm = connect(
  mapStateToProps,
  actions
)(LoginForm);

function validate(values) {
  const errors = {};

  return errors;
}

export default reduxForm({
  form: 'signupForm', // required property
  validate,
  destroyOnUnmount: false
})(LoginForm);
