import React, { Component } from "react";
import {
  Card,
  InputBase,
  IconButton,
  Toolbar,
  Button,
} from "@material-ui/core";
import FiberPin from "@material-ui/icons/FiberPin";
import "./CSS/dashboard.css";
import CollaboratorComponent from "./Collaborator";
import ReminderComponent from "./Reminder";
import noteServices from "../services/noteServices";
import Palette from "@material-ui/icons/Palette";
class ShowCards extends Component {
  constructor() {
    super();
    this.state = {
      nextLine: true,
      title: "",
      description: "",
      openCard: false,
      reminder: "",
      collaborator: "",
      color: "",
      image: "",
      listMain: "",
      archive: false,
      pin: false,
      trash: false,
      labelIdList: [],
      isDeleted: false,
      isArchived: false,
      isPinned: false,
      remOpen: false,
    };
    // this.handleLabel = this.handleLabel.bind(this);
    // this.handleReminder = this.handleReminder.bind(this);
  }
  handleLabel(val) {
    console.log("value===", val);

    this.setState({
      label: val,
    });
  }

  addNotes = () => {
    let id = [];
    this.state.labelIdList.map((e) => {
      id.push(e.id);
    });

    if (this.state.title != "") {
      const form_data = new FormData();
      form_data.append("title", this.state.title);
      form_data.append("description", this.state.description);
      form_data.append("reminder", this.state.reminderMain);
      form_data.append("isArchived", this.state.isArchive);
      form_data.append("color", this.state.noteColor);

      noteServices.addnotes(form_data).then((response) => {
        if (response) {
          console.log("data added");
        }
      });

      this.setState({ title: "" });
      this.setState({ description: "" });
      this.setState({ listMain: "" });
      this.setState({ reminderDisplay: "none" });
      this.setState({ diplayCheckBox: "none" });
      this.setState({ noteColor: "" });

      //for close the main Note Box
    }
  };
  render() {
    return (
      <Card className="cardlist">
        <div className="titleAndPin">
          <div>
            <InputBase
              className="titleNote"
              placeholder="Title"
              onChange={(event) => this.setState({ title: event.target.value })}
            ></InputBase>
          </div>
          <div>
            <IconButton
              onClick={(event) =>
                this.isPinned(event, this.props.show, this.props.index)
              }
            >
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
    );
  }
}
export default ShowCards;
