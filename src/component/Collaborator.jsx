import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";

class CollaboratorComponent extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div>
        <IconButton>
          <GroupAddOutlinedIcon />
        </IconButton>
      </div>
    );
  }
}
export default CollaboratorComponent;
