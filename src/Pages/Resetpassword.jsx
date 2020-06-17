import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import userServices from "../services/userServices";
import Snackbar from "@material-ui/core/Snackbar";
import { IconButton, Card, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "../CSS/resetPassword.css";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: null,
      username: "",
      userdata: [],
      show: false,
      login: "Reset Password",
      next: false,
      password: "",
      helperTextpassowrd: "",
      confirmPassword: "",
      helperTextCpassowrd: "",
      snackbaropen: false,
      snackbarmsg: "",
      confirmpassword: "",
      pass: null,
    };
  }
  Reset = () => {
    this.validator();
    let data = {
      newPassword: this.state.password,
    };
    const id = JSON.parse(localStorage.getItem("id"));
    if (this.state.helperTextpassowrd === "") {
      if (this.state.pass === true) {
        userServices.resetPassword(data, id).then((response) => {
          console.log(response);
          if (response.statusText === "No Content") {
            this.setState({
              snackbaropen: true,
              snackbarmsg: "Succefully changed.",
            });
            this.props.history.push({
              pathname: "/login",
            });
          } else {
            this.setState({
              snackbarmsg: "Password not successfull",
              snackbaropen: true,
            });
          }
        });
      }
    } else {
      this.setState({
        snackbarmsg: "Make sure password and confirm is correct",
        snackbaropen: true,
      });
    }
  };
  validator = () => {
    if (this.state.password !== "") {
      if (
        /[\@\#\$\%\^\&\*\(\)\_\+\!]/.test(this.state.password) &&
        /[a-z]/.test(this.state.password) &&
        /[0-9]/.test(this.state.password) &&
        /[A-Z]/.test(this.state.password)
      ) {
        this.setState({
          password: this.state.password,
          helperTextpassowrd: "",
          // error: false
        });
      } else {
        this.setState({
          helperTextpassowrd: "Min 8 char, at least 1 letter,1 no & 1 spl char",
          error: true,
          password: this.state.password,
        });
      }
    } else if (this.state.password === "") {
      this.setState({
        helperTextpassowrd: "Enter the password",
        error: true,
        password: this.state.password,
      });
    }
    if (this.state.confirmpassword === "") {
      this.setState({
        helperTextCpassowrd: "Enter the confirm password",
        error: true,
        confirmpassword: this.state.confirmpassword,
      });
    } else {
      this.checkPassword();
    }
  };

  //close snackbar
  handleClose = (event) => {
    this.setState({ snackbaropen: false });
  };
  onchangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onchangePasswordagain = (event) => {
    this.setState({
      confirmpassword: event.target.value,
    });
  };

  checkPassword = () => {
    if (this.state.password === this.state.confirmpassword) {
      this.setState({
        snackbaropen: true,
        snackbarmsg: "Password changed",
        pass: true,
      });
      this.setState({
        confirmpassword: this.state.confirmpassword,
        helperTextpassowrd: "",
        error: false,
      });
    } else {
      this.setState({
        snackbaropen: true,
        snackbarmsg: "enter same password",
        pass: false,
      });
    }
  };
  login = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="login_Form">
        <Card class="login_Container">
          <CardContent>
            <Typography className="app_name" variant="h5" color="textSecondary">
              <span style={{ color: "red" }}>F</span>
              <span style={{ color: "blue" }}>U</span>
              <span style={{ color: "green" }}>N</span>
              <span style={{ color: "maroon" }}>D</span>
              <span style={{ color: "red" }}>O</span>
              <span style={{ color: "blue" }}>O</span>
            </Typography>

            <div className="login">Reset Password</div>
            <div className="emailAndPass">
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                id="newPass"
                variant="outlined"
                type="password"
                label="NewPassword"
                helperText={this.state.helperTextpassowrd}
                error={this.state.helperTextpassowrd}
                onChange={this.onchangePassword}
              />
            </div>
            <div className="emailAndPass">
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                id="confPassword"
                variant="outlined"
                type="password"
                label="Re-enter New Password"
                helperText={this.state.helperTextCpassowrd}
                error={this.state.helperTextCpassowrd}
                onChange={this.onchangePasswordagain}
              />
            </div>
            <div className="forget_style" onClick={this.login}>
              <span>Login</span>
            </div>
            <div className="set_Button">
              <Button
                id="styled_component"
                type="submit"
                variant="contained"
                color="primary"
                onClick={(e) => this.Reset(e)}
              >
                Change Password
              </Button>
            </div>

            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              open={this.state.snackbaropen}
              autoHideDuration={3000}
              onClose={this.handleClose}
              message={this.state.snackbarmsg}
              action={[
                <IconButton
                  key="close"
                  arial-label="close"
                  color="inherit"
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            ></Snackbar>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default ResetPassword;
