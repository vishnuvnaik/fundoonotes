import React from "react";
import "./CSS/forget.css";
import forgotPassword from "../services/userServices";
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
    };
  }
  handleOnChange = (event) => {
    this.setState({ email: event.target.value });
  };
  validation = () => {
    if (this.state.email !== "") {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
      ) {
        const data = {
          email: this.state.email,
        };
        forgotPassword(data)
          .then((res) => {
            if (res === undefined) {
              this.setState({
                snackbarOpen: true,
                snackbarMsg: "Check your E-Mail",
              });
              setTimeout(() => {
                this.props.history.push("/login");
              }, 2000);
              return;
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
      } else {
        this.setState({
          snackbarOpen: true,
          snackbarMsg: "Invalid E-mail",
        });
      }
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Enter Your E-Mail",
      });
    }
  };
  handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      snackbarOpen: false,
    });
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
          <Snackbar
            // id="snackbar_color"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            autoHideDuration={3000}
            open={this.state.snackbarOpen}
            message={this.state.snackbarMsg}
            // action={[
            //   <IconButton
            //     size="small"
            //     aria-label="close"
            //     color="secondary"
            //     onClick={this.handleClose}
            //   >
            //     <CloseIcon fontSize="small" />
            //   </IconButton>
            // ]}
          />

          <div className="set_Div" data-test="EMAIL">
            <TextField
              required
              variant="outlined"
              label="email"
              type="text"
              value={this.state.email}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="set_Button">
            <Button
              id="styled_component"
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.validation}
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
