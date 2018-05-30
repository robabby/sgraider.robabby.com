import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import loginFields from './config/loginFields.js';
import * as actions from '../../actions';

import LoginField from './LoginField';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import BtnGoogleSignin from '../../assets/images/btn_google_signin.png';

class LoginForm extends Component {
  state = {
    submitted: false,
    username: '',
    email: '',
    name: '',
    loginFailed: null
  }
  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  renderLoginFields() {
    return _.map(loginFields, ({ type, label, name, testVal }) => {
      return (
        <Field
          key={name}
          component={LoginField}
          type={type}
          label={label}
          name={name}
          testVal={testVal}
        />
      );
    });
  }

  renderErrors() {
    // let { success } = this.props.auth;
    // if (!success) {
    //   return (
    //     <div>
    //       {this.props.auth.message}
    //     </div>
    //   )
    // }
  }

  async handleFormSubmit(values) {
    console.log(this.props.auth);
    let { history } = this.props;
    this.setState({
      submitted: true
    });
    this.props.loginUser(values, history);
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(values => this.handleFormSubmit(values))}
        >
          {this.renderLoginFields()}
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
          {this.renderErrors()}
        </form>
        {/* <div>
          <a href="/auth/google">
            <img src={BtnGoogleSignin} />
          </a>
        </div> */}
        <div style={{marginTop: 15}}>
          <a
            href="/auth/discord"
            className={'login-submit'}
          >
            Signup with Discord
          </a>
        </div>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  return errors;
}

function mapStateToProps(state) {
  return state;
}

LoginForm = connect(
  mapStateToProps,
  actions
)(withRouter(LoginForm));

export default reduxForm({
  form: 'loginForm', // required property
  validate
})(LoginForm);
