import { LOGIN } from '../actions/index';

const CURRENT_USER = {
  success: false,
  id: null
}


export default function(state=CURRENT_USER, action){

  switch(action.type){
    case LOGIN:
    console.log('LOGIN ACTION', action);
      return {success: true, id: action.payload.data.ownerID};
  }
  return state;
}
