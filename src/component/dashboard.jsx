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
  ThemeProvider,
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
import noteServices from "../services/noteServices";
import AllNotes from "./allNotes";
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

      Pinned: false,
      headerName: "",
      allNotes: [],
      labelNotes: [],
    };
  }
  componentDidMount() {
    this.getNote();
    this.getLabel();
  }
  handleDrawer() {
    this.setState({ open: !this.state.open });
  }
  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    this.props.history.push("/login");
  };
  getLabel = async () => {
    let array = [];
    await noteServices.getNoteLabel().then((res) => {
      console.log(res);

      res.data.data.details.forEach((element) => {
        array.push(element);
      });
    });
    this.setState({
      labelNotes: array,
    });
  };
  getNote = async () => {
    let array = [];
    await noteServices.getnotes().then((res) => {
      res.data.data.data.forEach((element) => {
        array.push(element);
      });
    });
    this.setState({
      allNotes: array,
    });
  };
  nameChange = (data) => {
    this.setState({
      headerName: data,
    });
  };
  handleScroll = (event) => {
    event.preventDefault();
  };
  render() {
    let otherNotes = 0;
    let pinCount = 0;
    let label = this.state.labelNotes.map((allnote) => {
      otherNotes++;
      return (
        <AllNotes key={allnote.id} allNotes={allnote} getNote={this.getNote} />
      );
    });
    let allObj = this.state.allNotes.map((allnote) => {
      if (
        allnote.isArchived === false &&
        allnote.isDeleted === false &&
        allnote.isPined === false
      ) {
        otherNotes++;
        return (
          <AllNotes
            key={allnote.id}
            //listGrid={this.state.listGrid}
            allNotes={allnote}
            getNote={this.getNote}
          />
        );
      }
      return null;
    });

    let arcObj = this.state.allNotes.map((allnote) => {
      if (allnote.isDeleted === false && allnote.isArchived === true) {
        return (
          <AllNotes
            key={allnote.id}
            allNotes={allnote}
            getNote={this.getNote}
          />
        );
      }
      return null;
    });
    let trashObj = this.state.allNotes.map((allnote) => {
      if (allnote.isDeleted === true && allnote.isArchived === false) {
        return (
          <AllNotes
            key={allnote.id}
            allNotes={allnote}
            getNote={this.getNote}
          />
        );
      }
      return null;
    });
    return (
      <MuiThemeProvider theme={theme}>
        <div onScroll={this.handleScroll}>
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
                  <Tooltip title="logout">
                    <IconButton onClick={this.handleLogout}>
                      <People />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </Toolbar>
          </AppBar>

          <div className={this.state.open ? "moveMargin" : "moveMargin2"}>
            <div className="displayNotes">
              <React.Fragment>
                {this.state.headerName === "" ? (
                  <div>
                    {pinCount > 0 ? (
                      <React.Fragment>
                        <span>Pinned:{pinCount}</span>
                      </React.Fragment>
                    ) : null}

                    {pinCount > 0 ? <span>Others:{otherNotes}</span> : null}
                    <Notes getNotes={this.getNote} />
                    <div className="allNotes_position">{allObj}</div>
                  </div>
                ) : this.state.headerName === "Archive" ? (
                  <div className="allNotes_position">{arcObj}</div>
                ) : this.state.headerName === "Edit Labels" ? (
                  <div className="allNotes_position">{label}</div>
                ) : this.state.headerName === "Trash" ? (
                  <div className="allNotes_position">{trashObj}</div>
                ) : null}
              </React.Fragment>
            </div>
          </div>

          <SideMenu
            label={this.state.labelNotes}
            sideOpen={this.state.open}
            change={this.nameChange}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
