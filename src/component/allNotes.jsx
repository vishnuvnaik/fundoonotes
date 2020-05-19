import React, { PureComponent } from "react";
import BrushIcon from "@material-ui/icons/Brush";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import {
  Tooltip,
  IconButton,
  ClickAwayListener,
  span,
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
const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paper: {
        width: "35%",
      },
    },
  },
});
class AllNotes extends PureComponent {
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
      case "butfour":
        this.setState({
          colorOpen: true,
          colorAnchor: event.currentTarget,
        });
        break;
      case "divbut":
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
      case "colorbox":
        this.setState({
          colorOpen: false,
        });
        break;
      case "divbut":
        this.setState({
          visible: false,
        });
        break;

      default:
        break;
    }
  };
  handleChange = () => {};
  pinNote = async () => {
    const field = {
      isPined: this.state.isPined,
      noteIdList: [this.state.noteIdList],
    };
    await noteService.pinNote(field).then((res) => {
      this.props.getNote();
    });
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
      case "butto":
        alert("hello");
        this.setState({
          remOpen: !this.state.remOpen,
          remAnchor: event.currentTarget,
        });
        break;
      case "butthree":
        this.setState({
          cardChange: false,
          collaborator: true,
        });
        break;
      case "butseven":
        setTimeout(() => {
          this.setState({
            moreMenuOpen: !this.state.moreMenuOpen,
            moreMenuAnchor: event.currentTarget,
          });
        }, 100);
        break;
      case "moreone":
        this.setState({
          labelOpen: true,
          labelAnchor: event.currentTarget,
          moreMenuOpen: false,
        });
        break;
      case "cardbutone":
        this.setState({
          collaborator: false,
          cardChange: false,
        });
        break;
      case "normalCard2":
        const field = {
          title: this.state.title,
          description: this.state.content,
        };
        noteService.createNote(field).then((res) => {
          if (res.status === 200) {
            alert("done");
          }
          this.props.getNotes();
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
    // console.log(this.state.remainder);

    // let colObj = color.map((el, index) => {
    //   return (
    //     <div
    //       key={index}
    //       className="colorIcons"
    //       style={{
    //         backgroundColor: el,
    //       }}
    //       onClick={async () => {
    //         await this.setState({
    //           color: el,
    //         });
    //         this.changeColor();
    //       }}
    //     />
    //   );
    // });
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
                    onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  className="inputThree"
                  type="text"
                  value={this.state.content}
                  placeholder="Take a Note..."
                />

                <div className="arrangeCardToIcon">
                  <div>
                    <Tooltip title="Remainder" arrow>
                      <IconButton onClick={this.handleOnClick}>
                        <AddAlertOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Collaborator" arrow>
                      <IconButton onClick={this.handleOnClick}>
                        <PersonAddOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Change color" arrow>
                      <IconButton
                        id="butfour"
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
                      <IconButton id="butse" onClick={this.handleOnClick}>
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
            id="divbut"
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
                onChange={this.handleChange}
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
              onChange={this.handleChange}
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
                  <IconButton id="butfour" onMouseEnter={this.handleMouseEnter}>
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
                  <IconButton>
                    <MoreVertOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
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
              id="colorbox"
              onMouseLeave={this.handleMouseLeave}
            >
              <div className="colorMenu"></div>
            </Popover>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default AllNotes;
