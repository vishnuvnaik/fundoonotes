import React, { Component } from "react";
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
  MuiThemeProvider,
  createMuiTheme,
  Paper,
  Menu,
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
  "#7FDBFF",
  "#ff3333",
  "#00b300",
  "#ccff90",
  "#f28b82",
  "#aecbfa",
  "#fbbc04",
  "#fff",
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
      isPined: this.props.allNotes.isPined,
      noteLabels: this.props.allNotes.noteLabels,
      noteIdList: this.props.allNotes.id,
      labelOpen: false,
      labelAnchor: null,
      remOpen: false,
      remAnchor: null,
      moreMenuOpen: false,
      moreMenuAnchor: null,
      colorOpen: false,
      colorAnchor: null,
      openDialog: false,
      visible: false,
    };
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

      case "inputone":
        this.setState({
          cardChange: !this.state.cardChange,
        });
        break;

      case "normalCard":
        const field = {
          title: this.state.title,
          description: this.state.content,
        };
        noteService.addnotes(field).then((res) => {
          if (res.status === 200) {
            this.setState({ openDialog: false });
          }
          this.props.getNote();
        });
        setTimeout(() => {
          this.setState({
            collaborator: false,
            cardChange: false,
            title: "",
            content: "",
          });
        }, 100);
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
              <DialogContent id="visible">
                <div className="cardTwoTopArr">
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

                <div className="arrangeCardToIcon">
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
                    <Tooltip title="More Menu" arrow>
                      <IconButton>
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
                : "none",
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

            <div className="arrangeCardToIcon">
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
                  <IconButton>
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
