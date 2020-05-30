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
  isReminder = (event) => {
    const { currentTarget } = event;
    this.setState({
      open: !this.state.open,
      anchorEl: currentTarget,
    });
    console.log("in reminder");
  };

  render() {
    return (
      <div>
        <IconButton onClick={(event) => this.isReminder(event)}>
          <NotificationsNone />
        </IconButton>
        <Card>
          <Popper
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            position="absolute"
            z-index="1"
          >
            <Paper>
              <div>
                Reminders
                <MenuItem onClick={(event) => this.today}>
                  Later today : 08:00 PM
                </MenuItem>
              </div>
              <div>
                <MenuItem onClick={(event) => this.tomorrow}>
                  Tomorrow : 08:00 AM
                </MenuItem>
              </div>
            </Paper>
          </Popper>
        </Card>
      </div>
    );
  }
}
export default ReminderComponent;
