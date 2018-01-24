import axios from "axios";

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
            type: recordData.editType,
            record_data: recordData.editDetails,
            treatment_date: recordData.editDate
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
export function uploadImage(data) {


    // function getBase64(data) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(data);
    //     reader.onload = function () {
    //         console.log(reader.result);
    //         data = reader.result;
    //     };
    //     reader.onerror = function (error) {
    //         console.log('Error: ', error);
    //     };
    // }
    // getBase64(data);
    data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALsAAADLCAYAAAA2suKrAAAgAElEQVR4Xu1dCXgURfb/VffMZGaSmQmgIDcI5ADxVlxdD7zQ9b5WXUEBEwRPvMETVBRQEVTUPwmH56J4H6uyrqKrrjeKYhIgoBzKIZB7ru5+/696EgxkJjPTUzPTSaa/z4/dL1Wv3nv1m+rqqvd+jyHzZDzQQTzAOoidGTMzHkAG7BkQdBgPZMDeYaY6Y2gG7BkMdBgPZMDeYaY6Y2gG7BkMdBgPZMDeYaY6Y2gG7AIwUDtm4N6abB0Apg0gQj/GWBci5gaDmxG5+L9EcIMxNwhuxpBLIC8jVgOGGiLS/236/wBqAewAaCugrWGQKt0l5asEqNqhRWTAHuP00+h+9jqL/QgiNhCMBmiMDQBoAIABDMwTo5iEmhHROjBWKYEqQfp/qyGj3D1vVXlCgjtI5wzYI0w0B3e1xXE0A44F6DiAHQYGmxlxQUQbGcPHTGPLCIFlnvmVa8yoZ7p1yoC9cQZoXA9nteY5qi2AOxpoMuAP76EODXa6YIitLlc9QwUuZoTTwJg9GpDa4t+J6CcwvJBFtNhRWrGuLdogQucOB3aaAqluY/5xHOBg0nkM6CTCkW1Ixpcg7QVZsbyUs2jl5jakd8KqdhiwV48bNAxkuRigvwOse8Kea/MCSCNiH0nAPzVr/au5T67f2eZNimJAuwY7XQC5xl1wITHcyhjbv71PpmH7iHxgbIGNtIfa8zanXYI9dJKSNQZgNzPG+hsGQUfrSKSCYbHMMCNnXvmP7c38dgV2Grevp1qzTWBgE8HQrb1NVmrtoXcY06a75636NLXjJm+0dgF2Krmtm1eiiQSaQNs3etR1KwAl2MJrrFs/yP0PAGMtzSY1CO2Xn6Bt/VXvJ/XMg9xnsFDPK5XLQY3yWdc+sPTfH5AsYcfQdm6GuvZ7IOCLrAOTYDnsVDDZGrFN8MePgbrG7bjFBsshJ4NFGnPzWui+2/35FFDv95SseleoM9IgrE2DnYg4UiYAuA+Am/sv8MWb8C2+H2io2d2djMF61Lmw/+MuMEtLcFBDLXxLZiD42at6P9uIItjPu0HclBDB+8xdCH72ii7TeuTZsF90O5g9OzzYa3eg4YlroFUuj6iDZdjpcI6dAYT58TZ1qrv/7/qPWH9ycuGa9j6YwxVWpn/pQvhffjDs34joQ0jKuNx5ayrFOSW1ktos2InoSAAlAHZbftsL2DkMgj98CO+8G4Ggv+Vbau/ecI6fA7l3QauIEQX20CDkB2G626E8wB5b01Kp1GI37tHaHNhrJp/QxXnV3AflnvmjgZZphe0J7KQq8L00HcGPXth9Ym0OZJ1aDNtJo8Fsrd+DiQX7LjUqJdLGuUorPowbcWns0GbATgCrLSoci259ZzgnzOki98wL67b2BHZ9LW2oRf3DY6Bt+HmXvVLeYXCOeQBS5+6tbmF4hySBvVEXWmxVgrc4F1ZuSCOGYx66TYC9dszAwZrFUgKwI6Vu/eAYPxsdBez6dubbpfAunBT6WLXZ4RjzAKyHjIhpkpMLdoAI9RLhHldl2Sy2DEpMSqWpkenBXl2UPxJgJU1xKx0R7FrtDviWPAjlq7dhPexvsF92X9iP7HAYSjbYm435qUy+83NK121JE5ajDmtasNOVQ3JqAtqTYBjZ3IpoYA8u/w/8/3oK5Kvbw3gG68EnIevMq8Me1e15GmMdfgmy/jYurAOZqzOYJIf9GykBUF11mK8JwLdkJpSv3tH7RTuNaS6ciKBWfAX/eyVwjLoHUpceUSe2qUEKwQ4QtpBEl+bOK18as4IpbGhKsFcVFRzCGHuRJ0bs6YtoYCdfPah2J4i0Fm7kx3w6UMOds+9x9IicTpDcXVpOhWRB9g3zwXLCx4+pv/4E78Lbwk6hVrV115FoPGDX9+7BALTqbZD36hkXPFIKdl1RImI008Mq7mTz0PKyIy7txTY2HdhrigtuILDpfPELZ2o0sBt1z54re0Q5sgWuGR+BhfshAFBWfYOGhy6Nqka8YI8qMEKDlIO9UQ8i+tamBs8x08eracBeNaFPJyjZCxhwdmsTmwF7fLBPF9j1RR7YKWnqWPf8Va/Hp3VyWpsC7A1FA3sFmXVZuG1LvNsYo24y1cpOFDKjlZvRXXbytim4QTXqV90M0M3ukvKHEpEhom/awV5bPHiIStp7jLFesRjUEVZ2rb4aVLUN0j79wOTwsTO6r4gQ/OEjWA88PqLr0rmyN1eKQA95SspvYfqCn54nrWCvGpt/KGT2QTzZ+R0C7Ds2w//hc7ANOz1iOAD/AFe++zeCX78H5/hHTA/2kIK02L26fFS6zuPTBvbq4rxTCfLLDHDG8zvvEGDfuQW+Z+8G69QN9n/cGXZ1V39fC2/pzZD27iMO7O/Ph/+Vh+OZDgNt6W23b+dF7Nkt9QY6J9QlLWCvKc4fS8TmgbHwh9WtmBQN7BwE6ppvwc+793zkbv0hFwwLe0Zupj27poP9LiirvoZ91FTYhp2xmynkrYP/rScQWPYCLPsPFwb24M+fQ/khhnAXTYOy/ANQzR/GwEf4yq14R7BFv1QZE2CsV8rBXl1UyBMrIr93o9gRDezBr96B7+UHQS1CfCVYjzgT9gsnxxTiG1GNFBw97gL7T/8FsnORM+kFcLtD23SC8tN/4Vt0O6h2OywHjxAGdh54Fi4PYE9fUNAP76NXQP3FeDITgX60KcHTUnk0mTKw8zODmqLCWWCYaOx3GeoVDeyiAsFMA3YAlsNPh2PUFLAsJ/jHKw/7Vcs+11UUCfZY54UCPjTMGgN17Q+xdgnbjggbGAWOTxWpU8rAnuiK3uStjgh2ZHtgP/cGWIedAf/bTyDw/nz9JKatg71xTiuZn4a5nynfntAvJ4bOKQF7dVHBxWB4DmBSDDq12qRDgp2/0foNhfWwU+F/83HA37DLR215Zd9lBN/Da9qJbEEFJ3RN2pN0sNcUF5xOYK/xN64IKzoq2PWLI547qu4ebtIuwB76FvnQs6Z8RDKPJZMK9urivMNA0iciaeU6LNgjrBTtBeyhr2885+5VdhmbgpZRfAJWyqSBnd+MaqR9DMbChA4a15zt1QuOS++BtM++YYUEv1sK/xuPAt49QnwZg4XHgp9zPRDmVpKHBPPjPOXrf7WunGxB9u1LIkc9rlsB75PXRjXQcugpsJ91HZDlaNGWqrfB9/JDUCu+jC5n6HGwj5oSsV3Do+OhbWxktHZ6kD3peTB7TlS5rTYI+tHwf9dDW/9n9lRiAnfrPcdTUpbQIUYkXZIC9vqx+T0UiX0NxmIPvI7VW9YsSN0HgNlagkRfHGq3Q9u2AdDUFhKZey9IXfuES13V22t/bADVRPtOYpA5BUaEa3z+o9E2VkS1hrm6hHQJ9xmjBKByyo09j0/DSOWhxpF++DxDV11f9uceX7JA7rcfECEWP6rSTQ1Ig7ppFeBLzr0QEU3OLS3nka9CH+Fgp3GwVlPBFwzsYKGaZoR1KA8wjc50zy9/S6TRwsFeU1zwFIFdIVLJjKyO5wEiVGURDnTMLwuxVgl4hIK9prhgNIEtFKBXRkTGA/yE5luPVHMMm/fbn2etCfhFGNhrxuUVaCR/G29gVwK6Z7p2BA8QPe0pLeccQQk/QsDOCUVryPYFwFqnp0pY3YyAjugBBhrjLilflKjtQsBeXVzwNsBOS1SZTP+MB8J5gIAGEB2TW1r+bSIeShjsomJeEjEi07f9e4AIv3oU74GJhAUnBPbaywuP0SR8EIkJoP1PQcbClHqA6C1PafmZRsc0DHa9hIun4AswdqjRwf/sxz9rXYlfdiSuSEZCMjzAb7P3iOkxOgzT1HOMshUYBntVcf54BulJo0rv1s/phmPcLOHk/0J0ywhJzAM80WPRZKhlXyQmp7E3j4H3OIKDjFBmGwJ7zbi8vYikMoDtJcQC2QrnVY/Dst/RQsRlhJjHA5wFzVtyI9TVCX1b7m4Q0VRPaXnkgKAI5hsCe3VRwSIwdpkwlzIJ9tH3wfaXVvmRhA2XEZQ6D/AYGu+CSdA2NAajCRma/FYlOCjelL64wc7pL5gsfS1E52ZCbGdfB/vfMlEGov2abnlKxdfwPn0H6A/BFO6ENzylZXGtjnGBXexH6e7TYD32IjguuSvdc5MZX6QHOInTio/ge3aKcSaCVvSJ92M1LrAL/Sjdwwj5oBORPeFRka7OyEqzBzgTQvDLt+D75zTAKz7jLt6P1ZjBThf0ctTk5lQmqxS61P8AnTIiJn7DNE9iZvjYPECapnPb6BX4wpTqjE1KlFaE6z2lZbNjkRUz2JO5qnNFWZcecN2/VEROdix2Z9qkwAOchybwXmkocyxZD9Fv7jXlfWPJXY0J7HQcLDWDCnkO1qBk6cxrBblmfxlz+ZSk6ZERLMwDnF/G9+ZjCC5NbtR3rIFiMYE9VXHqOQ99Askt5uhe2IxlBBn2AKfp46V1gp++bFhGbB1plXt1+ZBoq3tUsOtMXsWFPKkyeat6o0XZd7wKuU8mSji2CTZ/K612J3zPT4XyXUpKLF3sKSlb3JpXooK95vK8s0mSOe9L0h/H1U/Cuv+xSR8nM0BqPKDfni6YBLVcTKhAq1oTfeMuLT+8Nf73VsHOV/Xq4oJvUpU8bb/0Xtj+el5qZiIzStI9oG3fhIYnroW2oSzpY+kDaNqpnvkV70UarFWwV1+efwok6d3UaApknT0xYjnGVOmQGUecB7Qtv6J+TjHoj43ihLYiiUAf55aUH2cI7FXFBcsYWMr2FZlb1JRgImWDqL+tQf3MkTHx34hSSiIa7iot5/W5WjwRV/aqsXn7MklaE7ZoqCjN9pBjOeB4Pfox87QPDyjrVqDhwUuBMIUhkmZhKwnaEcFeXVQwBYzdnTSlwgiWBxwE583PgkkJk/2mUu3MWBE8EPzxY3jnXh2WnS1ZTiOiWo9GPcMxAocFu/5hWlSwhjEWnlAxSZqynnnImfRPsDD8h0kaMiM2iR4IfPYqfE/fkcQRIooOewwZFuzVRYVHgOF/qdaShwxkT16cuVhKteOTNJ6fhwq8OitJ0lv9Ug0b/hse7MWFPLDmulRryYlHs299HtLevVM9dGa8JHjA9/LDCCydnwTJUUUGZfL1zildt6V5yxZg58SkNVSwEWBdo4oU3IC5OsN5/QLIvfIES86IS4cHGhZMgvLFm+kYmnO9t4iGbAH2VN6YtvCC0w3nhEdhyT88PQ7KjCrUA/UPj4mJY17ooH8K+9JTUnZEqyt7dVHhYjBcmCQFWhdrz4bjsmmwHnJyWobPDCrWA3X3nBMTV73YURul8cwRCuY1r8S328oeOoUp3MEYcpOiQDShNjvsF98B21HnRmuZ+bvJPUCKgro7RoB2/J4+TffYyuwG9rriQQeqsCxPm3YWG7LOvRG2E0YKucsiXiHi15+hbV67q5Ri2mwz+cAsJxfWoeIuy7W6KtTddjLg26PcTyr9sEdS9m5gTztvoyTDdtp4ZJ02PmzJ9Xj9pKeFLV2IwAeLQMlKC4tXKZO2tww8GM6rnxCmnfrHJtTfPgKgpNQCi01Pou3uXuVdmwqS7Qn218FwVmySktCKMViPHwn7eTcJy1jyf/gc/K8+AgS8SVC4/Yi0HHSifjgg6lE3lKH+3vRHsMpQDsopWf09t2sX2NO+X2/0svWoc/V9O7PZhfg98Nlr8L00PSnZ7UIUNIkQ6zEXwjFSXHSIsvJTNMwZl37rmu3bd4E97fv1RrdYDhkB+yV3Q8oR840cXP4BfM/eDarbmX7Hm1gD25nXwH76BGEaBv67RPd72p9m+/ZdYE/7fr0J7EOOhv3SqZA67SPET8rqb+AtuRlUtdtlmhDZ7UkIX2Bsx4o7cfa9NReBt+am30XN9u3NwZ7e/XqjW3jko330NMjd+glxlLqxAg1zrwZt3yREXrsUwhgcY2fCOkxQ8RQieF+4B8GPXzSFu5r27TrYzbJf57pIvfLgGDsdci8xidfqto1o4NkyvIhu5gnvAWsWHOPnwDr0GDEeIg0NT14H5fv/iJGXqJTGfbsOdrPs1/UvZl6uvehBWPY9IFET9f5azXY0PFIEbVP0qtNCBmyLQhwu/djRMugQIdqTpqJ+5ihoa/VDkPQ/jft2HezVxYUXAfhn+rUCkNMJznGzYCkYJkQdTtTDV3ah/OBCNDOPEB5t6rzmKch9BwtRipQA6u46PWW5p9GU5vWYckvL+oXAnoaspIgKWu1wjJ+tFyZgLCrTRzQ79UuN+sevhPrjJ9HbdtAWbO/ecF75OOSeYqiB+Nu0/r7zQFVbTeJR0ty+ne5GsKcx+GtPd0gy7GOnw3rY38SAHUDD/ElQvkxTqKlJprs1NaQ+g/W3qdS1jxBt1c1r0fDQ6KTQVBtWkPAXHexVxQXfMzAxm2TD2jR2ZAxZF94G23EXCQkZ4FJ9Lz+EwNIFiWrWbvvLeYfBcflMSJ26CbFRqVyu556a6W6DoE1oAnsVA/MIsVSAENvpV4biY2SLAGmA/99Pw79khhBZ7VGIvN8xcIy5H5KrsxDzgiuW6UxgaKgRIk+QkDmsbvSQfVSrlsY4zJamWIf/A/YLbgGz2ITYGfzqHXhLbzYmS5LbfclKy8En6VVPmMNlzEd79Ar87w34XrgP8NcLkSdECOENVltUcJzG2EdCBAoSYhl2BhyX3gNmzRIiUSn7Ag2PjDUkSx5wMCztnH9S6jEIliFHiQu+W7oI/jfmAEG/IZ8noxOBfmDJLjJgRHG58Eg4r3oMzOYw0r1FH3XTatRPNRbMyQPTHJfdJ0SPjiLE99rs0DeSqpjGZAJVs+o0MQm05gWpdwGyb3kOLMspxFn8KKzuJn47SHHL4/vZ7GufirtfR+3Acwh4lGnwoxfSG8seZgI4GZLYmqYCZpl16Ymcu14VtoeEpqLmmkMNvValvvsh5/aXBFjVMUTwSzzv8/dA+eIN02WH8ZzT9CVYR5h/ltMJ2Xe/DsmztxiEaBpq7zwVtC3+WpwstxtcM031SSPGJ0mSotVX63VPVbPExTSzk6/s74GxEUmy3ZhYiw3Zd7wCuccAY/337EWEupkjoVUaSK/NyoZr1qfCPpbFGGReKXoBgoW3QS373HRK8j07L4sgJhBFoHnOW1+AZcCBwiQ2PDXRWLkTiw05094XduEizCCTCtK2bYB30W2mjEVipro9bTaBjqufgHX/iLzycU+194V7EVxmINaNMTgnvwRLvyFxj9kRO/DcU+/C26FtLDed+XwbUw7G8s2mmfDMmX/9HwKvzzFkpuOqubAeMNxQ347WSVnznb6NoW3rTWc6/0DdDAYxQRECzbOdUgT7uTcIk6jf6i2cbEiefdRU2I6+wFDfjtYpWPY/+DjYTZgGyQuE+QAm5qpS4MxajjgTzrHThUkM/vw5vLOLDMnjXDb2s6411LdDdSKCHhez6Hagvsp0pvMP1PhvWlJghlxwBLKvnw+IiGkHoKxdgQZe30eL/1bPcvhpcBY9mAKr2/YQnIEt+MXb8D0/BQj4TGeMaVd2Hq+RfeerYLIsxGnqb5Won3mJoUg8ufAIZE8U98MTYpAJhfB0vMCyxfC/+IDpbk+5u0y7Z0dOLlwzlwmLfNR2/I76GSNBO+MP8JR65oV+eJlaT63+xDjFII+J8Rs8CEj275dVFRX+whj6JnsgI/Jdj34DZhcUH1P9B+pnjQH9Xhm3KsyzN3Lue1dYrE7cCrSRDjxUwP/mYzq/phkf0x49cmdl3/cu5K5ifoda7U40zL3KWMa7bNVTBUX98EwDBALk/vtDcnUSohL56uFd/ACUz18VIk+0ENPeoHJDeZlIYfQODTX6KYFhLhPZKtr3ppDnvGkRLAMOEqILcR8vnAzlB3PGEpkzNqbR9Y4rZgurwsFXHd/i+xH8/DUhE9tehGRPfRtydzEVQLW6nfA+cS3UNd+a0j2mjHps8pT94tthG36JEMfx/aTvtUcQ/M+zQuS1CyE2B3KmvScsulRL4LsoFf40ZTx7k+EiL3M4cY//3RJzkG2mYmZjGcO9F1zT3hdWZFnbuQX10y4wF4VGMz+wmuKCpwjsilh8k+o21qPOg+Oye4UMy8+Agx8vhu/F6SktLy5E+SQJYV37Iufed8CYJGQEddsG1E8501CSjBAFoghhVUUFkxhjD6RisHjHkIcei+xrnoy3W9j2vHia8uXb8D5zJ6AEhMhs60KkfQ9AziQDkaARDFfW/YiGGRcDWhpLy7QyKSytdU+joEUedCic188XlvUeXP4fPdYa3tq2jlMh+osOgwj+8KFOjmTGR2cXMBOD755OknoXwnnDfEjZgqpwrPwMvkW3gaq3mXE+Uq6TdcTlcJx3o7BxA5+8BN9zU4TJEyqI88bQJQPdNQ7LDjAmJghFoIasW384J5ZA7tJDiFQ91pqDfav5Yq2FGBinkKy/T0LWiZfG2Styc//bT+o3qCZ95oTo70waMsBZBpxXz4XcM0+I/9QNFTrYtQ1lQuS1dSGOcbNgPfQUYWYYzgYTpkErggjXN1FWmy/pmkepdeoGPiGibvjUrevhW3S7aS89UjHnzcdw3vIceP1TUU/D41dBWWHO21No2qlNxQhmA7hOlNGi5DBXZ9gvvVdYSpxWvU0PGVBXfipKxbYrh0nInvY+5L16CrOhbtoF0H5dKUyeSEE2mfo38bNPBMMjIoULkeVwwX7hZNiOPFuIOPLWheJjlv9biLw2LcSejZwH/gMp2y3EDFJV1HFunj82CpEnUggBDZ6eZa4Q2C/PPwWS9K7IAYTIynIi69wbkHXcxUIylni8NSfwUb58S4h6bVkI69wDOXe/DubIEWKG1lCLOl6+3YTpeAC+9JSUHaGDvebSgi6Uha2AoKs0Ie4DYLHBdvoEZJ1aLOSWj6eN8dpK6u9rDfE+ijJLmJxAAP5XHzJEIMqrbWTf/IywGH3tj02ou/NvgBoUZp5AQXM8JWUTdxUtMiV/jCTDeuKlsJ89UdjFkkAHpl0Uj0Wpu+1kQwCTBx8J55UCmZI3VqD+nnPS7pNwCjBNPcc9f9Xrfxb9NSGbL1fcevT5sF94G5jNbkpHplMpTkhUf+/5ht5S/PaUU3GL4sAPln8F76zR6XRH+LGJyK34OrNFv1TtArtZwwb0SfnHnWBOMR9S5psN4xoFV34K75xxhgTYThiFrPNuEvbGDHz+un47bbaHhwnklpTrPIp/gt2k+3bL/sNhHzVFWMy12SYjEX0CX74N3/xbDInIOmcibCePFVa3yvf2kwiY8/ZU36/vBnb+f8y4b+eV3OyX3Qd5796GJrU9d/IvXQj/y8b4bLL+cRdsx/xdGGOC95/TEPzoedO5u2m/3gLspqzC0WcwHGMeEFaQFsQ5oRLhhWJCjkFFoML30gwEPng6flGSBfbR98E67HQhp1zcpw0lN0H5xmSn18326y3AbsZ9O+vWT6/Raem3X/yTGqaHVlcF33NTQXU74pbHi+JmnX4lpM7d4+6bjA48uTn4vzfiF23PhmPsDFgOGC6ksDKpChoeKYK66qv4dUlij+b79ZZgN+G+nXO2OIofDrEMCKDC07x1Og2etmlV3G5m+/SH84rZ4t4ycWvwZweeeeV98hooPyyLWwpzdwn5NO8wIT6loB/1950PzQAnT9zKx9dh1369Bdgb9+3LGNix8clMYmt7DpxXzIJl8FFiJkZVdLIkbXX8GfCsU3c4rnwUlr7p52rnbAn1s4sN8eCwvXrBUfQgLPuKKWquNdSgfurZoJ2bkwiE+EVLRMNdpeW7VoNdpzFNokxXKpLJcFzxMCwHnSTklavvL+debSw6z+nWL2L0FTHNj1a7Aw0PXWZoNZV65cExZjrk3gVCrODRpPxtSTV/CJEnQggRrfOUlg9gzT7QWoC9dvyArppq49E8pmEF4vzoPPlaFNciDwYzxB8jW/WV3To0/S8+fj3fMLsI2tZf48aGPPAQ/QNVFNua8suP8D46HlS3M25dktWBoM3ILamY1Fx+C7DzP1YXFb4OBmNVcpOgfdbZ18E24nKBZ8JPIPDm44Y0tRc9CNvhpxnqK7KTuqEcDU9cA9q+KW6xlv2OBl9ApE77xN03XAf9cqvkJkMMyUIUCCNEhnJQTsnq76OC3WynMnp8zLk3irvt+/Rl+J65y5Cfsy6cjKwTRhnqK7KTUv4lvPNvMZRPazn4JPAyPpKrsxCV9Mut56cCvnoh8hIVsucpTJO8sCs7jYO1hgo2AqxrogOL6G858hw4LrkbzGoTIQ7BHz6Cd+5VhmTZTh0H+zn6hVxan+B3S+F9bipgYOtg/cvZsF90O5gjW4gN/g+fg//VWeYpQEC43lNaxhOSdnvCgp23MBN5kmX/Y+EY94iwYDBl3Qo0PHCRoYm2/vV8OC69x1BfkZ0Cn72ml02PmxaESbAefwnsAuNifG/NReBf8wxFX4r0SaOsoKQEe7oWrmlBIRER7LVFBcdpjJkioVDqvz+yb1ggLPZa3bYR9XecYqg6hOXA4+G80th+X9TEcsKnwAfPwP/GnPhXU9kCXpwt68xrhJxucV04y5oeKkAmIEcivOEpLQub2hYR7KRX5ShYwxgTQ/GawEzzc+Gcu14Ds4t57VLAj9qJwwwxg/EfXs7kxQlYk3hXnoTif3MuAu+VxJ+4Yc1C1lnXIuvkMYkrwgMvggF4n58K5fPXEwzDEKIOF3Kxp6Qs7ARFBDvvZZoz95xOOiehKLIkftZec8twoHpr3B7mPzzX/Uvj7ieyA7+e51uY4EcvxC/WkQP7BbfC9tfz4u8bpge/UOIf+8p36fVJo2qr3avLBrNlCFslrlWw0wW9HDWenDVgTAxLkVH32hzIvusVyF37GZXQop/hTHirHdm3LwHr1DWU+CBZhJ3/RzSOKBS6xiv9KQq0nb/Dv+RBKD9+HLc/WE4n/djRetCJcfcN10FnbFh4G9SfPxMiLxEhBG1CbknFU5FktAp23qm6qDD9zANMgvPW54Vdb3O76h+bANUAWOTKjbEAAA9ZSURBVJocyav5yQMPhtxvP0jd+kHq1A3MvRdgzRKyF+bj8Ix9HrBGVdugbdsAdWN5KIeWl0r31hnCBcvtGgqsyz/cUP89O2lb14foSdJegIB+d1fVDWBLNnoNg52v7tW5rk0MEFN4x6CLHdc+Bet+xxjs3bJbA2cZ+ExA7R/ZAubqEgL8Pv0g9cqH3KsAcvcBgCM77hBavgfWtm+Cuv5naBsroP62BrRtA3i1P/gbErafdekBx5WPwyIqVGDTKn1l19b/nLBuiQggosm5peWtVomOurKHVveCKWDs7kSUSbSvffT9wvhjuC6+Nx5D4B0xdNi7bONRmVlOMIdLX+XlAQfCMvhIyP2GQnJ3iegCLeCDtqEcStn/9BVS27oBvD4RfHXCueRZ1z7InlgKaa9eiU6J3l9Z+4MOdtqyTog8I0KIUOVRvP15nmlr/WMCe9WEPp2gODcxMIcRZUT0sZ1xDexnTBAhSpfh/+Ql+FPFOOtwQe4/FJYDTwS/qpdyckF+L9R1KxBc/gHUss9B1X+k5OhO6j4AnPZOyvYk7kvOeV/+hb6NSWfEY7g4mHDGxQR2fXVPM/sAv0V1jp6W+AQ1Sgj++DG8j4n78cSsmGzVtzycNpvSQCgk9RuK7FufAxNR/Y8IwRXLdOIpIze5MfuslYYE8loZG5A9ryxqNeeYwV4/Nr+HIks8xM4iQsl4ZchDj0H2NRE/tOMVB2XtilCVCD1Nr+M88v7D4bzyUTApcYZyfqEU/OqdECe7gO8Jg7OwW4JGwtuYJgHpXN2l/kNDJVEEkZapG1ejfvpFQCDix7tB35u7m+Wv58M5aqqYRBjSEFj2IvwvPhA6Fk3xQ0S1kqTt6563KqZA+phXdm4Hjc13VUvSSsaQ+lT/zt3huvddYcFg6rZNaJj5D0NRgymeU6HDiQxk46mBgfcXwP9amjhxIwR8RXJYXGBv3LvzCCpxVadinUprFlwPfyosZIDX7Gx4+DJom9N3ihCr6SLbZV1wC7JOEsPcxW9y/fxUi4ctpPohqnBXlw9hS6DGOnTcYOeCq4oKP2AMJ8Q6iKh2OTM+0i9vRDx6WtvjV0Jbt0KEuDYjw375TNiGnS5EX86K7Fs8DcFPXhIiLx4hEtOOd82riCtQ0RDYa8blFZAm/ZTqOkzZd74CuXdhPD6J2Farr4Z3wa1Qf/xEiLy2IsR587MhpgYBD2cV8Jbeknq+e6KnPaXlcb+eDIG9cTuT8modzuvmwTLkrwKmiR9pa9B2bIJa9oV+mcMvdfhFDvGykYopaZfjs1uSgKxsnSNT6tID8qBDYNnvGMh9B4NZxCTBUMCHhkfHp5QvJt6P0uZOMwz2dHys2sdMh+0vZ8Y36TG05h9aPP6Es+Kq68t0Thlt23povIqEwRiUGIYV30S2gse+SPv01//Twxb6DobUta/QmJ0mxcnXgPqZl+hhDSl74vwoFQL2xtU9pR+rIj+uIk0OX/H5ZQ+/9OEZ/PoPYNU3UNevNCfwmQSpx0B95Zb77gep+76Qcrvq8TqwWIUFpYXzF38L1k09C7QjRXwxBj5KhYFdB3xRwSIwdlkqftmcddZ+/k2pGEq/bAqF1ap6uplWXwO14isEv30/FOFXX50aPcKNYs3SA8541pT1gBMgde6mVylJSbhxM32orgq1k09MyYUSr4skK8HDXAvXGI44M7yN2fUqG9fDWU3ulQxMXLB5BBhZjjwbztH3pw9kjSPzQmRK5fdQV36i/8vjWvTALX5BJfpGlq/OTjd4HLrUMz8UWDboEEhdeoLJid+CJuJMbftvqONgT8HDQGPcJeWLEhkqYbDrq/vleYeDyf8Fg5gvnwgWha66H0t+skSMHuXpcXzfqv22Rg9xVTeugrZlnX52rxMG8beCkUf/qOwZ2nfzuPk+heAsXsy9d9oB3twcHvHYMP1iIxbG14fwoqe0zFiGfLORhIA9tJ1JfpKHnD9Mr3jNspzxOSsFrXmcCF/ZqWa7Hnuu/l4Jla/+a7/X49GjPjm5kPsMCe29Obg7ddeLHguJTow6uLEGfEvn/b/rjXWOsReBfvEEfQdFC9+NRZwwsPPBqooLX2VA0qpI8fgY55VzIXn2isW2tLXRgc8z7VUFPLlb21wJ5bsPEPxxGWjLr42hvAzIyYWl4AhYDxkBed8DQqV0LFZAkpP6YSnKMf7/PBuKi0neEwTUozwlq74WMYRQsNPofrnVVvvyZO3fpZ6D4Bg/B3K3pH8eiPBtCxn8xpFvc9RfV+rJE3KfwaG3lAAq7qQoHEWo75VZCLxfmryhEzhmDKeUULDr25kk7t95HLij+CEdJJkn/R5oKL0ZylfvJEeRVvhfjA4oHOyh/Xv+SDDpWaNKReqn50+Ovl9YsrBo/TqavPqZI6Gu+U642UT0k0ejI9mCilqRwpMC9hDgxeet8rxOTshpPSjlMWgifd5uZNXeNgL0Rwwf3/FZXGlRtWOyF1T8Fl+36K2TBvZGwD8OxowxiIbT3emG/cLJsP3FNGza0T3cTltoAT/qJp0AGKhNFdElRNtJUoblzltTmQy3JRXsNAVSzaaC1wAmJqAly6ETctqOvajNftQlYxLTIVOr2oY6zpcpKtOLyAfSjvXMT14VsqSCnU8Cje5nr7bY32GMHZ/wpFisyDrjathGjBWSQ5mwPh1YAL9HqL+br2FCcngVBu08d0nFm8l0adLBrgNeT+djnzPGEqvvyBisJ42B/axrQtRzmSdtHlBWf4uGBwUVZSBtlKe04rlkG5MSsHMjdHYCiX2dKG+k9diL9GAwM96iJnuyzCQ/+N2/4X3quoRVioXJK+FBGgWkDOz6B+vlAwaC2d4Fw0CjBliOOFP/SDXzNbpR29pSPzG3p3S3p6Q8ZZUdUgp2Ppl6NT7F9hYYDDFr8qrM9pFTIHn2bkvYaHe6+l6bjcC784zZRaQyRuPcJRULjAkw1ivlYNf38KO6ZVfbO73FwIbHqzYPlHKMeUAYV2G842fa8wkkeJ+/B8FPXjTgDvID2jmeklXvGuicUJe0gF0H/DUDs2p8lkUAiyt0k3XtC/tZ1+rciTwbh9nsmWPIhCAQe2c9fbF2J6hqC3yvPAy1/IvYO+vnNlQtA2e5SsrjJ5aPa6TwjdMGdh3wvJRNccFMBhZ7+hGPCHRzimieZ9kPcq98SL0LIffMywBfACD2FEG8+MGOTdDWl4VSFH+rBG39Vc/RjScxnYg2ykw6xVXy88okqBmTyLSCvUnDmuKCmwjswZg03q0RA6w2MJsDcLp15gHL0GN0qmiJh8tmHkMe4BQZ2pZfoKz4GMrPn+shypx1GAGfUabhlVYKnuIsXcMrp6ftMQXYufW1Rfnnq2ALGGOuhL3h6qLHh1v3P04HPn8T6EeVegKylLD4diOA59nybKqAF5q3XmcJUH7+DMrKz0B85TaaabW7g96FJo30zF+5I91+Mw3YuSOqRxcOIiu9wsCGCnOMww25d35otedVMfbuA9a5u57TyTi3Sgd79MQSfwO0HZvBc0i131br8fVq5XJ9Ly4sh5YQANNucZdUPMoEXbMmOlWmAru+j+dFy3JzngBY3IxPUZ1hz4bEgd6lJ2ROP9Fvv9CHbu4+7Rv4fAX31oVqMq1dAZXz4mz5BbTjd1DtdnEAb5wAAtYzTb0gmXEuUec6TAPTgb3ZPn60RnhUyLYmnGdkC2Cz60SpnEyIn9/LBUfo7FmM/60dPJzxQKlcDuWHj/TCYzw/lnjglhIQDvBm7jLNtmXPKTQt2JO2rWkNxJyPpcdAWPYfDkv+YXqFDH2vb3OEckJNmD6nb0v4uVYwoAOZandAWfU1lJ/+qwMcnOIjFQ+RSqC7PaUV95tl29KmwJ70bU1rIOBUcnv3hmXAQX+Wf+SrPmfbMkEQGqeLpvpqnbVM+2N9qADZ2hX6v3rhsVQ+hM0So4vSdX4eq6mmXtmbG1FblH+8xqTHAKQ+AZVJoRMdzqPYrS/kXoWQ8w4Nne1npbCmGhHUrb9CXfuDTtOhbV6r03bw7YmwuPJYkRNqpwD0mFulu0Wn0MWnRmyt2wzY9VX+OFhqBuVfRWD3MLA0HaQzgDNxWWw6r4tl8FGwHjpCp9JORiSmzja8bb2+7w5+txTab5WhPbfKcabFNstJaEWgjyWmjXfPW1WeBPFJEdmmwN7kgbrRQ/ZRrdocAH9PilcMCOWrPq8azYmcpH5DIOV0DvHAxFrxWj/zVkDeep1NTL/U4XVRV30NbdMaXu7agFbiuxBhA0i7MXd+xRLx0pMrsU2Cvcklad3aRJwXTn7k0cMY5L5DIPXM03luGD/fd7paZFjxm0lt5+86ZR5ftfXjwV9+Au3cohOqmugJbVlYzR1s3m+Jl9pOg2FtGuyhD1jINbn5FxHYrUIvo0RNhiMHkqdr6Gy/1yDIAw/ReRs5zTPfdyvrfgTt2KQXzeWsuIJuLUVpz48ofYzhaavGHnDML+OlQdvs0+bB3tzzVUWFJwG4NR31nmJCAK89ys/w+b+N9Hj63tuMD2EHGD0uKcrjroVrtplRxXh1aldgbzK+/vLBBwWZdgdjOFtY4dR4PdtG2/PoRAmY7ZJqnmyr25VIrm+XYG8ylqcBErPexhgbCcDaRvGXGrWJKhixh1xy2dNsHkz1sSDKAe0a7LtWej3ZW7qZgGLGkC3Kee1CDtFnjDDDNb/8bbPefIryc4cAe3Nn1V5euJ8m0RgAFwOsuyhHth05pBHYhxLoeZdv5xL27Jb6tqN7Ypp2OLA3uYuzldVvyBuuMOkSMJyXvkuqxCYw1t5E9C0j9rysSv/MWbQyRRW/YtUuNe06LNibu5cuGGKr9mjHAjQCwIiEyZxSM3etjkKEKoA+kIi9b2HB99KdJWQClyAD9jCzwG9oNVkdQQwjwHASwMxd6kO3QY8d+BZg7zOmvu/auep/bAnMce1qBqQDGbDHMg/VxXmHgeRTiNFwRshPlNUsljGjtSFCPUCVDFgOwlJAfs8MqW/R9E7n3zMruwHv82yquhx7f5IsA4ixAQBxhrMB0P83eA0cMcecRNsBVslBDcYqmUZrIGuVMuTK7HllvxtQvUN3yYA9CdNPlwx0ex1wq2AuTYKbNItbZuQmIjcxuEGSmxH8mqTVMI3VMAmN/yo1ispqZNJq28utZRLca1hkBuyGXZfp2NY8kAF7W5uxjL6GPZABu2HXZTq2NQ9kwN7WZiyjr2EPZMBu2HWZjm3NAxmwt7UZy+hr2AMZsBt2XaZjW/PA/wNrP5gz3u7r/AAAAABJRU5ErkJggg==';



  const request = axios({
    method: "post",
    encType: "multipart/form-data",
    url: pet_image_url,
      ContentEncoding: 'base64',
    data: {
        rawData: data,
    }
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

