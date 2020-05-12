import React from "react";
import "./CSS/login.css";
import { TextField, Card, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import userServices from "../services/userServices";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      snackbarMessage: "",
      snackbarOpen: false,
      errs: {},
    };
  }
  onSubmit = () => {
    let errs = {};
    let formIsValid = true;
    const errors = this.validate(this.state);
    if (errors.email || this.state.email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter proper email-ID.   ",
      });
      formIsValid = false;
      errs["email"] = "* required  valid mail id";
    } else if (this.state.password === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter password",
      });
      formIsValid = false;
      errs["password"] = "* required  valid password";
    } else {
      let sendData = {
        email: this.state.email,
        password: this.state.password,
      };

      userServices
        .login(sendData)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: "Login Succesfully.",
            });
            this.props.history.push("/home");
          } else {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: "Enter correct credentials",
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

  forget = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.props.history.push("/forgetPassword");
  };
  render() {
    return (
      <div className="login_Form">
        <Card class="login_Container">
          <Typography className="app_name" variant="h5" color="textSecondary">
            <span style={{ color: "red" }}>F</span>
            <span style={{ color: "blue" }}>U</span>
            <span style={{ color: "green" }}>N</span>
            <span style={{ color: "maroon" }}>D</span>
            <span style={{ color: "red" }}>O</span>
            <span style={{ color: "blue" }}>O</span>
          </Typography>
          <div className="login">Sign in</div>
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

          <div className="emailAndPass" data-test="EMAIL">
            <TextField
              required
              variant="outlined"
              label="email"
              type="text"
              value={this.state.email}
              error={this.state.errs["email"]}
              helperText={this.state.errs["email"]}
              variant="outlined"
              onChange={this.onchangeEmail}
            />
          </div>
          <div className="emailAndPass">
            <TextField
              required
              variant="outlined"
              label="password"
              type="password"
              value={this.state.password}
              error={this.state.errs["password"]}
              helperText={this.state.errs["password"]}
              onChange={this.onchangePassword}
            />
          </div>
          <div className="forget_style" onClick={this.forget}>
            <span>Forgot password</span>
          </div>
          <div className="set_Button">
            <Button
              id="styled_component"
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.onSubmit}
            >
              LOGIN
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}
export default Login;
