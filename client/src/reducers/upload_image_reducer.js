import { UPLOAD_IMAGE } from '../actions/index';

export default function(state=[], action){

    switch(action.type){
        case UPLOAD_IMAGE:
            console.log(action);
            return action.payload.data;
    }
    return state;
}


