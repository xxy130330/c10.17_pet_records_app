import { combineReducers } from 'redux';
import PetDataReducer from './petdata_reducer';

const rootReducer = combineReducers({
  petdata: PetDataReducer
});

export default rootReducer;
