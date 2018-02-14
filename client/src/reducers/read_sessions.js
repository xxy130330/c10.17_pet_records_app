import { READ_SESSIONS, UPDATE_SESSIONS } from "../actions"

const DEFAULT_STATE = {
    auth: null,
    id: null,
    logoutSuccess: null

};
export default function(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case UPDATE_SESSIONS:
            console.log('we are updating the sessions and this is the action.payload ', action.payload.data.authorized);
            return {auth: action.payload.data.authorized, ...state};
        case READ_SESSIONS:
            console.log('please work this is the action payload, ', action.payload);
            return  {id: action.payload.data.id, auth: action.payload.data.authorized};
        default:
            console.log('going through the default state in read sessions');
            return state;
    }
}






// import {SWITCH_AUTHENTICATION, LOG_OUT, LOCALAUTH} from "../actions"
//
// const DEFAULT_STATE = {
//     auth: false,
//
// };
// export default function(state = DEFAULT_STATE, action) {
//     switch (action.type) {
//         case SWITCH_AUTHENTICATION:
//             localStorage.auth = action.auth;
//             return { auth: localStorage.auth};
//         case LOG_OUT:
//             localStorage.removeItem('auth');
//             localStorage.removeItem('id');
//             return {auth: false};
//         case LOCALAUTH:
//             return {auth: localStorage.auth};
//         default:
//             return state;
//     }
// }