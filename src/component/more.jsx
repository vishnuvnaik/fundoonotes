import React, { Component } from "react";
import { Popover, Dialog, Menu, MenuItem } from "@material-ui/core";
import noteService from "../services/noteServices";
import LabelMenu from "./labelMenu";
import AddLabelNote from "./addLabel";
import "./CSS/dashboard.css";
class MoreMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: this.props.moreMenuOpen,
      menuAnchor: this.props.moreMenuAnchor,
      labelMenu: this.props.labelOpen,
      labelAnchorEL: null,
    };
  }
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
        keepMounted
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
          id="moreone"
          onClick={this.props.menu}
          className="moreMenu_content"
        >
          <MenuItem>
            <AddLabelNote />
          </MenuItem>
        </div>
        <div className="moreMenu_content">
          <MenuItem onClick={this.deleteNote}> Delete</MenuItem>
        </div>
      </Popover>
    );
  }
}
export default MoreMenu;
