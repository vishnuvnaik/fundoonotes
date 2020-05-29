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
import PeopleIcon from "@material-ui/icons/AccountCircle";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import SearchIcon from "@material-ui/icons/Search";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
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
import LabelMenu from "./labelMenu";
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

const theme1 = createMuiTheme({
  overrides: {
    MuiPopover: {
      paper: {
        width: "20%",
        height: "30%",
      },
    },
  },
});
export default class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      archive: false,
      reminder: false,
      trash: false,
      search: "",
      labelIdList: [],
      Pinned: false,
      headerName: "",
      allNotes: [],
      labelNotes: [],
      listGrid: false,
      menuOpen: false,
      menuAnchorEl: null,
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
  handleClickProfile = (event) => {
    this.setState({
      menuOpen: true,
      menuAnchorEl: event.currentTarget,
    });
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

  labelIdListChange = () => {
    this.setState({ labelIdList: this.state.labelIdList });
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
  clearSearch = () => {
    this.setState({
      search: "",
    });
  };
  handleChangeSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
  };
  handleScroll = (event) => {
    event.preventDefault();
  };
  handleClickListGrid = (event) => {
    this.setState({
      listGrid: !this.state.listGrid,
    });
  };
  handleClose = () => {
    this.setState({
      menuOpen: false,
    });
  };
  render() {
    let otherNotes = 0;
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
            listGrid={this.state.listGrid}
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
            listGrid={this.state.listGrid}
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
            listGrid={this.state.listGrid}
            allNotes={allnote}
            getNote={this.getNote}
          />
        );
      }
      return null;
    });
    let seaObj = this.state.allNotes.map((allnote) => {
      if (
        allnote.title
          .toLocaleLowerCase()
          .startsWith(this.state.search.toLocaleLowerCase()) ||
        allnote.description
          .toLocaleLowerCase()
          .startsWith(this.state.search.toLocaleLowerCase())
      ) {
        return (
          <AllNotes
            key={allnote.id}
            listGrid={this.state.listGrid}
            allNotes={allnote}
            getNote={this.getNote}
          />
        );
      }
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

              <Card id="appBar_card">
                <Tooltip title="Search" arrow>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
                <InputBase
                  placeholder="Search"
                  value={this.state.search}
                  onChange={this.handleChangeSearch}
                  fullWidth
                />
                <Tooltip title="Clear search" arrow>
                  <IconButton onClick={this.clearSearch}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Card>

              <div className="appicons">
                <div>
                  <Tooltip
                    title={this.state.listGrid ? "List view" : "Grid view"}
                    arrow
                  >
                    <IconButton onClick={this.handleClickListGrid}>
                      {this.state.listGrid ? (
                        <ViewListIcon id="reduceButSize" />
                      ) : (
                        <ViewCompactIcon id="reduceButSize" />
                      )}
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
                <div>
                  <Tooltip
                    title={
                      <div>
                        <Typography>Fundoo Account</Typography>
                        <Typography>
                          {
                            JSON.parse(localStorage.getItem("userDetails"))
                              .firstName
                          }
                        </Typography>
                        <Typography>
                          {
                            JSON.parse(localStorage.getItem("userDetails"))
                              .email
                          }
                        </Typography>
                      </div>
                    }
                    arrow
                  >
                    <IconButton onClick={this.handleClickProfile}>
                      <PeopleIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </Toolbar>
          </AppBar>

          <div className={this.state.open ? "moveMargin" : "moveMargin2"}>
            <div className="displayNotes">
              {this.state.search !== "" ? (
                <div className="allNotes_position">{seaObj}</div>
              ) : (
                <React.Fragment>
                  {this.state.headerName === "" ? (
                    <div>
                      <Notes getNotes={this.getNote} />
                      <div className="allNotes_position">{allObj}</div>
                    </div>
                  ) : this.state.headerName === "Archive" ? (
                    <div className="allNotes_position">{arcObj}</div>
                  ) : this.state.headerName === "Trash" ? (
                    <div className="allNotes_position">{trashObj}</div>
                  ) : null}
                </React.Fragment>
              )}
            </div>
          </div>
          <MuiThemeProvider theme={theme1}>
            <Popover
              id="menu"
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              anchorEl={this.state.menuAnchorEl}
              open={this.state.menuOpen}
            ></Popover>
          </MuiThemeProvider>
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
