import { PET_PROFILE } from '../actions/index';

export default function(state=[], action){
  switch(action.type){
    case PET_PROFILE:
      console.log('the payload in petprofile reducer', action.payload);
      return action.payload.data.data;
  }
  return state;
}
