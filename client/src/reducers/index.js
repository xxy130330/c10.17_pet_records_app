import { combineReducers } from 'redux';
import PetDataReducer from './petdata_reducer';
import PetProfileReducer from './petprofile_reducer';
import PetMedicalReducer from './medical_reducer';
import AddMedicalItemReducer from './add_medical_item_reducer';
import AddPetReducer from './addPet_reducer';
import LoginReducer from './login_reducer';
import { reducer as formReducer } from 'redux-form';
import DeletePetReducer from './delete_pet_reducer';
import DeleteMedicalRecordItemReducer from './delete_medical_record_reducer';
import UploadImageReducer from './upload_image_reducer';
import editMedicalRecordReducer from './edit_medical_record_reducer';
import VetLoginReducer from './vet_login_reducer';
import userReducer from './user_reducer';


const rootReducer = combineReducers({
  petdata: PetDataReducer,
  petProfile: PetProfileReducer,
  petMedical: PetMedicalReducer,
  addMedicalItem: AddMedicalItemReducer,
  addPet: AddPetReducer,
  login: LoginReducer,
  form: formReducer,
  deletePet: DeletePetReducer,
  deleteMedicalRecordItem: DeleteMedicalRecordItemReducer,
  uploadImage: UploadImageReducer,
  vetlogin: VetLoginReducer,
  user: userReducer,
  editMedicalRecord: editMedicalRecordReducer,
});

export default rootReducer;

