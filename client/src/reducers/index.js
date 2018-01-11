import { combineReducers } from 'redux';
import PetDataReducer from './petdata_reducer';
import PetProfileReducer from './petprofile_reducer';
import PetMedicalReducer from './medical_reducer';
import AddPetReducer from './addPet_reducer';

const rootReducer = combineReducers({
  petdata: PetDataReducer,
  petProfile: PetProfileReducer,
  petMedical: PetMedicalReducer,
  addPet: AddPetReducer
});

export default rootReducer;

