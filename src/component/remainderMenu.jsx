import React from "react";
import { IconButton } from "@material-ui/core";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import { Menu, MenuItem } from "@material-ui/core";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../CSS/dashboard.css";
import Moment from "react-moment";

export default class ReminderNewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminderMenuAnchor: null,
      reminderMenuOpen: false,
      displayReminder: "",
      displayDatePick: "none",
      date: "",
      time: "",
    };
  }
  timing = [
    {
      value: "morning8:00AM",
      label: "morning     8:00 AM",
    },
    {
      value: "afternoon1:00PM",
      label: "afternoon   1:00 PM",
    },
    {
      value: "evening4:00PM",
      label: "evening     4:00 PM",
    },
    {
      value: "night8:00PM",
      label: "night       8:00 PM",
    },
  ];
  remiderHandler = (event) => {
    this.setState({
      reminderMenuAnchor: event.currentTarget,
      reminderMenuOpen: !this.state.reminderMenuOpen,
    });
  };
  setReminderOnclick = (event) => {
    let time = "";
    let date = new Date();
    if (event.target.getAttribute("time")) {
      time = new Date(
        date.setDate(
          date.getDate() + parseInt(event.target.getAttribute("time"))
        )
      ).toString();
    } else {
      time = new Date(this.state.date).toString();
    }
    // this.setState({ reminderMain: time });
    this.props.reminderMainSet(time);
    this.setState({ reminderMenuOpen: !this.state.reminderMenuOpen });
  };
  clickPickDate = () => {
    this.setState({
      displayReminder: this.state.displayReminder === "" ? "none" : "",
    });
    this.setState({
      displayDatePick: this.state.displayDatePick === "" ? "none" : "",
    });
  };
  handleChangeDate = (event) => {
    this.setState({ date: event.target.value });
  };
  handleChangeTime = (event) => {
    this.setState({ time: event.currentTarget.dataset.value });
  };
  render() {
    return (
      <div>
        <IconButton onClick={this.remiderHandler}>
          <AddAlertIcon />
        </IconButton>
        <Menu
          className="reminderMenu"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          anchorEl={this.state.reminderMenuAnchor}
          keepMounted
          open={this.state.reminderMenuOpen}
          onClose={this.remiderHandler}
        >
          <div
            style={{
              display: this.state.displayReminder,
            }}
          >
            <li className="reminderHeading">Reminder</li>
            <MenuItem time="0" onClick={this.setReminderOnclick}>
              Later today 8:00 PM
            </MenuItem>
            <MenuItem time="1" onClick={this.setReminderOnclick}>
              Tomorrow 8:00 AM
            </MenuItem>
            <MenuItem time="7" onClick={this.setReminderOnclick}>
              Next Week 8:00 AM
            </MenuItem>
            <MenuItem onClick={this.clickPickDate}>
              <WatchLaterIcon />
              Pick date & time
            </MenuItem>
          </div>
          <div
            id="datePickBox"
            style={{
              display: this.state.displayDatePick,
            }}
          >
            <Typography onClick={this.clickPickDate}>
              <ArrowBackIcon />
              Pick Date & Time
            </Typography>
            <TextField
              id="date"
              type="date"
              onChange={this.handleChangeDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="standard-select-currency"
              select
              label="Time"
              value={"morning8:00AM"}
              onChange={this.handleChangeTime}
              helperText="Please select your time"
            >
              {this.timing.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button onClick={this.setReminderOnclick}>Save</Button>
          </div>
        </Menu>
      </div>
    );
  }
}
