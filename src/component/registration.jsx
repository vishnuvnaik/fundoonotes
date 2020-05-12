import React, { Component } from "react";
import "./CSS/registration.css";
//import CloseIcon from "@material-ui/icons/Close";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import userServices from "../services/userServices";
// import Snackbar from "@material-ui/core/Snackbar";
// import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      snackbarOpen: false,
      snackbarMessage: "",
      service: "",
    };
  }

  onSubmit = () => {
    const errors = this.validate(this.state);
    if (errors.email || this.state.email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter proper email-ID.   ",
      });
    } else if (this.state.password === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter correct password",
      });
    } else {
      let data = {
        service: "advance",
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      };

      userServices.userRegistration(data)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: "Registration Successful",
            });
            this.props.history.push("/login");
          } else {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: "Some problem occured while Registration",
            });
          }
        })
        .catch((err) => {
          this.setState({
            snackbarOpen: true,
            snackbarMessage: err,
          });
        });
    }
  };

  validate = (data) => {
    const errors = {};
    if (!/([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(data.email))
      errors.email = "Invalid email";
    return errors;
  };

  onchangeFirstName = (event) => {
    if (/^[a-zA-Z]*$/.test(event.target.value)) {
      this.setState({ firstName: event.target.value });
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter only alphabets   ",
      });
    }
  };

  onchangeLastName = (event) => {
    if (/^[a-zA-Z]*$/.test(event.target.value)) {
      this.setState({ lastName: event.target.value });
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter only alphabets.   ",
      });
    }
  };

  onchangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onchangePassword = (event) => {
    if (event.target.value.match("^[A-Za-z0-9]*$") != null) {
      this.setState({ password: event.target.value });
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "enter correct password",
      });
    }
  };

  onchangeRePassword = async (event) => {
    await this.setState({ rePassword: event.target.value });
    this.checkPassword();
  };

  checkPassword() {
    if (this.state.password === this.state.rePassword) {
      this.setState({ snackbarOpen: true, snackbarMessage: "done" });
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "enter same password",
      });
    }
  }

  SnackbarClose = (e) => {
    this.setState({ snackbarOpen: false });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };
  loginPage = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="registration_Form">
        <Card className="registration_Container">
          <Typography className="app_name" variant="h5" color="textSecondary">
            <span style={{ color: "red" }}>F</span>
            <span style={{ color: "blue" }}>U</span>
            <span style={{ color: "green" }}>N</span>
            <span style={{ color: "maroon" }}>D</span>
            <span style={{ color: "red" }}>O</span>
            <span style={{ color: "blue" }}>O</span>
          </Typography>
          <Typography
            className="register_title"
            variant="h6"
            color="textSecondary"
          >
            <strong>Create Your Fundoo Account</strong>
          </Typography>
          
          <div className="firstAndPass">
            <div>
              <TextField
                required
                fullWidth
                variant="outlined"
                label="firstname"
                type="text"
                value={this.state.firstName}
                onChange={this.onchangeFirstName}
              />
            </div>
            <div className="lastAndRePass">
              <TextField
                fullWidth
                required
                label="lastname"
                variant="outlined"
                type="text"
                value={this.state.lastName}
                onChange={this.onchangeLastName}
              />
            </div>
          </div>

          <div className="email">
            <TextField
              required
              label="email"
              fullWidth
              variant="outlined"
              type="text"
              value={this.state.email}
              onChange={this.onchangeEmail}
            />
          </div>
          <div className="firstAndPass">
            <div>
              <TextField
                required
                label="password"
                fullWidth
                variant="outlined"
                type="password"
                value={this.state.password}
                onChange={this.onchangePassword}
              />
            </div>
            <div className="lastAndRePass">
              <TextField
                required
                label="Re-enter password"
                fullWidth
                variant="outlined"
                type="password"
                value={this.state.rePassword}
                onChange={this.onchangeRePassword}
              />
            </div>
          </div>
          <div className="set_Button">
            <Button
              form="styled_component"
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.onSubmit}
            >
              SUBMIT
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}
export default withRouter(Registration);
