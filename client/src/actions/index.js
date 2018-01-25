import axios from "axios";

export const LOCALAUTH = "LOCALAUTH";

//******** user Log in auth **********/
export const SWITCH_AUTHENTICATION = "SWITCH_AUTHENTICATION";
export const LOG_OUT ="LOG_OUT";
export function switchAuthentication(auth) {
  if(auth){
      return {
          type: SWITCH_AUTHENTICATION,
          auth: auth
      };
  } else {
      return {
          type: LOG_OUT,
          auth: auth
      };
  }


}

//****** GET pet list records ********/

//const uploadPetImage = 'http://localhost:80/file_upload/aws_s3/page.php';

const pet_list_url =
  "/server/database_connect/server.php?action=get&resource=pets&ID=";

export const PET_DATA = "PET_DATA";

export function fetchPetData(ownerID) {
  const request = axios.get(pet_list_url + ownerID);

  return {
    type: PET_DATA,
    payload: request
  };
}

//****** GET pet profile records ********/
const pet_profile_url =
  "/server/database_connect/server.php?action=get&resource=record-item&petID=";
export const PET_PROFILE = "PET_PROFILE";

export function fetchProfileData(petId) {
  const request = axios.get(pet_profile_url + petId);
  return {
    type: PET_PROFILE,
    payload: request
  };
}

//****** GET medical records ********/
const pet_medical_url =
  "/server/database_connect/server.php?&action=get&resource=record-item&recordID=";
export const PET_MEDICAL = "PET_MEDICAL";

export function fetchMedicalData(recordId) {
  const request = axios.get(pet_medical_url + recordId);

  return {
    type: PET_MEDICAL,
    payload: request
  };
}

//////********Get Vet Profile && Client List Data**********////////

const vet_client_data_url = '/server/database_connect/server.php?action=get&resource=client_list&vetID=';
export const VET_CLIENT_DATA= 'VET_CLIENT_DATA';

export function fetchVetClientData(vetId) {
    const request = axios.get(vet_client_data_url + vetId);
    return {
        type: VET_CLIENT_DATA,
        payload: request
    };
}
// const vet_client_pets_url = '/server/database_connect/server.php?action=get&resource=pets_for_vet&ownerID=\' + this.props.clientList[index].ownerID + \'&vetID=\' + this.props.match.params.vetId';
export const VET_CLIENT_PETS= 'VET_CLIENT_PETS';

export function fetchVetClientPets(ownerId,vetId ) {
    const request = axios.get('/server/database_connect/server.php?action=get&resource=pets_for_vet&ownerID=' + ownerId+ '&vetID=' +vetId);
    return {
        type: VET_CLIENT_PETS,
        payload: request
    };
}


//****** POST medical records ********/
const add_medical_item_url =
  "/server/database_connect/server.php?action=post&resource=record-item";
export const ADD_MEDICAL_ITEM = "ADD_MEDICAL_ITEM";
export function addMedicalItem(petId, form) {
  const request = axios({
    method: "post",
    url: add_medical_item_url,
    dataType: "json",
    data: {
      petID: "" + petId,
      title: form.title,
      type: "hardcoded for now",
      record_data: form.comment,
      treatment_date: form.date
    }
  });
  return {
    type: ADD_MEDICAL_ITEM,
    payload: request
  };
}

//****** POST add new pet ********/
const add_pet_url =
  "/server/database_connect/server.php?action=post&resource=pet";
export const ADD_PET = "ADD_PET";
export function addPet(name, dob, breed, ownerID, avatar) {
  const request = axios.post(add_pet_url, {
    name: name,
    dob: dob,
    breed: breed,
    ownerID: ownerID,
    avatar: avatar
  });

  return {
    type: ADD_PET,
    payload: request
  };
}

//****** POST user log in ********/
const login_url =
  "/server/database_connect/server.php?action=post&resource=login";
export const LOGIN = "LOGIN";
export function login(username, password) {
  const request = axios.post(login_url, {
    username: username,
    password: password
  });
  return {
    type: LOGIN,
    payload: request
  };
}

//****** POST vet log in ********/
const vet_login_url =
  "/server/database_connect/server.php?action=post&resource=vetlogin";
export const VET_LOGIN = "VET_LOGIN";
export function vet_login(username, password) {
  const request = axios.post(vet_login_url, {
    username: username,
    password: password
  });
  return {
    type: VET_LOGIN,
    payload: request
  };
}

//****** POST delete pet list ********/
const delete_pet_url =
  "/server/database_connect/server.php?action=post&resource=deletePet";
export const DELETE_PET = "DELETE_PET";
export function delete_pet(petId) {
  const request = axios.post(delete_pet_url, {
    petID: petId
  });
  return {
    type: DELETE_PET,
    payload: request
  };
}

//****** POST delete pet record ********/
const delete_record_item_url =
  "/server/database_connect/server.php?action=post&resource=deleteRecord";
export const DELETE_MEDICAL_RECORD_ITEM = "DELETE_MEDICAL_RECORD_ITEM";
export function deleteMedicalRecordItem(medicalRecordId) {
  const request = axios.post(delete_record_item_url, {
    recordID: medicalRecordId
  });
  return {
    type: DELETE_MEDICAL_RECORD_ITEM,
    payload: request
  };
}

//****** POST register new user ********/
const register_url =
  "/server/database_connect/server.php?action=post&resource=register";
export const REGISTER = "REGISTER";
export function register(username, password, email) {
  const request = axios.post(register_url, {
    name: username,
    password: password,
    email: email
  });
  return {
    type: REGISTER,
    payload: request
  };
}

//****** POST register vet ********/
const vet_register_url =
  "/server/database_connect/server.php?action=post&resource=registerVet";
export const VET_REGISTER = "VET_REGISTER";
export function vet_register(username, phone, password, email) {
  const request = axios.post(vet_register_url, {
    name: username,
    phone: phone,
    password: password,
    email: email
  });
  return {
    type: VET_REGISTER,
    payload: request
  };
}
////// EDITING RECORDS
const edit_records_url = '/server/database_connect/server.php?action=post&resource=editMedicalRecord';

export const EDIT_MEDICAL_RECORD = 'EDIT_MEDICAL_RECORD';

export function editMedicalRecord(recordData, params){
    const request= axios({
        method: 'post',
        url: edit_records_url,
        data: {
            ID: params.recordId,
            petID: params.petId,
            type: recordData.type,
            record_data: recordData.details,
            treatment_date: recordData.date
        }
    });
    return{
        type: EDIT_MEDICAL_RECORD,
        payload: request
    }
}




// const ownerIDs = [1,576,88,46,21];












//axios post call, pass in recordId and all info
// const edit_records_url= '/server/database_connect/server.php?action=post&resource=editMedicalRecord';

//****** POST pet avatar image ********/
const pet_image_url =
  "/server/database_connect/server.php?action=post&resource=upload-item";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";

    //
    // if (!data.formData) {
    //     export function uploadImage(data) {
    //         const request = axios({
    //             method: "post",
    //             encType: "multipart/form-data",
    //             url: pet_image_url,
    //             ContentEncoding: 'base64',
    //             data: {
    //                 rawData: data,
    //             }
    //         });
    //
    //         return {
    //             type: UPLOAD_IMAGE,
    //             payload: request
    //         };
    //
    //     }
    // } else {
        export function uploadImage(data) {
            const request = axios({
                method: "post",
                encType: "multipart/form-data",
                url: pet_image_url,
                data: data,
                // headers: {
                //     "Access-Control-Allow-Origin": "*",
                //     "Access-Control-Allow-Headers": "*",
                //     'Content-Type': 'application/x-www-form-urlencoded'
                // }
            });

            return {
                type: UPLOAD_IMAGE,
                payload: request
            };
        }
    // }



