import React, { Component } from "react";
import AddAlert from "@material-ui/icons/AddAlert";
import {
  IconButton,
  Card,
  Paper,
  MenuItem,
  TextField,
  Button,
  Popper,
} from "@material-ui/core";
import "./CSS/dashboard.css";
import NotificationsNone from "@material-ui/icons/NotificationsNone";

class ReminderComponent extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      date: "",
      time: "",
      reminder: "",
    };
  }

  render() {
    return (
      <div>
        <IconButton onClick={(event) => this.isReminder(event)}>
          <NotificationsNone />
        </IconButton>
      </div>
    );
  }
}
export default ReminderComponent;
