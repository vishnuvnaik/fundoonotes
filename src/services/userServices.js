import axios from "axios";
import userApiConstants from "../constants/userApiConstants"

async function userRegistration(registerData) {
    try {
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.registration, registerData);
        return response;
    } catch (err) {
        throw err;
    }
}


// function registration(field) {
//     console.log(field);

//     const response = axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.registration, field).then(res => {
//         console.log(res.status);
//         if (res.status === 200) {
//             return true
//         } else {
//             return false
//         }
//     }).catch(err => {
//         return false
//     })
//     return response
// }

export default userRegistration 