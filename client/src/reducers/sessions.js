import { READ_SESSIONS, UPDATE_SESSIONS, LOCAL_AUTH } from "../actions"

const DEFAULT_STATE = {
    auth: null,
    id: null,
    logoutSuccess: null,
    vetAccess: null

};
export default function(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case UPDATE_SESSIONS:
            return {auth: action.payload.data.authorized, ...state};
        case READ_SESSIONS:
            return  {id: action.payload.data.id, vetAccess:action.payload.data.vetAccess, auth: action.payload.data.authorized};
        case LOCAL_AUTH:

        default:
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