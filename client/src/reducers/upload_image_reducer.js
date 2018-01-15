import { UPLOAD_IMAGE } from '../actions/index';




export default function(state=[], action){

    switch(action.type){
        case UPLOAD_IMAGE:
            console.log(action);
            console.log('IN UPLOAD IMAGE REDUCER:', action.payload);
            return action.payload.data;
    }
    return state;
}


