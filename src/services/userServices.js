import axios from "axios";
import userApiConstants from "../constants/userApiConstants";

async function userRegistration(registerData) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + userApiConstants.registration,
      registerData
    );
    return response;
  } catch (err) {
    throw err;
  }
}

export async function login(loginData) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + userApiConstants.login,
      loginData
    );
    return response;
  } catch (error) {}
}

export async function forgotPassword(data) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + userApiConstants.forgotPassword,
      data
    );
    return response;
  } catch (err) {
    return err;
  }
}
export default userRegistration;
