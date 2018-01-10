import axios from "axios";

//****** GET pet list records ********/
const pet_list_url = 'http://localhost:80/database_connect/server.php?action=get&resource=pets&ID=1';
export const PET_DATA = "PET_DATA";

export function fetchPetData() {
  const request = axios.get(pet_list_url);

  return {
    type: PET_DATA,
    payload: request
  };
}

//****** GET pet profile records ********/
const pet_profile_url = 'http://localhost:80/database_connect/server.php?action=get&resource=record-item&petID=';
export const PET_PROFILE = "PET_PROFILE";

export function fetchProfileData(petId) {
  const request = axios.get(pet_profile_url+petId);

  return {
    type: PET_PROFILE,
    payload: request
  };
}

//****** GET medical records ********/
const pet_medical_url = 'http://localhost:80/database_connect/server.php?&action=get&resource=record-item&recordID=';
export const PET_MEDICAL = "PET_MEDICAL";

export function fetchMedicalData(recordId) {
  const request = axios.get(pet_medical_url+recordId);

  return {
    type: PET_MEDICAL,
    payload: request
  };
}
