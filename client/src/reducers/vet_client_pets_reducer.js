import { VET_CLIENT_PETS } from '../actions/index';

const DEFAULT_STATE= [];

export default function(state=DEFAULT_STATE, action){
    switch(action.type){
        case VET_CLIENT_PETS:
            return action.payload.data.data;

    }
    return state;
}
