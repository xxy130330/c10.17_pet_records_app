import { LOGIN } from '../actions/index';

const CURRENT_USER = {
  success: false,
  id: null,
  errorMessage: ''
}


export default function(state=CURRENT_USER, action){

  switch(action.type){
    case LOGIN:
      console.log('ACTION ::::', action)
      return {success: action.payload.data.loginSuccess, id: action.payload.data.ownerID, errorMessage: action.payload.data.errors[0]};
  }
  return state;
}
