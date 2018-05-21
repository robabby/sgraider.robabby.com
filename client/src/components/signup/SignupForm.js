import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginForm extends Component {
  state = {
    username: '',
    email: '',
    name: '',
  }
  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}
        >
          <div>
            <TextField
              id="email"
              label="Email"
              className={'email-input'}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
            />
          </div>
          <div>
            <TextField
              id="username"
              label="Username"
              className={'username-input'}
              value={this.state.username}
              onChange={this.handleChange('username')}
              margin="normal"
            />
          </div>
          <div>
            <TextField
              id="name"
              label="Name"
              className={'name-input'}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
          </div>
          <div>
            <Button type="submit" variant="raised" color="primary" className={'login-submit'}>
              Submit
            </Button>
          </div>
        </form>
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
