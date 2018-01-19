import { VET_LOGIN, VET_REGISTER } from "../actions/index";

const CURRENT_VET = {
  success: false,
  id: null,
  errorMessage: "",
  accessLevel: null
};

export default function(state = CURRENT_VET, action) {
  switch (action.type) {
    case VET_LOGIN:
      console.log('VET LOGIN', action.payload);
      return {
        ...state,
        success: action.payload.data.loginSuccess,
        id: action.payload.data.vetID,
        errorMessage: action.payload.data.errors[0],
        accessLevel: action.payload.data.accessLevel
      };
      case VET_REGISTER:
      return {
        ...state,
        success: action.payload.data.success,
        id: action.payload.data.data.ID,
      };
      /// make a Log out case that returns
          /// ...state
          /// accessLevel: null
  }
  return state;
}