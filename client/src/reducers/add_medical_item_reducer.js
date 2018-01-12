import { ADD_MEDICAL_ITEM } from '../actions/index';

export default function(state=[], action){

    switch(action.type){
        case ADD_MEDICAL_ITEM:
            console.log('PAYLOAD IN REDUCERS', action.payload.data );
            return action.payload.data;
    }
    return state;
}