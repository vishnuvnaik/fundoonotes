import React, { Component } from "react";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Divider from "@material-ui/core/Divider";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import DialpadIcon from "@material-ui/icons/Dialpad";
import {
  AppBar,
  IconButton,
  Tooltip,
  MenuItem,
  Card,
  InputBase,
  MuiThemeProvider,
  createMuiTheme,
  Typography,
  Menu,
  Popover,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import RefreshIcon from "@material-ui/icons/Refresh";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
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
      containerRender: "",
      headerName: "",
      menuOpen: false,
      drawerOpen: false,
      menuAnchor: null,
      sideBarOpen: false,
      sidebarLeft: "0%",
      mainContainer: "80%",
      MoreMenuAnchor: null,
      MoreMenuOpen: false,
      searchNote: "",
    };
  }
  handleClick = (event) => {
    switch (event.currentTarget.id) {
      case "butone":
        this.setState({
          drawerOpen: !this.state.drawerOpen,
        });
        break;
    }
  };
  onChangeSearchNote = (e) => {
    this.setState({ searchNote: e.target.value });
  };
  handleLogout = () => {
    this.props.history.push("/login");
  };
  changeMainContainer = (event) => {
    this.state.containerRender = event.target.getAttribute("data");
    this.setState({ containerRender: this.state.containerRender });
  };
  sidebarActive = () => {
    this.setState({
      sideBarOpen: !this.state.sideBarOpen,
    });
  };
  render() {
    return (
      <div className="headerbar">
        <div className="header_left">
          <IconButton onClick={this.sidebarActive}>
            <MenuIcon />
          </IconButton>
          <div className="keepImageSpace">
            {this.state.headerName === "" ? (
              <React.Fragment>
                <img className="keep_img" src={keep} alt="F" />
                <Typography
                  id="fundoo"
                  variant="h5"
                  color="textSecondary"
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
        <div>
          <Card id="searchbar">
            <Tooltip title="search">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <InputBase
              placeholder="Search"
              value={this.state.searchNote}
              onChange={this.onChangeSearchNote}
              fullWidth
            />
          </Card>
        </div>
        <div>
          <IconButton className="searchButton2" onClick={this.searchBarHandel}>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <RefreshIcon />
          </IconButton>
          <IconButton>
            <ShoppingCartIcon />
          </IconButton>
          <IconButton className="hideIcon" onClick={this.changeNoteListView}>
            {this.state.noteListView ? <ViewModuleIcon /> : <ViewStreamIcon />}
          </IconButton>
          <div className="header_userProfile">
            <IconButton className="hideIcon">
              <DialpadIcon />
            </IconButton>
            <IconButton size="small"></IconButton>
          </div>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </div>
        <div className="dashboard_body">
          <div
            className={
              this.state.sideBarOpen ? "sidebar" : "sidebar hideSidebar"
            }
            // className="sidebar"
          >
            <div
              className="sidebar_component"
              data="createnote"
              onClick={this.changeMainContainer}
            >
              <WbIncandescentIcon />
              Notes
            </div>
            <div
              className="sidebar_component"
              data="reminder"
              onClick={this.changeMainContainer}
            >
              <NotificationsNoneIcon />
              Reminder
            </div>
            <Divider />
            <Divider />
            <div
              className="sidebar_component"
              data="archive"
              onClick={this.changeMainContainer}
            >
              <ArchiveIcon />
              Archive
            </div>
            <div
              className="sidebar_component"
              data="trash"
              onClick={this.changeMainContainer}
            >
              <DeleteSweepIcon />
              Trash
            </div>
          </div>
        </div>
      </div>
    );
  }
}
