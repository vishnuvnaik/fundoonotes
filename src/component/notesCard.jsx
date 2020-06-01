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
import CheckBox from "@material-ui/icons/CheckBox";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Brush from "@material-ui/icons/Brush";
import Image from "@material-ui/icons/Image";
import noteServices from "../services/noteServices";
import "./CSS/dashboard.css";
import RemainderMenu from "./remainderMenu";
import pin from "../assets/pin.svg";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import CollaboratorComponent from "./Collaborator";
import ReminderComponent from "./Reminder";

import Time from "react-time";
import Palette from "@material-ui/icons/Palette";
import AddLabelNote from "./addLabel";
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
      colorOpen: false,
      colorAnchor: null,
      labelIdList: [],
      labelNotes: [],
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
    for (let i = 0; i < this.state.labelNotes.length; i++) {
      this.state.labelIdList.push(this.state.labelNotes[i].id);
      console.log(this.state.labelNotes[i].id);
    }
    this.setState({ labelIdList: this.state.labelIdList });
    if (this.state.title != "") {
      const form_data = new FormData();
      form_data.append("title", this.state.title);
      form_data.append("description", this.state.description);
      form_data.append("reminder", this.state.reminder);
      form_data.append("isArchived", this.state.isArchived);
      form_data.append("color", this.state.color);
      form_data.append("labelIdList", JSON.stringify(this.state.labelIdList));

      noteServices.addnotes(form_data).then((response) => {
        if (response) {
          this.changeCard();
        }
        this.props.getNotes();
      });

      this.setState({ title: "" });
      this.setState({ description: "" });
      this.setState({ color: "" });
      this.setState({ labelIdList: [] });
      this.setState({ labelNotes: [] });
      //for close the main Note Box
    } else {
      this.changeCard();
    }
  };

  onClickArchive = async () => {
    await this.setState({ isArchived: true });
    this.addNotes();
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
                  <IconButton onClick={this.onClickArchive}>
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
            ) : /* <
                moreClose={this.moreClose}
                menu={this.handleOnClick}
                anchor={this.state.moreMenuAnchor}
              /> */

            null}
          </div>
        </Card>
      </div>
    );
  }
}
export default Notes;
