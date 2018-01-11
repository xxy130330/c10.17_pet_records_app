import { PET_DATA } from '../actions/index';

export default function(state=[], action){

  switch(action.type){
    case PET_DATA:
      console.log('REDUCER PETLISTDATA ', action.payload.data);
      return action.payload.data.data;
  }
  return state;
}
