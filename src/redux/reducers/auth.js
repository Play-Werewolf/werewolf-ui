import { AUTH_SET_LOGGED_IN, AUTH_SET_LOGGED_OUT } from "../actions/auth";

const initialState = {
  loggedIn: false,
  auth: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_LOGGED_IN:
      return { loggedIn: true, auth: action.auth };
    case AUTH_SET_LOGGED_OUT:
      return { loggedIn: false, auth: null };
    default:
      return state;
  }
};
