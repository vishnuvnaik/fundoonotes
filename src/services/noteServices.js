import axios from "axios";
import noteApiConstants from "../constants/noteApiConstants";
async function addnotes(notedata) {
  try {
    console.log("notedata", notedata);
    let response = await axios.post(
      process.env.REACT_APP_BASE_URL + noteApiConstants.addNotes,
      notedata,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("userDetails")).id,
        }
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}
async function getnotes() {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BASE_URL + noteApiConstants.getNotes,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("userDetails")).id,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export default { addnotes, getnotes };
