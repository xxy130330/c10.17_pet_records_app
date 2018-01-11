import { ADD_PET } from '../actions/index';

export default function(state=[], action){

  switch(action.type){
    case ADD_PET:
    console.log('IN ADDPET REDUCE:', action.payload.data);
      return action.payload;
  }
  return state;
}


