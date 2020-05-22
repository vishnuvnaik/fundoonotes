import React, { Component } from "react";
import { Popover } from "@material-ui/core";
import noteService from "../services/noteServices";
import "./CSS/dashboard.css";
class MoreMenu extends Component {
  deleteNote = () => {
    const field = {
      isDeleted: true,
      noteIdList: [this.props.id],
    };
    noteService.trashNote(field).then((res) => {
      this.props.getNote();
    });
  };
  handlelabel = (event) => {
    const field2 = {
      label: event.currentTarget,
    };
    noteService.labelNote(field2).then((response) => this.props.getNote());
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
        ></div>
        <div className="moreMenu_content" onClick={this.props.addInstanceLabel}>
          <span>Add label</span>
        </div>
        <div className="moreMenu_content" onClick={this.deleteNote}>
          <span>Delete note</span>
        </div>
        <div className="moreMenu_content">
          <span>Add drawing</span>
        </div>
        <div className="moreMenu_content">
          <span>Show tick boxes</span>
        </div>
      </Popover>
    );
  }
}
export default MoreMenu;
