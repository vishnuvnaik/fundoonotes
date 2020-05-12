import React from "react";
import "./CSS/forget.css";
import userServices from "../services/userServices";
import { TextField, Card, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      snackbarMsg: "",
      snackbarOpen: false,
      errs: {},
    };
  }
  onSubmit = (event) => {
    event.preventDefault();
    console.log("hello");
    let errs = {};
    let formIsValid = true;
    const errors = this.validate(this.state);
    if (errors.email || this.state.email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Enter proper email-ID.   ",
      });
      formIsValid = false;
      errs["email"] = "* required  valid mail id";
    } else {
      let sendData = {
        email: this.state.email,
      };

      userServices.forgotPassword(sendData)
        .then((response) => {
          console.log(response);
          if (response === undefined) {
            this.setState({
              snackbarOpen: true,
              snackbarMsg: "Check your E-Mail",
            });
            this.props.history.push("/login");
          } else {
            this.setState({
              snackbarOpen: true,
              snackbarMsg: "Invalid Email-ID",
            });
          }
        })
        .catch((err) => {
          this.setState({
            snackbarOpen: true,
            snackbarMsg: err,
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

  onchangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  render() {
    return (
      <div className="forget_Form">
        <Card class="forget_Container">
          <Typography className="app_name" variant="h5" color="textSecondary">
            <span style={{ color: "red" }}>F</span>
            <span style={{ color: "blue" }}>U</span>
            <span style={{ color: "green" }}>N</span>
            <span style={{ color: "maroon" }}>D</span>
            <span style={{ color: "red" }}>O</span>
            <span style={{ color: "blue" }}>O</span>
          </Typography>
          <div className="login"> Find Your Email</div>
          <div className="enterEmail">Enter your registered EMail</div>

          <div className="set_Div" data-test="EMAIL">
            <TextField
              required
              variant="outlined"
              label="email"
              type="text"
              value={this.state.email}
              error={this.state.errs["email"]}
              helperText={this.state.errs["email"]}
              onChange={this.onchangeEmail}
            />
          </div>
          <div className="set_Button">
            <Button
              id="styled_component"
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.onSubmit}
            >
              NEXT
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default ForgetPassword;
