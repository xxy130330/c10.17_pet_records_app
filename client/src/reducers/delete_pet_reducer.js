import { DELETE_PET } from '../actions/index';

export default function(state=[], action){

    switch(action.type){
        case DELETE_PET:
            return action.payload;
    }
    return state;
}


