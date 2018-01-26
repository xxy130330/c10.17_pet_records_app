import { LOGIN, REGISTER } from "../actions/index";
const CURRENT_USER = {
  success: false,
  id: null,
  errorMessage: ""
};

export default function(state = CURRENT_USER, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                success: action.payload.data.loginSuccess,
                id: action.payload.data.ownerID,
                errorMessage: action.payload.data.errors[0]
            };
        case REGISTER:
            return {
                ...state,
                success: action.payload.data.success,
                id: action.payload.data.data.ID
            };
        }
    return state;
}