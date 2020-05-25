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
  Typography,
} from "@material-ui/core";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import DoneIcon from "@material-ui/icons/Done";
import pin from "../assets/pin.svg";
import noteService from "../services/noteServices";
import coloricon from "../assets/color.svg";
import LabelMenu from "./labelMenu";
import MoreMenu from "./more";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
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
      labelIdList: this.props.allNotes.labelIdList,
      noteLabels: this.props.allNotes.noteLabels,
      noteIdList: this.props.allNotes.id,
      remainder:this.props.allNotes.reminder,
      labelOpen: false,
      labelAnchor: null,
      moreMenuOpen: false,
      moreMenuAnchor: null,
      colorOpen: false,
      colorAnchor: null,
      openDialog: false,
      visible: false,
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
        })
    }
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
    });
  };
  handleArchive = () => {
    const field = {
      isArchived: !this.state.isArchived,
      noteIdList: [this.state.noteIdList],
    };
    noteService.archiveNote(field).then((res) => {
      console.log("done");
      this.props.getNote();
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
        setTimeout(() => {
          this.setState({
            moreMenuOpen: !this.state.moreMenuOpen,
            moreMenuAnchor: event.currentTarget,
          });
        }, 100);
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
  handleClickMore = (event) => {
    this.setState({
      moreMenuOpen: !this.state.moreMenuOpen,
      moreMenuAnchor: event.currentTarget,
      labelAnchor: event.currentTarget,
    });
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
                  {this.state.label == "" ? (
                    <React.Fragment>
                      {this.state.remainder.length !== 0 ? (
                        <Chip
                          clickable
                          id="chip"
                          deleteIcon={<DoneIcon />}
                          label={
                            <Typography
                              style={{
                                fontSize: "10px",
                              }}
                            ></Typography>
                          }
                        />
                      ) : null}
                    </React.Fragment>
                  ) : null}
                  {this.state.label ? (
                    <Chip
                      clickable
                      id="chip"
                      deleteIcon={<DoneIcon />}
                      label={
                        <Typography
                          style={{
                            fontSize: "10px",
                          }}
                        >
                          {this.state.label}
                        </Typography>
                      }
                    />
                  ) : null}
                </div>

                {/* <div className="labelRemDate">
                  {this.state.noteLabels.map((ele, index) => {
                    return (
                      <div>
                        <div>{ele.label}</div>
                        <IconButton size="small">
                          <HighlightOffIcon
                            onClick={(e) =>
                              this.removeLabeFromNote(ele.id, index)
                            }
                          />
                        </IconButton>
                      </div>
                    );
                  })}
                </div> */}

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
                    <Tooltip title="Change color" arrow>
                      <IconButton
                        id="colorBut"
                        onMouseEnter={this.handleMouseEnter}
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
                      <IconButton>
                        <ArchiveOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="More" arrow>
                      <IconButton
                        onClick={(event) => {
                          setTimeout(() => {
                            this.setState({
                              moreMenuOpen: !this.state.moreMenuOpen,
                              moreMenuAnchor: event.currentTarget,
                              labelAnchor: event.currentTarget,
                            });
                          }, 100);
                        }}
                      >
                        <MoreVertOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>
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
            className="gridCard"
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
                  <IconButton>
                    <AddAlertOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Collaborator" arrow>
                  <IconButton>
                    <PersonAddOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Change color" arrow>
                  <IconButton
                    id="colorBut"
                    onMouseEnter={this.handleMouseEnter}
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
                    <ArchiveOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="More" arrow>
                  <IconButton
                    onClick={(event) => {
                      setTimeout(() => {
                        this.setState({
                          moreMenuOpen: !this.state.moreMenuOpen,
                          moreMenuAnchor: event.currentTarget,
                          labelAnchor: event.currentTarget,
                        });
                      }, 100);
                    }}
                  >
                    <MoreVertOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            {this.state.labelOpen ? (
              <LabelMenu anchor={this.state.labelAnchor} />
            ) : null}
            {this.state.moreMenuOpen ? (
              <MoreMenu
                menu={this.handleOnClick}
                anchor={this.state.moreMenuAnchor}
                id={this.state.noteIdList}
                getNote={this.props.getNote}
              />
            ) : null}

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
              id="colorbox"
              onMouseLeave={this.handleMouseLeave}
            >
              <div className="colorMenu">{colObj}</div>
            </Popover>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default AllNotes;
