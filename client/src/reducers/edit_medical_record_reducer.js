import { EDIT_MEDICAL_RECORD } from '../actions/index';

export default function(state=[], action){
    switch(action.type){
        case EDIT_MEDICAL_RECORD:
            return action.payload;
    }
    return state;
}