import { VET_CLIENT_PETS } from '../actions/index';

const DEFAULT_STATE= [];

export default function(state=DEFAULT_STATE, action){
    switch(action.type){
        case VET_CLIENT_PETS:
            console.log('the payload in VET CLIENT PETS reducer', action.payload);
            return action.payload.data.data;

    }
    return state;
}