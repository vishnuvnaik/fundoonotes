import React, { Component } from "react";
import { Popover, Dialog, Menu } from "@material-ui/core";
import noteService from "../services/noteServices";
import LabelMenu from "./labelMenu";
import AddLabelNote from "./addLabel";
import "./CSS/dashboard.css";
class MoreMenu extends Component {
  deleteNote = () => {
    const field = {
      isDeleted: true,
      noteIdList: [this.props.id],
      labelIdList: [],
    };
    noteService.trashNote(field).then((res) => {
      this.props.getNote();
    });
  };
  handleClickLabel = (event) => {
    this.setState({
      menuOpen: false,
      menuanchorEl: false,
      labelMenu: true,
      labelAnchorEl: event.currentTarget,
    });
  };
  handlelabel = (event) => {
    const field2 = {
      label: event.currentTarget,
    };
    noteService.noteLabel(field2).then((response) => this.props.getNote());
  };
  labelIdListChange = () => {
    this.setState({ labelIdList: this.state.labelIdList });
  };

  render() {
    return (
      <Popover
        class="moreMenu_popper"
        onClose={this.props.moreClose}
        open={true}
        anchorEl={this.props.anchor}
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
          onClick={this.props.menu}
          className="moreMenu_content"
        >
          <AddLabelNote
            labelIdList={this.state.labelIdList}
            labelIdListChange={this.labelIdListChange}
          />
        </div>
        <div className="moreMenu_content" onClick={this.deleteNote}>
          <span>Delete note</span>
        </div>
      </Popover>
    );
  }
}
export default MoreMenu;
