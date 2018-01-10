import { combineReducers } from 'redux';
import PetDataReducer from './petdata_reducer';
import PetProfileReducer from './petprofile_reducer';
import PetMedicalReducer from './medical_reducer';

const rootReducer = combineReducers({
  petdata: PetDataReducer,
  petProfile: PetProfileReducer,
  petMedical: PetMedicalReducer
});

export default rootReducer;
