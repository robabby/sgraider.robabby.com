import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import signupFields from './config/signupFields.js';
import * as actions from '../../actions';

import SignupField from './SignupField';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import BtnGoogleSignin from '../../assets/images/btn_google_signin.png';

class SignupForm extends Component {
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
    let { history } = this.props;
    console.log(values);
    this.setState({
      submitted: true
    });
    this.props.signupUser(values, history);
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
        <div>
          <a href="/auth/google">
            <img src={BtnGoogleSignin} />
          </a>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

SignupForm = connect(
  mapStateToProps,
  actions
)(withRouter(SignupForm));

function validate(values) {
  const errors = {};

  return errors;
}

export default reduxForm({
  form: 'signupForm', // required property
  validate,
  destroyOnUnmount: false
})(SignupForm);
