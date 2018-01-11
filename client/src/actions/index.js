import axios from "axios";

//****** GET pet list records ********/
const pet_list_url = '/server/database_connect/server.php?action=get&resource=pets&ID=1';
export const PET_DATA = "PET_DATA";

export function fetchPetData() {
  const request = axios.get(pet_list_url);

  return {
    type: PET_DATA,
    payload: request
  };
}

//****** GET pet profile records ********/
const pet_profile_url = '/server/database_connect/server.php?action=get&resource=record-item&petID=';
export const PET_PROFILE = "PET_PROFILE";

export function fetchProfileData(petId) {
  const request = axios.get(pet_profile_url+petId);
  return {
    type: PET_PROFILE,
    payload: request
  };
}

//****** GET medical records ********/
const pet_medical_url = '/server/database_connect/server.php?&action=get&resource=record-item&recordID=';
export const PET_MEDICAL = "PET_MEDICAL";

export function fetchMedicalData(recordId) {
  const request = axios.get(pet_medical_url+recordId);

  return {
    type: PET_MEDICAL,
    payload: request
  };
}

const add_medical_item_url = '/server/database_connect/server.php?action=post&resource=record-item';
export const ADD_MEDICAL_ITEM = 'ADD_MEDICAL_ITEM';
export function addMedicalItem(petId, form){
    const request= axios({
        method : 'post',
        url    : add_medical_item_url,
        dataType: 'json',
        data   : {
            'petID': ''+petId,
            'title': form.title,
            'type': 'hardcoded for now',
            'record_data': form.comment,
            'treatment_date': form.date,
        }
    });
    return{
      type: ADD_MEDICAL_ITEM,
      payload: request
    }
}

const add_pet_url = '/server/database_connect/server.php?action=post&resource=pet';
export const ADD_PET = "ADD_PET";

export function addPet(name, dob, breed, ownerID, avatar) {
  const request = axios.post(
    add_pet_url,
    {
      name: name,
      dob: dob,
      breed: breed,
      ownerID: ownerID,
      avatar: avatar
    }
  );


  return {
    type: ADD_PET,
    payload: request
  };
}



