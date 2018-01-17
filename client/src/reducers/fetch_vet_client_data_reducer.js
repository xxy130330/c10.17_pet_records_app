import { VET_CLIENT_DATA } from '../actions/index';

export default function(state=[], action){
    switch(action.type){
        case VET_CLIENT_DATA:
            console.log('the payload in VET CLIENT DATA reducer', action.payload);
            return action.payload.data.data;
    }
    return state;
}