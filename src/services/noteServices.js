import axios from "axios";
import noteApiConstants from "../constants/noteApiConstants";
const userData = JSON.parse(localStorage.getItem("userDetails"));
async function addnotes(notedata) {
  try {
    console.log("notedata", notedata);
    let response = await axios.post(
      process.env.REACT_APP_BASE_URL + noteApiConstants.addNotes,
      notedata,
      {
        headers: {
          Authorization: userData.id,
        },
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
          Authorization: userData.id,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}
async function updateColor(field) {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + noteApiConstants.changeColor,
    field,
    {
      headers: {
        Authorization: userData.id,
      },
    }
  );
  return response;
}
async function pinNote(field) {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + noteApiConstants.pinNotes,
    field,
    {
      headers: {
        Authorization: userData.id,
      },
    }
  );
  return response;
}
async function noteLabel(field) {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + noteApiConstants.labelNote,
    field,
    {
      headers: {
        Authorization: userData.id,
      },
    }
  );
  return response;
}
async function getNoteLabel() {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + noteApiConstants.getLabel,
    {
      headers: {
        Authorization: userData.id,
      },
    }
  );
  return response;
}
async function trashNote(field) {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + noteApiConstants.trashNote,
    field,
    {
      headers: {
        Authorization: userData.id,
      },
    }
  );
  return response;
}
async function archiveNote(field) {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + noteApiConstants.archive,
    field,
    {
      headers: {
        Authorization: userData.id,
      },
    }
  );
  return response;
}
async function updateNotes(field) {
  const res = await axios.post(
    process.env.REACT_APP_BASE_URL + noteApiConstants.updateNotes,
    field,
    {
      headers: {
        Authorization: userData.id,
      },
    }
  );
  return res;
}

export default {
  addnotes,
  getnotes,
  archiveNote,
  trashNote,
  getNoteLabel,
  noteLabel,
  pinNote,
  updateColor,
  updateNotes,
};
