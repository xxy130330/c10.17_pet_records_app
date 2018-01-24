import {SWITCH_AUTHENTICATION, LOG_OUT, LOCALAUTH} from "../actions"

const DEFAULT_STATE = {
  auth: false,

};
export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SWITCH_AUTHENTICATION:
        localStorage.auth = action.auth;
      return { auth: localStorage.auth};


    case LOG_OUT:
        localStorage.removeItem('auth');
        localStorage.removeItem('id');

        return {auth: false}
    case LOCALAUTH:
        return {auth: localStorage.auth};
    default:
      return state;
  }
}
