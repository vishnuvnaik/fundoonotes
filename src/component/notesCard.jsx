import React, { Component } from "react";
import {
  Card,
  InputBase,
  IconButton,
  Tooltip,
  Toolbar,
  Button,
} from "@material-ui/core";
import CheckBox from "@material-ui/icons/CheckBox";
import Brush from "@material-ui/icons/Brush";
import Image from "@material-ui/icons/Image";
import noteServices from "../services/noteServices";
import "./CSS/dashboard.css";
import FiberPin from "@material-ui/icons/FiberPin";

import CollaboratorComponent from "./Collaborator";
import ReminderComponent from "./Reminder";

import Palette from "@material-ui/icons/Palette";
class Notes extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      nextLine: true,
      title: "",
      description: "",
      openCard: false,
      reminder: "",
      collaborator: "",
      color: "",
      image: "",
      notes: [],
      archive: false,
      pin: false,
      trash: false,
      labelIdList: [],
      isDeleted: false,
      isArchived: false,
      isPined: false,
      remOpen: false,
    };
    this.openCard = this.openCard.bind(this);
  }

  async openCard() {
    await this.setState({ open: !this.state.open });
    console.log("In open card");
    console.log(this.state.open);
  }
  
  userNoteRefresh = async () => {
    await noteServices.getnotes().then(async (response) => {
      if (response.data.data.data) {
        await this.setState({ notes: response.data.data.data });
        // this.setState({ allNotesTemp: response.data.data.data });
      }
    });
  };
  changeCard = () => {
    this.openCard();
  };

  addNotes = () => {
    let id = [];
    this.state.labelIdList.map((e) => {
      id.push(e.id);
    });

    if (this.state.title != "") {
      const notedata = new FormData();
      notedata.append("title", this.state.title);
      notedata.append("description", this.state.description);
      notedata.append("isArchived", this.state.isArchive);
      notedata.append("color", this.state.noteColor);

      noteServices.addnotes(notedata).then((response) => {
        if (response) {
          console.log("data added");
          this.userNoteRefresh();
        }
      });

      this.setState({ title: "" });
      this.setState({ description: "" });
      this.setState({ noteColor: "" });
      this.changeCard();
      //for close the main Note Box
    } else {
      this.changeCard();
    }
  };

  render() {
    return !this.state.open ? (
      <div className="show">
        <Card className="notesCard">
          <InputBase
            className="takeNote"
            style={{ marginTop: "0px", marginLeft: "1em", fontWeight: "bold" }}
            placeholder="Take a note..."
            onClick={(event) => this.openCard()}
          ></InputBase>
          <div>
            <Tooltip title="New List">
              <IconButton>
                <CheckBox />
              </IconButton>
            </Tooltip>
            <Tooltip title="Note with drawing">
              <IconButton>
                <Brush />
              </IconButton>
            </Tooltip>
            <Tooltip title="Note with image">
              <IconButton>
                <Image />
              </IconButton>
            </Tooltip>
          </div>
        </Card>
      </div>
    ) : (
      <div className="show">
        <Card className="cardlist">
          <div className="titleAndPin">
            <div>
              <InputBase
                className="titleNote"
                placeholder="Title"
                onChange={(event) =>
                  this.setState({ title: event.target.value })
                }
              ></InputBase>
            </div>
            <div>
              <IconButton>
                <FiberPin />
              </IconButton>
            </div>
          </div>
          <div className="inp">
            <InputBase
              className="in"
              type="text"
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
              placeholder="Take a note..."
              multiline={this.state.nextLine}
            ></InputBase>
          </div>

          <div className="toolbarAndClose">
            <Toolbar className="CardToolbar">
              <div></div>
              <div>
                <CollaboratorComponent />
              </div>
              <div>
                <ReminderComponent />
              </div>
              <div>
                <IconButton>
                  <Palette />
                </IconButton>
              </div>
              <div></div>
            </Toolbar>
            <div className="closeButton">
              <Button
                form="styled_component"
                variant="contained"
                color="offwhite "
                onClick={(event) => this.addNotes(event)}
              >
                Close
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
export default Notes;
