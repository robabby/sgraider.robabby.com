import { FETCH_USER, SIGNUP_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case SIGNUP_USER:
      return action.payload;
    default:
      return state;
  }
}
