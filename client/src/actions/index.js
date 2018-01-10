import axios from "axios";


const pet_list_url = 'http://localhost:80/database_connect/server.php?action=get&resource=pets&ID=1';
export const PET_DATA = "PET_DATA";

export function fetchPetData() {
  const request = axios.get(pet_list_url);

  return {
    type: PET_DATA,
    payload: request
  };
}


const pet_profile_url = 'http://localhost:80/database_connect/server.php?action=get&resource=record-item&petID=';
export const PET_PROFILE = "PET_PROFILE";

export function fetchProfileData(petId) {
  const request = axios.get(pet_profile_url+petId);

  return {
    type: PET_PROFILE,
    payload: request
  };
}



//pulls up a high level overview of medical records for a specific pet, Your getting the title and ID of the record items
// const peturl =
//   "http://localhost:80/database_connect/server.php?action=get&resource=record-item&petID=5";

  //AXIOS CALL 3
    //pulls up the specific record item that the user clicked on currently hardcoded for record item 4

    //this all needs to go into an on click handler that changes the recordID in the url to the petID for the record that the user clicked on
//     const url = 'http://localhost:80/database_connect/server.php?&action=get&resource=record-item&recordID=4';



    //FIRST AXIOS CALL, finds all the user's pets based on the ID in the url, this will change based on ID of the logged in user but it is currently hardcoded for user ID 1

    //it works but doesn't store the data in state
