import React, { Component } from "react";
import "../CSS/registration.css";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Card,
  Snackbar,
  CardContent,
  CardActions,
} from "@material-ui/core";
import userServices from "../services/userServices";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({}));

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
      advanceService: "ADD TO CART",
      basicService: "ADD TO CART",
      advanceBGcolor: "gray",
      basicBGcolor: "gray",
    };
    if (this.props.location.data) {
      if (this.props.location.data.service === "advance") {
        this.state.advanceService = "Selected";
        this.state.advanceBGcolor = "orange";
        this.state.basicBGcolor = "gray";
        this.state.service = "advance";
      } else if (this.props.location.data.service === "basic") {
        this.state.basicService = "Selected";
        this.state.basicBGcolor = "orange";
        this.state.advanceBGcolor = "gray";
        this.state.service = "basic";
      }
    }
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
        service: this.state.service,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      };

      userServices
        .userRegistration(data)
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
        .catch();
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

  onchangeRePassword = (event) => {
    this.setState({ rePassword: event.target.value });
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
  login = () => {
    this.props.history.push("/login");
  };
  render() {
    const classes = {
      useStyles,
    };
    return (
      <div className="registration_Form">
        <Card className="registration_Container">
          <CardContent>
            <Typography className="app_name" variant="h5" color="textSecondary">
              <span style={{ color: "#0606f8" }}>F</span>
              <span style={{ color: "#d10303" }}>u</span>
              <span style={{ color: "#f0b000" }}>n</span>
              <span style={{ color: "#0606f8" }}>d</span>
              <span style={{ color: "green" }}>o</span>
              <span style={{ color: "#d10303" }}>o</span>
            </Typography>
            <Typography
              className="register_title"
              variant="h6"
              color="textPrimary"
            >
              <strong>Create Your Fundoo Account</strong>
            </Typography>
            <Typography variant="body2" component="p">
              <form className={classes.root} noValidate autoComplete="off">
                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  open={this.state.snackbarOpen}
                  autoHideDuration={3000}
                  onClose={() => this.setState({ snackbarOpen: false })}
                  message={this.state.snackbarMessage}
                ></Snackbar>

                <div className="form_row">
                  <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="First Name"
                    variant="outlined"
                    value={this.state.firstName}
                    onChange={this.onchangeFirstName}
                  />
                  <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="Last Name"
                    variant="outlined"
                    value={this.state.lastName}
                    onChange={this.onchangeLastName}
                  />
                </div>
                <div className="form_row">
                  <TextField
                    fullWidth
                    className={classes.margin}
                    value={this.state.email}
                    onChange={this.onchangeEmail}
                    id="input-with-icon-textfield"
                    variant="outlined"
                    label="Email"
                    style={{
                      maxWidth: "572px",
                    }}
                  />
                </div>
                <div className="form_row">
                  <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    variant="outlined"
                    type="password"
                    label="Password"
                    value={this.state.password}
                    onChange={this.onchangePassword}
                  />
                  <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    variant="outlined"
                    type="password"
                    label="Confirm-Password"
                    value={this.state.rePassword}
                    onChange={this.onchangeRePassword}
                  />
                </div>
              </form>
            </Typography>
          </CardContent>
          <div className="register_services">
            <div className="cardbox">
              <div className="small_services_card front_card ">
                <Typography>price: $99 per month</Typography>
                <Typography
                  style={{
                    color: "blue",
                  }}
                >
                  advance
                </Typography>
                <ul className="servicecard_ul">
                  <li>$99/month</li>
                  <li>
                    Ability to add title, description, images, labels, checklist
                    and colors
                  </li>
                </ul>
              </div>
              <div
                className="small_services_card back_card"
                style={{
                  backgroundColor: this.state.advanceBGcolor,
                }}
              >
                {this.state.advanceService}
              </div>
            </div>

            <div className="cardbox">
              <div className="small_services_card front_card">
                <Typography>price: $49 per month</Typography>
                <Typography
                  style={{
                    color: "blue",
                  }}
                >
                  basic
                </Typography>
                <ul className="servicecard_ul">
                  <li>$49/month</li>
                  <li>Ability to add only title and description</li>
                </ul>
              </div>
              <div
                className="small_services_card back_card"
                style={{
                  backgroundColor: this.state.basicBGcolor,
                }}
              >
                {this.state.basicService}
              </div>
            </div>
          </div>
          <div className="loginText" onClick={this.login}>
            <span>Login instead</span>
          </div>
          <div className="set_Button">
            {/*   <Button
              form="styled_component"
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.login}
            >
              Login
              </Button> */}
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
