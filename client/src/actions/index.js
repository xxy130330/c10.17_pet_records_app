
import axios from 'axios';


const ROOT_URL = 'http://localhost:80/database_connect/pull_pet_records.php?ID=1';

export const PET_DATA = 'PET_DATA';

export function fetchPetData() {


  const request = axios.get(ROOT_URL);
  console.log('IN ACTION', request);

  return{
    type: PET_DATA,
    payload: request
  }
}


