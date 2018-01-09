import axios from "axios";

//pulls up a high level overview of medical records for a specific pet, Your getting the title and ID of the record items
// const peturl =
//   "http://localhost:80/database_connect/server.php?action=get&resource=record-item&petID=5";
  //petList ^

  //AXIOS CALL 3
  // componentWillMount() {
    //pulls up the specific record item that the user clicked on currently hardcoded for record item 4

    //this all needs to go into an on click handler that changes the recordID in the url to the petID for the record that the user clicked on
//     const url = 'http://localhost:80/database_connect/server.php?&action=get&resource=record-item&recordID=4';

//     axios.get(url).then((res) => {
//         console.log(res.data);
//         this.setState({
//             PetData: (res.data.data),
//         });
//     });
// }

    //FIRST AXIOS CALL, finds all the user's pets based on the ID in the url, this will change based on ID of the logged in user but it is currently hardcoded for user ID 1

    //it works but doesn't store the data in state

    // componentWillMount() {
      //pulls up all pets for that user FOUND by ID
      const url = 'http://localhost:80/database_connect/server.php?action=get&resource=pets&ID=1';

  //     axios.get(url).then((res) => {
  //         console.log(res.data);
  //         this.setState({
  //             PetData: (res.data.data),
  //         });
  //     });
  // }

const ROOT_URL =
  "http://localhost:80/database_connect/pull_pet_records.php?ID=1";

export const PET_DATA = "PET_DATA";

export function fetchPetData() {
  const request = axios.get(url);
  console.log("IN ACTION", request);

  return {
    type: PET_DATA,
    payload: request
  };
}
