import axios from 'axios';
import { FETCH_USER, REGISTER_USER } from './types';

export const fetchUser = () => async (dispatch) => {
  // if an action creator returns a function instead of an action
  // redux-thunk will automatically call the return function
  // and pass in the /dispatch/ function as an argument
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const signupUser = (values, history) => async dispatch => {
  console.log('/signupUser/');
  const res = await axios.post('/api/register', values);
  //
  // history.push('/stacks');
  dispatch({ type: REGISTER_USER, payload: res.data });
}
