import { combineReducers } from 'redux';
import PetDataReducer from './petdata_reducer';
import PetProfileReducer from './petprofile_reducer';
import PetMedicalReducer from './medical_reducer';
import AddMedicalItemReducer from './add_medical_item_reducer';
import AddPetReducer from './addPet_reducer';
import LoginReducer from './login_reducer';
import DeletePetReducer from './delete_pet_reducer';

const rootReducer = combineReducers({
  petdata: PetDataReducer,
  petProfile: PetProfileReducer,
  petMedical: PetMedicalReducer,
  addMedicalItem: AddMedicalItemReducer,
  addPet: AddPetReducer,
  login: LoginReducer,
  deletePet: DeletePetReducer
});

export default rootReducer;

