import axios from "axios";
import userApiConstants from "../constants/userApiConstants";
// let userData = JSON.parse(localStorage.getItem("userDetails"));
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

async function login(loginData) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + userApiConstants.login,
      loginData
    );
    localStorage.setItem("token", response.data.id);
    localStorage.setItem("userDetails", JSON.stringify(response.data));
    return response;
  } catch (error) {
    return error;
  }
}

async function forgotPassword(data) {
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
async function uploadUserProfile(data) {
  let userData = JSON.parse(localStorage.getItem("userDetails"));
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + userApiConstants.UploadProfileImage,
      data,
      {
        headers: {
          Authorization: userData.id,
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
}
async function searchUserByWord(data) {
  let userData = JSON.parse(localStorage.getItem("userDetails"));
  try {
    let sendData = { searchWord: data };
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + userApiConstants.searchUserList,
      sendData,
      {
        headers: {
          Authorization: userData.id,
        },
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
}

export default {
  userRegistration,
  forgotPassword,
  login,
  uploadUserProfile,
  searchUserByWord,
};
