import { DELETE_MEDICAL_RECORD_ITEM} from '../actions/index';

export default function(state=[], action){

    switch(action.type){
        case DELETE_MEDICAL_RECORD_ITEM:
            console.log('IN DELETE_MEDICAL_RECORD_ITEM REDUCER:', action.payload);
            return action.payload;
    }
    return state;
}
