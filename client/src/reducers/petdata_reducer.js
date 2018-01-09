import { PET_DATA } from '../actions/index';

export default function(state=[], action){

  console.log('ACTION', action);

  switch(action.type){
    case PET_DATA:
      return action.payload.data.data;
  }


  console.log('REDUCER STATE',state);
  return state;
}
