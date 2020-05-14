import React, { Component } from "react";

import {
  AppBar,
  IconButton,
  Tooltip,
  InputBase,
  MuiThemeProvider,
  createMuiTheme,
  Typography,
  Toolbar,
  Menu,
  Popover,
  Card,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import settingsIcon from "@material-ui/icons/Settings";
import RefreshIcon from "@material-ui/icons/Refresh";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import SideMenu from "./sideMenu";
import keep from "../assets/keep.png";
import Notes from "./notesCard";
import "./CSS/dashboard.css";
const theme = createMuiTheme({
  overrides: {
    MuiToolbar: {
      root: {
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
      },
    },
  },
});

export default class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleDrawer() {
    this.setState({ open: !this.state.open });
  }
  handleLogout = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AppBar position="fixed" color="white">
            <Toolbar>
              <div className="menuAndlogo">
                <Tooltip title="main menu">
                  <IconButton onClick={() => this.handleDrawer()}>
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
                <div className="nameAndlogo">
                  <img className="keep_img" src={keep} alt="F" />
                  <Typography color="default" variant="h6">
                    Fundoo
                  </Typography>
                </div>
              </div>
              <div className="search">
                <IconButton size="large" id="searchButton" color="white">
                  <SearchIcon />
                </IconButton>
                <InputBase placeholder="Search" />
              </div>

              <div className="appicons">
                <div>
                  <IconButton>
                    <RefreshIcon />
                  </IconButton>
                </div>
                <div>
                  <IconButton>
                    <ViewStreamIcon />
                  </IconButton>
                </div>
                <div>
                  <IconButton>
                    <settingsIcon />
                  </IconButton>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <SideMenu sideOpen={this.state.open} sideNote={this.props.varNote} />
          <Notes />
        </div>
      </MuiThemeProvider>
    );
  }
}
