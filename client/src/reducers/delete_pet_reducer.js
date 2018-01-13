import { DELETE_PET } from '../actions/index';

export default function(state=[], action){

    switch(action.type){
        case DELETE_PET:
            console.log('IN DELETE PET REDUCER:', action.payload);
            return action.payload;
    }
    return state;
}


