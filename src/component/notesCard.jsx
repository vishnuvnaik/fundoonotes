import React, { Component } from "react";
import {
  Card,
  InputBase,
  IconButton,
  Tooltip,
  Toolbar,
  Button,
  Chip,
  MenuItem,
  Popover,
} from "@material-ui/core";
import AddLabel from "./addLabel";
import {
  CheckBox,
  MoreVertOutlined,
  Brush,
  Image,
  ArchiveOutlined,
  Palette,
} from "@material-ui/icons";
import noteServices from "../services/noteServices";
import RemainderMenu from "./remainderMenu";
import pin from "../assets/pin.svg";
import "./CSS/notesCard.css";
import CollaboratorComponent from "./Collaborator";

const color = [
  "#fff",
  "#a7ffeb",
  "#ccff90",
  "#f28b82",
  "#cbf0f8",
  "#aecbfa",
  "#fbbc04",
  "#e8eaed",
  "#7FDBFF",
  "#dab5d7",
  "#ff3333",
  "#00b300",
];
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nextLine: true,
      title: "",
      description: "",
      openCard: false,
      label: "",
      reminder: "",
      color: "#fff",
      moreMenuOpen: false,
      moreMenuAnchor: null,
      labelOpen: false,
      labelAnchor: null,
      listCard: false,
      colorOpen: false,
      colorAnchor: null,
      isDeleted: false,
      isArchived: false,
      isPined: false,
      remOpen: false,
      collaborator: false,
      labelIdList: [],
      labelNotes: [],
      reminderMain: "",
      displayReminder: "",
      reminderDisplay: "none",
      collabshow: false,
      collaboratorName: "",
      details: [],
      collabatorArray: [],
      collabatorValue: "",
      collaborators: [],
      userData: JSON.parse(localStorage.getItem("userDetails")),
    };
    this.openCard = this.openCard.bind(this);
  }

  openCard = () => {
    this.setState({ open: !this.state.open });
    console.log(this.state.open);
  };
  changeCard = () => {
    this.openCard();
  };
  handleColorBut = (event) => {
    this.setState({
      colorOpen: !this.state.colorOpen,
      colorAnchor: event.currentTarget,
    });
  };

  addNotes = () => {
    for (let i = 0; i < this.state.labelNotes.length; i++) {
      this.state.labelIdList.push(this.state.labelNotes[i].id);
      console.log(this.state.labelNotes[i].id);
    }
    this.setState({ labelIdList: this.state.labelIdList });
    if (this.state.title !== "") {
      const form_data = new FormData();
      form_data.append("title", this.state.title);
      form_data.append("description", this.state.description);
      form_data.append("reminder", this.state.reminderMain);
      form_data.append("isArchived", this.state.isArchived);
      form_data.append("color", this.state.color);
      form_data.append("labelIdList", JSON.stringify(this.state.labelIdList));
      form_data.append(
        "collaberators",
        JSON.stringify(this.state.collaborators)
      );

      noteServices.addnotes(form_data).then((response) => {
        if (response) {
          this.changeCard();
        }
        this.props.getNotes();
      });

      this.setState({ title: "" });
      this.setState({ description: "" });
      this.setState({ color: "" });
      this.setState({ reminderMain: "" });
      this.setState({ labelIdList: [] });
      this.setState({ labelNotes: [] });
      this.setState({ collaborators: [] });
    } else {
      this.changeCard();
    }
  };

  onClickArchive = () => {
    this.setState({ isArchived: true });
    this.addNotes();
  };
  handleClickMore = (event) => {
    this.setState({
      moreMenuOpen: !this.state.moreMenuOpen,
      moreMenuAnchor: event.currentTarget,
      labelAnchor: event.currentTarget,
    });
  };

  changeLabel = (data) => {
    this.setState({
      label: data,
    });
  };
  labelIdListChange = () => {
    this.setState({ labelIdList: this.state.labelIdList });
  };
  labelClose = () => {
    this.setState({
      labelOpen: false,
    });
  };
  moreClose = () => {
    this.setState({
      moreMenuOpen: false,
    });
  };
  userNoteRefresh = async () => {
    await noteServices.getnotes().then(async (response) => {
      if (response.data.data.data) {
        await this.setState({ notes: response.data.data.data });
      }
    });
  };
  moreone = () => {
    this.setState({
      labelOpen: true,
      moreMenuOpen: false,
    });
  };
  labelNotes = (value) => {
    console.log(value);
    this.setState({ labelNotes: value });
  };
  remainderMain = (value) => {
    console.log(value);
    this.setState({ remainderMain: value });
  };
  addUpdateReminder = (date) => {
    let reminderData = { reminder: date, noteIdList: [this.state.noteID] };
    noteServices.addUpdateReminderNote(reminderData).then(() => {});
    this.state.noteRefresh();
  };
  reminderClose = () => {
    noteServices.removeReminderNote(this.state.noteIdList).then(() => {});
    this.setState({ reminderDisplay: "none" });
    this.setState({ reminderMain: "" });
  };
  labelIdListRemove = (index) => {
    this.state.labelIdList.splice(index, 1);
    this.setState({ labelIdList: this.state.labelIdList });
  };
  handleDeletelabel = (id, index) => {
    if (index > -1) {
      this.state.labelNotes.splice(index, 1);
    }
    this.setState({ labelNotes: this.state.labelNotes });
  };
  reminderMainSet = (data) => {
    this.setState({ reminderMain: data });
    this.setState({ reminderDisplay: "flex" });
  };
  addCollab = (collab) => {
    let matched = this.state.userData.email === collab.email ? true : false;
    this.state.collaborators.map((user) => {
      matched = user.email === collab.email ? true : matched;
    });
    if (matched) {
      this.displaySnackbar(true, "info", "Collaboratore already exist.");
      return;
    }
    this.state.collaborators.push(collab);
    this.setState({ collaborators: this.state.collaborators });
  };
  removeCollab = (CID) => {
    let filterCollab = this.state.collaborators.filter((collab) => {
      return collab.userId !== CID;
    });
    this.setState({ collaborators: filterCollab });
  };

  reminder = (reminderMain, id) => {
    if (reminderMain !== 0) {
      return (
        <div
          className="CardToolbar"
          style={{ paddingTop: "10px", width: "150px" }}
        >
          <Chip
            style={{ width: "240px" }}
            label={reminderMain}
            onDelete={() => this.handleDelete(id)}
            color="white"
            value={this.state.date}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    let colObj = color.map((el, index) => {
      return (
        <div
          key={index}
          className="colorIcons"
          style={{
            backgroundColor: el,
          }}
          onClick={() => {
            this.setState({
              color: el,
              colorOpen: false,
            });
          }}
        />
      );
    });

    return !this.state.open ? (
      <div className="show">
        <Card className="notesCard">
          <InputBase
            className="takeNote"
            style={{ marginTop: "0px", marginLeft: "1em", fontWeight: "bold" }}
            placeholder="Take a note..."
            onClick={() => this.openCard()}
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
      <div
        className="show"
        style={{
          backgroundColor: this.state.color,
        }}
      >
        <Card
          className="cardlist"
          style={{
            backgroundColor: this.state.color,
          }}
        >
          <div className="titleAndPin">
            <div>
              <InputBase
                style={{
                  backgroundColor: this.state.color,
                }}
                className="titleNote"
                placeholder="Title"
                onChange={(event) =>
                  this.setState({ title: event.target.value })
                }
                style={{ fontWeight: "bold" }}
              ></InputBase>
              <Tooltip title="Pin it" arrow>
                <IconButton
                  onClick={() => {
                    this.setState({
                      isPined: true,
                    });
                  }}
                >
                  <img
                    style={{
                      opacity: ".6",
                    }}
                    src={pin}
                    alt="p"
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className="inp">
            <InputBase
              style={{
                backgroundColor: this.state.color,
              }}
              className="in"
              type="text"
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
              style={{ fontWeight: "bold" }}
              placeholder="Take a note..."
              multiline={this.state.nextLine}
            ></InputBase>
          </div>
          <div
            className="cardToolbar"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              width: "100%",
              padding: "5px",
            }}
          >
            {this.state.labelNotes.map((labelNotes, index) => (
              <div style={{ padding: "3px" }}>
                <Chip
                  key={index}
                  style={{ width: "auto" }}
                  label={labelNotes.label}
                  onDelete={() => this.handleDeletelabel(labelNotes.id, index)}
                  color="white"
                />
              </div>
            ))}
          </div>
          <div className="cardToolbar">
            {this.state.reminderMain !== "" ? (
              <div style={{ padding: "5px" }}>
                <Chip
                  //key={index}
                  style={{ width: "auto" }}
                  label={this.state.reminderMain}
                  onDelete={() => this.reminderClose()}
                  color="white"
                />
              </div>
            ) : null}
          </div>
          <div className="collabAtNote">
            {this.state.collaborators.map((collab) => {
              return <div>{collab.firstName.charAt(0)}</div>;
            })}
          </div>

          <div className="toolbarAndClose">
            <Toolbar className="CardToolbar">
              <div>
                <CollaboratorComponent
                  data={{
                    userData: this.state.userData,
                    collaborators: this.state.collaborators,
                    removeCollab: this.removeCollab.bind(this),
                    addCollab: this.addCollab.bind(this),
                  }}
                />
              </div>
              <div>
                <RemainderMenu
                  reminderMainSet={this.reminderMainSet.bind(this)}
                  reminderMain={this.state.reminderMain}
                />
              </div>
              <div>
                <Tooltip title="Change color" arrow>
                  <IconButton onClick={this.handleColorBut}>
                    <Palette />
                  </IconButton>
                </Tooltip>
              </div>

              <div>
                <Tooltip title="Archive" arrow>
                  <IconButton onClick={this.onClickArchive}>
                    <ArchiveOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                <Tooltip title="More" arrow>
                  <IconButton onClick={this.handleClickMore}>
                    <MoreVertOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            </Toolbar>

            <div className="closeButton">
              <Button
                style={{
                  backgroundColor: this.state.color,
                }}
                form="styled_component"
                color="offwhite "
                onClick={(event) => this.addNotes(event)}
              >
                Close
              </Button>
            </div>

            <Popover
              style={{
                width: "470px",
              }}
              open={this.state.colorOpen}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              anchorEl={this.state.colorAnchor}
              onClose={() => {
                this.setState({
                  colorOpen: false,
                });
              }}
            >
              <div className="colorMenu">{colObj}</div>
            </Popover>
            {this.state.labelOpen ? (
              <AddLabel
                labelClose={this.labelClose}
                changeLabel={this.changeLabel}
                anchor={this.state.labelAnchor}
              />
            ) : null}
            {this.state.moreMenuOpen ? (
              <Popover
                className="moreMenu_popper"
                onClose={this.moreClose}
                open={true}
                anchorEl={this.state.moreMenuAnchor}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div
                  id="moreone"
                  onClick={this.state.menu}
                  className="moreMenu_content"
                >
                  <MenuItem>
                    <AddLabel labelNotes={this.labelNotes} />
                  </MenuItem>
                </div>
              </Popover>
            ) : null}
          </div>
        </Card>
      </div>
    );
  }
}
export default Notes;
