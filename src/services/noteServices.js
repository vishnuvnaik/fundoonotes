import axios from "axios";
import noteApiConstants from "../constants/noteApiConstants";
const userData = JSON.parse(localStorage.getItem("userDetails"));
async function addnotes(notedata) {
  try {
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
async function removeNoteLabel(labelID, noteId) {
  try {
    let data = {};
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL +
        "/notes/" +
        noteId +
        "/addLabelToNotes/" +
        labelID +
        "/remove",
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
export async function addSubNoteLabel(labelId, noteId) {
  try {
    let data = {};
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL +
        "/notes/" +
        noteId +
        "/addLabelToNotes/" +
        labelId +
        "/add",
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
async function addNoteLabel(label) {
  try {
    let labelData = { label: label, isDeleted: false, userId: userData.userId };
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + noteApiConstants.labelNote,
      labelData,
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
async function deleteNotelabel(labelId) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_BASE_URL +
        noteApiConstants.labelNote +
        "/" +
        labelId +
        "/deleteNoteLabel",
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
async function updateNoteLabel(labelId, editLabel) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL +
        noteApiConstants.labelNote +
        "/" +
        labelId +
        "/updateNoteLabel",
      editLabel,
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
async function removeReminderNote(noteID) {
  try {
    let noteData = { noteIdList: [noteID] };
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + noteApiConstants.removeReminderNotes,
      noteData,
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
async function addUpdateReminderNote(addUpdateReminderdata) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + noteApiConstants.addUpdateReminderNotes,
      addUpdateReminderdata,
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
async function addcollaboratorsNotes(user, noteID) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL +
        "/notes/" +
        noteID +
        "/AddcollaboratorsNotes",
      user,
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

async function removeCollaboratorsNotes(userID, noteID) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_BASE_URL +
        "/notes/" +
        noteID +
        "/removeCollaboratorsNotes" +
        "/" +
        userID,
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
async function askQuestion(message, noteID) {
  let userData = JSON.parse(localStorage.getItem("userDetails"));
  try {
    let data = { message: message, notesId: noteID };
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL +
        "/questionAndAnswerNotes/addQuestionAndAnswer",
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

async function replyQuestion(message, parentID) {
  try {
    let userData = JSON.parse(localStorage.getItem("userDetails"));
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL +
        "/questionAndAnswerNotes/reply/" +
        parentID,
      message,
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
async function likeQuestion(data, parentID) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL +
        "/questionAndAnswerNotes/like/" +
        parentID,
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
async function getNotesDetail(id) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BASE_URL + noteApiConstants.getNotesDetail + id,
      { headers: { Authorization: userData.id } }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
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
  removeNoteLabel,
  addNoteLabel,
  deleteNotelabel,
  updateNoteLabel,
  addSubNoteLabel,
  removeReminderNote,
  addUpdateReminderNote,
  addcollaboratorsNotes,
  removeCollaboratorsNotes,
  askQuestion,
  replyQuestion,
  likeQuestion,
  getNotesDetail,
};
