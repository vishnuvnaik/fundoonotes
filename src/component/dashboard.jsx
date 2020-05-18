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
import People from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import Settings from "@material-ui/icons/Settings";
import RefreshIcon from "@material-ui/icons/Refresh";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import Dialpad from "@material-ui/icons/Dialpad";
import SideMenu from "./sideMenu";
import keep from "../assets/keep.png";
import Notes from "./notesCard";
import "./CSS/dashboard.css";
import ShowNotes from "./showNotes";
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
      grid: false,
      archive: false,
      reminder: false,
      trash: false,
      note: [],
      Pinned: false,
    };
  //  this.openGrid = this.openGrid.bind(this);
    // this.showClickedNote = this.showClickedNote.bind(this);
  }
  handleDrawer() {
    this.setState({ open: !this.state.open });
  }
  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    this.props.history.push("/login");
  };
  openGrid() {
    console.log("in dashboard");

    this.setState({
      grid: !this.state.grid,
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AppBar className="appBar" position="fixed" color="white">
            <Toolbar>
              <div className="menuAndlogo">
                <Tooltip title="main menu">
                  <IconButton onClick={() => this.handleDrawer()}>
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
                <div className="nameAndlogo">
                  <img className="keep_img" src={keep} alt="F" />
                  <div className="headerName">
                    <Typography color="default" variant="h6">
                      Fundoo
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="search">
                <Tooltip title="Search">
                  <IconButton size="large" id="searchButton" color="white">
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
                <InputBase placeholder="Search" />
              </div>

              <div className="appicons">
                <div>
                  <Tooltip title="Refresh page">
                    <IconButton>
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="List View">
                    <IconButton>
                      <ViewStreamIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Grid View">
                    <IconButton>
                      <Dialpad />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Settings">
                    <IconButton>
                      <Settings />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="logout">
                    <IconButton onClick={this.handleLogout}>
                      <People />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <SideMenu sideOpen={this.state.open} />
          <Notes />
          <ShowNotes />
        </div>
      </MuiThemeProvider>
    );
  }
}
