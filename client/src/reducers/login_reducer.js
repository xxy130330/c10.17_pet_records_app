import { LOGIN, REGISTER } from "../actions/index";

const CURRENT_USER = {
  success: false,
  id: null,
  errorMessage: ""
};

export default function(state = CURRENT_USER, action) {
  switch (action.type) {
    case LOGIN:
      console.log("ACTION ::::", action.payload);
      return {
        ...state,
        success: action.payload.data.loginSuccess,
        id: action.payload.data.ownerID,
        errorMessage: action.payload.data.errors[0]
      };
    case REGISTER:
      console.log("REGISTER REDUCER", action);
      return {
        ...state,
        success: action.payload.data.success,
        id: action.payload.data.data.ID
      };
  }
  return state;
}
