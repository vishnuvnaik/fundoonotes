import React, { Component } from "react";
import {
  AppBar,
  IconButton,
  Tooltip,
  Card,
  InputBase,
  MuiThemeProvider,
  createMuiTheme,
  Typography,
  Menu,
  Popover,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import keep from "../assets/keep.png";
import "./CSS/dashboard.css";
const theme = createMuiTheme({
  overrides: {
    MuiPopover: {
      paper: {
        width: "30%",
      },
    },
  },
});
export default class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: "",
    };
  }

  render() {
    return (
      <div>
        <AppBar id="appBar_decor">
          <AppBar className="appBar_flex">
            <div className="menu_andname">
              <Tooltip title="Main menu" arrow>
                <IconButton
                  class="reduce_padding"
                  id="butone"
                  onClick={this.handleClick}
                >
                  <MenuIcon id="reduceButtonSize" />
                </IconButton>
              </Tooltip>
              <div className="keepImageSpace">
                {this.state.headerName === "" ? (
                  <React.Fragment>
                    <img className="keep_img" src={keep} alt="F" />
                    <Typography
                      id="fundoo"
                      variant="h5"
                      color="white"
                      style={{
                        marginLeft: "1%",
                      }}
                    >
                      Fundoo
                    </Typography>
                  </React.Fragment>
                ) : (
                  <Typography id="fundoo" variant="h5" color="textSecondary">
                    {this.state.headerName}
                  </Typography>
                )}
              </div>
            </div>
          </AppBar>
        </AppBar>
      </div>
    );
  }
}
