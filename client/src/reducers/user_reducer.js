import {SWITCH_AUTHENTICATION} from "../actions"

const DEFAULT_STATE = {
  auth: false,

};
export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SWITCH_AUTHENTICATION:
      return { auth: action.auth };
    default:
      return state;
  }
}