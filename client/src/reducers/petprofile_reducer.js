import { PET_PROFILE } from '../actions/index';

export default function(state=[], action){
  switch(action.type){
    case PET_PROFILE:
      console.log('reducer data', action)
      return action.payload.data.data;
  }
  return state;
}
