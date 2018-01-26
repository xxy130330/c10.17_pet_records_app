import { ADD_PET } from '../actions/index';

const DEFAULT_STATE = {
  petId: null
};

export default function(state=DEFAULT_STATE, action){
    switch(action.type){
        case ADD_PET:
            return {petId: action.payload.data.data};
    }
    return state;
}