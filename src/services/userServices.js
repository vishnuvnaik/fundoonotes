import axios from "axios";
import userApiConstants from "../constants/userApiConstants";

function userRegistration(registerData) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASE_URL + userApiConstants.registration,
      registerData
    );
    return response;
  } catch (err) {
    return err;
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
async function resetPassword(data, access_token) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + userApiConstants.resetpassword,
      data,
      { params: { access_token } }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
async function myCart() {
  let userData = JSON.parse(localStorage.getItem("userDetails"));
  try {
    const response = await axios.get(
      process.env.REACT_APP_BASE_URL +
        userApiConstants.Productcarts +
        "/myCart",
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
async function placeOrder(cartId, address) {
  let userData = JSON.parse(localStorage.getItem("userDetails"));
  try {
    const data = { cartId: cartId, address: address };
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL +
        userApiConstants.Productcarts +
        "/placeOrder",
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

export default {
  userRegistration,
  forgotPassword,
  login,
  uploadUserProfile,
  searchUserByWord,
  resetPassword,
  myCart,
  placeOrder,
};
