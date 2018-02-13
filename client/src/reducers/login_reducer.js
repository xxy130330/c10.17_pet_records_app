import { LOGIN, REGISTER } from "../actions/index";
const CURRENT_USER = {
  loginSuccess: false,
  id: null,
  errorMessage: ""
};

export default function(state = CURRENT_USER, action) {
    switch (action.type) {
        case LOGIN:

            return {
                ...state,
                id: action.payload.data.ownerID,
                loginSuccess: action.payload.data.loginSuccess
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
