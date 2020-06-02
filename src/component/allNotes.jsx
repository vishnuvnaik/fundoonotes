import React, { Component } from "react";
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
  MuiThemeProvider,
  createMuiTheme,
  Popover,
  Chip,
  Card,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import pin from "../assets/pin.svg";
import noteService from "../services/noteServices";
import AddLabel from "./addLabel";
import "./CSS/dashboard.css";
import coloricon from "../assets/color.svg";
import Palette from "@material-ui/icons/PaletteOutlined";
import LabelMenu from "./labelMenu";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import MoreMenu from "./more";
import Snackbar from "@material-ui/core/Snackbar";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddLabelNote from "./addLabel";
import AddLabelSubNote from "./addSubLabel";
const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paper: {
        width: "35%",
      },
    },
  },
});
const color = [
  "#fff",
  "#cbf0f8",
  "#aecbfa",
  "#fbbc04",
  "#e8eaed",
  "#7FDBFF",
  "#dab5d7",
  "#ff3333",
  "#00b300",
  "#a7ffeb",
  "#ccff90",
  "#f28b82",
];
class AllNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.allNotes.title,
      content: this.props.allNotes.description,
      color: this.props.allNotes.color,
      isArchived: this.props.allNotes.isArchived,
      isDeleted: this.props.allNotes.isDeleted,
      label: this.props.allNotes.label,
      labelIdList: props.allNotes.labelIdList,
      noteLabels: this.props.allNotes.noteLabels,
      noteIdList: this.props.allNotes.id,
      remainder: this.props.allNotes.reminder,
      userId: this.props.allNotes.userId,
      alNotes: this.props.allNotes,
      modifiedDate: this.props.allNotes.modifiedDate,

      labelOpen: false,
      labelAnchor: null,
      moreMenuOpen: false,
      moreMenuAnchor: null,
      colorOpen: false,
      colorAnchor: null,
      openDialog: false,
      visible: false,
      snackbarOpen: false,
      snackbarMsg: "",
      snackbarMsgType: "",
      labelNotes: [],
      noteLabel: this.props.allNotes.noteLabels,
      NoteReminderMenuAnchor: null,
      NoteReminderMenuOpen: false,
      reminderMsg: this.props.allNotes.reminder[0]
        ? props.allNotes.reminder[0]
        : "",
      reminderDisplay: this.props.allNotes.reminder[0] ? "flex" : "none",
      displayReminder: "",
      displayDatePick: "none",
    };
  }
  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      title: props.allNotes.title,
      content: props.allNotes.description,
      color: props.allNotes.color,
      isArchived: props.allNotes.isArchived,
      isDeleted: props.allNotes.isDeleted,
      isPined: props.allNotes.isPined,
      label: props.allNotes.label,
      noteLabels: props.allNotes.noteLabels,
      remainder: props.allNotes.reminder,
      noteIdList: props.allNotes.id,
      modifiedDate: props.allNotes.modifiedDate,
    });
  }
  addNoteLabelTemporary = (label, id) => {
    let data = {
      label: label,
      isDeleted: false,
      id: id,
      userId: this.state.userId,
    };
    this.state.noteLabel.push(data);
    this.setState({ noteLabel: this.state.noteLabel });
  };
  labelIdListChange = () => {
    this.setState({ labelIdList: this.state.labelIdList });
  };

  moreClose = () => {
    this.setState({
      moreMenuOpen: false,
    });
  };
  displaySnackbar = (open, type, msg) => {
    this.setState({
      snackbarOpen: open,
      snackbarMsgType: type,
      snackbarMsg: msg,
    });
  };
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  handleMouseEnter = (event) => {
    switch (event.currentTarget.id) {
      case "colorBut":
        this.setState({
          colorOpen: true,
          colorAnchor: event.currentTarget,
        });

        break;
      case "divbutton":
        this.setState({
          visible: true,
        });
        break;
      default:
        break;
    }
  };
  handleColorBut = (event) => {
    this.setState({
      colorOpen: !this.state.colorOpen,
      colorAnchor: event.currentTarget,
    });
  };

  handleMouseLeave = (event) => {
    switch (event.currentTarget.id) {
      case "colorBut":
        this.setState({
          colorOpen: true,
          colorAnchor: event.currentTarget,
        });

        break;
      case "divbutton":
        this.setState({
          visible: false,
        });
        break;

      default:
        break;
    }
  };
  changeColor = () => {
    const field = {
      color: this.state.color,
      noteIdList: [this.state.noteIdList],
    };
    noteService.updateColor(field).then((res) => {
      this.props.getNote();
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "color changed",
      });
    });
  };
  timing = [
    {
      value: "morning8:00AM",
      label: "morning8:00AM",
    },
    {
      value: "afternoon1:00PM",
      label: "afternoon1:00PM",
    },
    {
      value: "evening4:00PM",
      label: "evening4:00PM",
    },
    {
      value: "night8:00PM",
      label: "night8:00PM",
    },
  ];
  handleArchive = () => {
    const field = {
      isArchived: !this.state.isArchived,
      noteIdList: [this.state.noteIdList],
    };
    noteService.archiveNote(field).then((res) => {
      console.log("done");
      this.props.getNote();
    });
    this.setState({
      snackbarOpen: true,
      snackbarMsg: "note archived",
    });
  };
  reminderHandler = (event) => {
    this.setState({
      NoteReminderMenuAnchor: event.currentTarget,
      NoteReminderMenuOpen: !this.state.NoteReminderMenuOpen,
    });
  };
  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };
  handleChangeDescription = (event) => {
    this.setState({ content: event.target.value });
  };

  handleOnClick = (event) => {
    switch (event.currentTarget.id) {
      case "textone":
        this.setState({
          openDialog: true,
        });
        break;

      case "texttwo":
        this.setState({
          openDialog: true,
        });
        break;
      case "butse":
        this.setState({
          moreMenuOpen: !this.state.moreMenuOpen,
          moreMenuAnchor: event.currentTarget,
        });
        break;
      case "inputone":
        this.setState({
          cardChange: !this.state.cardChange,
        });
        break;
      case "moreone":
        this.setState({
          labelOpen: true,
          labelAnchor: event.currentTarget,
          moreMenuOpen: false,
        });
        break;

      case "normalCard":
        const updateForm = new FormData();
        updateForm.append("noteId", this.state.noteIdList);
        updateForm.append("title", this.state.title);
        updateForm.append("description", this.state.content);
        updateForm.append("color", this.state.color);
        noteService.updateNotes(updateForm).then((res) => {
          if (res.status === 200) {
          }
          this.props.getNote();
          this.setState({
            snackbarOpen: true,
            snackbarMsg: "note edited",
          });
        });
        this.setState({
          collaborator: false,
          cardChange: false,
          title: "",
          content: "",
          openDialog: false,
        });

        break;
      default:
        this.setState({
          cardChange: true,
          remOpen: false,
          remAnchor: null,
          collaborator: false,
          labelOpen: false,
          moreMenuOpen: false,
        });
        break;
    }
  };

  removeLabeFromNote = (labelId, index) => {
    this.state.noteLabels.splice(index, 1);
    noteService
      .removeNoteLabel(labelId, this.state.noteIdList)
      .then((response) => {
        if (response) {
          console.log("done");
        }
      });
  };

  labelNotes = (value) => {
    console.log(value);
    this.setState({ labelNotes: value });
  };
  handleClickMore = (event) => {
    setTimeout(() => {
      this.setState({
        moreMenuOpen: !this.state.moreMenuOpen,
        moreMenuAnchor: event.currentTarget,
      });
    }, 100);
  };

  deleteNote = () => {
    const field = {
      isDeleted: true,
      noteIdList: [this.state.noteIdList],
      labelIdList: [],
    };
    noteService.trashNote(field).then((res) => {
      this.props.getNote();
    });
  };
  removeReminder = () => {
    noteService
      .removeReminderNote(this.state.noteIdList)
      .then((response) => {});
    this.setState({ remainder: " " });
  };
  clickPickDate = () => {
    this.setState({
      displayReminder: this.state.displayReminder === "" ? "none" : "",
    });
    this.setState({
      displayDatePick: this.state.displayDatePick === "" ? "none" : "",
    });
  };
  handleChangeDate = (event) => {
    this.setState({ date: event.target.value });
  };
  setReminderOnclick = (event) => {
    let time = "";
    let date = new Date();
    if (event.target.getAttribute("time")) {
      time = new Date(
        date.setDate(
          date.getDate() + parseInt(event.target.getAttribute("time"))
        )
      ).toString();
    } else {
      time = new Date(this.state.date).toString();
    }
    this.setState({ reminderMsg: time });
    this.setState({ reminderDisplay: "flex" });
    this.setState({ NoteReminderMenuOpen: !this.state.NoteReminderMenuOpen });
    this.addUpdateReminder(time);
  };
  addUpdateReminder = (date) => {
    let reminderData = { reminder: date, noteIdList: [this.state.noteIdList] };
    noteService.addUpdateReminderNote(reminderData).then((response) => {});
  };
  render() {
    console.log(this.state.moreMenuOpen, "more");
    let colObj = color.map((el, index) => {
      return (
        <div
          key={index}
          className="colorIcons"
          style={{
            backgroundColor: el,
          }}
          onClick={async () => {
            await this.setState({
              color: el,
            });
            this.changeColor();
          }}
        />
      );
    });
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={() => this.setState({ snackbarOpen: false })}
          message={this.state.snackbarMsg}
        ></Snackbar>
        {this.state.openDialog ? (
          <MuiThemeProvider theme={theme}>
            <Dialog id="dialog_card" open={true}>
              <DialogContent
                id="visible"
                style={{
                  backgroundColor: this.state.color,
                }}
              >
                <div
                  className="cardTwoTopArr"
                  style={{
                    backgroundColor: this.state.color,
                  }}
                >
                  <input
                    style={{
                      backgroundColor: this.state.color,
                    }}
                    type="text"
                    id="textone"
                    className="inputTwo"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.handleChangeTitle}
                  />
                  <Tooltip title="Pin it" arrow>
                    <IconButton>
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
                <input
                  style={{
                    backgroundColor: this.state.color,
                  }}
                  id="texttwo"
                  onChange={this.handleChangeDescription}
                  className="inputThree"
                  type="text"
                  value={this.state.content}
                  placeholder="Take a Note..."
                />
                <div className="labelRemDate">
                  {this.state.alNotes.noteLabels.map((labelNotes, index) => (
                    <div style={{ padding: "3px" }}>
                      <Chip
                        key={index}
                        style={{ width: "auto" }}
                        label={labelNotes.label}
                        onDelete={() =>
                          this.removeLabeFromNote(labelNotes.id, index)
                        }
                        color="white"
                        // value={this.state.date}
                      />
                    </div>
                  ))}
                </div>

                <div
                  className="arrangeCardToIcon"
                  style={{
                    backgroundColor: this.state.color,
                  }}
                >
                  {/* comes on the click only */}
                  <div>
                    <Tooltip title="Reminder" arrow>
                      <IconButton>
                        <AddAlertOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Collaborator" arrow>
                      <IconButton>
                        <PersonAddOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Change color" arrow>
                      <IconButton
                        id="colorBut"
                        onMouseEnter={this.handleMouseEnter}
                      >
                        <PaletteOutlinedIcon />
                      </IconButton>
                </Tooltip> */}
                    <Tooltip title="Change color" arrow>
                      <IconButton onClick={this.handleColorBut}>
                        <Palette />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add image" arrow>
                      <IconButton>
                        <ImageOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Archive" arrow>
                      <IconButton onClick={this.handleArchive}>
                        <ArchiveOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="More Menu" arrow>
                      <IconButton onClick={this.handleClickMore}>
                        <MoreVertOutlinedIcon />
                      </IconButton>
                    </Tooltip>

                    <button
                      style={{
                        backgroundColor: this.state.color,
                      }}
                      id="normalCard"
                      className="cardCloseBut"
                      onClick={this.handleOnClick}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </MuiThemeProvider>
        ) : (
          <div
            id="divbutton"
            onClick={this.handleOnClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            style={{
              border:
                this.state.color === "#fff" || this.state.color === ""
                  ? "1px solid lightgray"
                  : "none",
              boxShadow: this.state.visible
                ? "0px 2px 5px 2px lightgray"
                : "0px 2px 5px 2px lightgray",
              backgroundColor: this.state.color,
            }}
            className={this.props.listGrid ? "noteCard123Two" : "gridCard"}
          >
            <div className="cardTwoTopArr">
              <input
                style={{
                  backgroundColor: this.state.color,
                }}
                type="text"
                onClick={this.handleOnClick}
                id="textone"
                className="inputTwo"
                placeholder="Title"
                value={this.state.title}
                onChange={this.handleChangeTitle}
              />
              <Tooltip
                style={{
                  visibility: this.state.visible ? "visible" : "hidden",
                }}
                title="Pin it"
                arrow
              >
                <IconButton>
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
            <input
              style={{
                backgroundColor: this.state.color,
              }}
              id="texttwo"
              onClick={this.handleOnClick}
              onChange={this.handleChangeDescription}
              className="inputThree"
              type="text"
              value={this.state.content}
              placeholder="Take a Note..."
            />

            <div className="labelRemDate">
              {this.state.alNotes.noteLabels.map((labelNotes, index) => (
                <div style={{ padding: "3px" }}>
                  <Chip
                    key={index}
                    style={{ width: "auto" }}
                    label={labelNotes.label}
                    onDelete={() =>
                      this.removeLabeFromNote(labelNotes.id, index)
                    }
                    color="white"
                    // value={this.state.date}
                  />
                </div>
              ))}

              {this.state.alNotes.reminder.map((remainders, index) => (
                <div style={{ padding: "3px" }}>
                  <Chip
                    key={index}
                    style={{ width: "180px" }}
                    label={remainders}
                    onDelete={() => this.removeReminder()}
                    color="white"
                    value={this.state.reminder}
                  />
                </div>
              ))}
            </div>

            <div
              className="arrangeCardToIcon"
              style={{
                backgroundColor: this.state.color,
              }}
            >
              <div
                style={{
                  visibility: this.state.visible ? "visible" : "hidden",
                }}
              >
                <Tooltip title="Remainder" arrow>
                  <IconButton onClick={this.reminderHandler}>
                    <AddAlertOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Menu
                  className="reminderMenu"
                  style={{
                    top: "50px",
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  anchorEl={this.state.NoteReminderMenuAnchor}
                  keepMounted
                  open={this.state.NoteReminderMenuOpen}
                  onClose={this.reminderHandler}
                >
                  <div
                    style={{
                      display: this.state.displayReminder,
                    }}
                  >
                    <li className="reminderHeading">Reminder</li>
                    <MenuItem time="0" onClick={this.setReminderOnclick}>
                      Later today 8:00 PM
                    </MenuItem>
                    <MenuItem time="1" onClick={this.setReminderOnclick}>
                      Tomorrow 8:00 AM
                    </MenuItem>
                    <MenuItem time="7" onClick={this.setReminderOnclick}>
                      Next Week 8:00 AM
                    </MenuItem>
                    <MenuItem onClick={this.clickPickDate}>
                      <WatchLaterIcon />
                      Pick date & time
                    </MenuItem>
                  </div>
                  <div
                    id="datePickBox"
                    style={{
                      display: this.state.displayDatePick,
                    }}
                  >
                    <Typography onClick={this.clickPickDate}>
                      <ArrowBackIcon />
                      Pick Date & Time
                    </Typography>
                    <TextField
                      id="date"
                      type="date"
                      onChange={this.handleChangeDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id={this.state.alNotes.id}
                      select
                      label="Time"
                      value="morning8:00AM"
                      // onChange={this.handleChangeTime}
                      helperText="Please select your time"
                    >
                      {this.timing.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Button onClick={this.setReminderOnclick}>Save</Button>
                  </div>
                </Menu>

                <Tooltip title="Collaborator" arrow>
                  <IconButton>
                    <PersonAddOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Change color" arrow>
                  <IconButton
                    id="colorBut"
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                  >
                    <img
                      style={{
                        height: "20px",
                        opacity: ".5",
                      }}
                      src={coloricon}
                      alt="c"
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add image" arrow>
                  <IconButton>
                    <ImageOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Archive" arrow>
                  <IconButton onClick={this.handleArchive}>
                    {this.state.isArchived ? (
                      <UnarchiveIcon />
                    ) : (
                      <ArchiveOutlinedIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>

                {/* <div style={{ position: "relative" }}> */}
                <Tooltip title="More" arrow>
                  <IconButton onClick={this.handleClickMore}>
                    <MoreVertOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
              <Popover
                //id="menu"
                className="moreMenu_popper"
                onClose={this.moreClose}
                open={this.state.moreMenuOpen}
                anchorEl={this.state.moreMenuAnchor}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div
                  //id="moreone"
                  onClick={this.handleClickMore}
                  className="moreMenu_content"
                >
                  <MenuItem>
                    <AddLabelSubNote
                      alNotes={this.state.alNotes}
                      addNoteLabelTemporary={this.addNoteLabelTemporary}
                    />
                  </MenuItem>
                </div>
                <div>
                  <MenuItem onClick={this.deleteNote}> Delete</MenuItem>
                </div>
              </Popover>
            </div>

            <Popover
              onClose={() => {
                this.setState({
                  colorOpen: false,
                });
              }}
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
              id="colorBut"
              onMouseLeave={this.handleMouseLeave}
            >
              <div className="colorMenu">{colObj}</div>
            </Popover>

            {this.state.labelOpen ? (
              <LabelMenu anchor={this.state.labelAnchor} />
            ) : null}
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default AllNotes;
