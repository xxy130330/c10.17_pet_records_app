import { combineReducers } from 'redux';
import PetDataReducer from './petdata_reducer';
import PetProfileReducer from './petprofile_reducer';

const rootReducer = combineReducers({
  petdata: PetDataReducer,
  petProfile: PetProfileReducer
});

export default rootReducer;
