import axios from 'axios';
import { FETCH_USER, SIGNUP_USER, LOGIN_USER } from './types';

export const fetchUser = () => async (dispatch) => {
  // if an action creator returns a function instead of an action
  // redux-thunk will automatically call the return function
  // and pass in the /dispatch/ function as an argument
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const signupUser = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/signup', values);
  history.push('/dashboard');
  dispatch({ type: SIGNUP_USER, payload: res.data });
}

export const loginUser = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/login', values);
  history.push('/dashboard');
  dispatch({ type: LOGIN_USER, payload: res.data });
}
