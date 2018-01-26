import { VET_CLIENT_DATA } from '../actions/index';

const DEFAULT_STATE= {
    clientList: [],
    email: null,
    ref_id: null
};
export default function(state=DEFAULT_STATE, action){
    switch(action.type){
        case VET_CLIENT_DATA:
            return {
                clientList: action.payload.data.data,
                email: action.payload.data.vet_email,
                ref_id: action.payload.data.ref_id
            };
    }
    return state;
}