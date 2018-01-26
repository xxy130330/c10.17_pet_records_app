import { PET_DATA } from '../actions/index';

export default function(state=[], action){
    switch(action.type){
    case PET_DATA:
        return action.payload.data.data;
    }
    return state;
}
