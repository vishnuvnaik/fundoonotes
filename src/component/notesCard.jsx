import React, { Component } from "react";
import {
  Card,
  InputBase,
  IconButton,
  Tooltip,
  Toolbar,
  Button,
  Chip,
  Typography,
  Popover,
} from "@material-ui/core";
import CheckBox from "@material-ui/icons/CheckBox";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Brush from "@material-ui/icons/Brush";
import Image from "@material-ui/icons/Image";
import noteServices from "../services/noteServices";
import "./CSS/dashboard.css";
import pin from "../assets/pin.svg";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import CollaboratorComponent from "./Collaborator";
import ReminderComponent from "./Reminder";
import LabelMenu from "./labelMenu";
import MoreMenu from "./more";
import DoneIcon from "@material-ui/icons/Done";
import Time from "react-time";
import Palette from "@material-ui/icons/Palette";
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
      colorOpen: false,
      colorAnchor: null,
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
      }
    });
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
    if (this.state.label === "") {
      const field = {
        title: this.state.title,
        description: this.state.description,
        reminder: this.state.remainder,
        color: this.state.color,
        isArchived: this.state.isArchived,
        isPined: this.state.isPined,
      };
      noteServices.addnotes(field).then((res) => {
        if (res.status === 200) {
        }
        this.props.getNotes();
        this.setState({
          collaborator: false,
          cardChange: true,
          title: "",
          description: "",
          remainder: "",
          label: "",
          color: "",
        });
      });
      this.changeCard();
    } else {
      const fieldtwo = {
        title: this.state.title,
        description: this.state.description,
        reminder: this.state.remainder,
        color: this.state.color,
        isArchived: this.state.isArchived,
        isPined: this.state.isPined,
        label: this.state.label,
        isDeleted: false,
        userId: JSON.parse(localStorage.getItem("userDetails")).userId,
        //noteIdList: [res.data.status.details.id]
      };
      this.changeCard();

      noteServices.labelNote(fieldtwo).then(() => {
        this.setState({
          collaborator: false,
          cardChange: true,
          title: "",
          content: "",
          remainder: "",
          label: "",
          color: "",
        });
      });
    }
  };
  archived = () => {
    this.setState({
      isArchived: true,
    });
  };
  handleClickMore = (event) => {
    this.setState({
      moreMenuOpen: !this.state.moreMenuOpen,
      moreMenuAnchor: event.currentTarget,
      labelAnchor: event.currentTarget,
    });
  };

  changeLabel = async (data) => {
    await this.setState({
      label: data,
    });
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
  moreone = () => {
    this.setState({
      labelOpen: true,
      moreMenuOpen: false,
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
                <Tooltip title="Change color" arrow>
                  <IconButton onClick={this.handleColorBut}>
                    <Palette />
                  </IconButton>
                </Tooltip>
              </div>

              <div>
                <Tooltip title="Archive" arrow>
                  <IconButton onClick={this.archived}>
                    <ArchiveOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                <Tooltip title="More" arrow>
                  <IconButton onClick={this.handleClickMore}>
                    <MoreVertOutlinedIcon fontSize="small" />
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
              <LabelMenu
                labelClose={this.labelClose}
                changeLabel={this.changeLabel}
                anchor={this.state.labelAnchor}
              />
            ) : null}
            {this.state.moreMenuOpen ? (
              <MoreMenu
                moreClose={this.moreClose}
                menu={this.handleOnClick}
                anchor={this.state.moreMenuAnchor}
              />
            ) : null}
          </div>
        </Card>
      </div>
    );
  }
}
export default Notes;
