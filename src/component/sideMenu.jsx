import React, { Component } from "react";
import settingsIcon from "@material-ui/icons/Settings";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import "./CSS/dashboard.css";
import {
  SwipeableDrawer,
  List,
  createMuiTheme,
  MuiThemeProvider,
  MenuItem,
  IconButton,
  Divider,
} from "@material-ui/core";

const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorLeft: {
        left: 0,
        top: "65px",
        right: "auto",
      },
    },
  },
});

class SideMenu extends Component {
  constructor() {
    super();
    this.state = {
      notes: false,
      reminder: false,
      editLabel: false,
      archive: false,
      trash: false,
      open: false,
    };
  }
  openNotes() {
    this.setState({
      notes: true,
      reminder: false,
      editLabel: false,
      archive: false,
      trash: false,
      Pinned: true,
    });
    console.log("notes", this.state.notes);
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <SwipeableDrawer
          className="list"
          anchor="left"
          variant="persistent"
          open={this.props.sideOpen}
        >
          <List className="list">
            <div className="note">
              <MenuItem
                onClick={() => {
                  this.props.change("");
                }}
                // onClick={(event) => this.openNotes(event)}
              >
                <div>
                  <IconButton>
                    <WbIncandescentIcon />
                  </IconButton>
                </div>
                <div className="sidefont">Notes</div>
              </MenuItem>
            </div>

            <div>
              <MenuItem>
                <div>
                  <IconButton>
                    <NotificationsNoneIcon />
                  </IconButton>
                </div>
                <div className="sidefont">Reminders</div>
              </MenuItem>

              <Divider></Divider>
            </div>
            <Divider></Divider>

            <div
              onClick={() => {
                this.props.change("Archive");
              }}
              className="note"
            >
              <MenuItem>
                <div>
                  <IconButton>
                    <ArchiveIcon />
                  </IconButton>
                </div>
                <div className="sidefont">Archive</div>
              </MenuItem>
            </div>
            <MenuItem>
              <div>
                <IconButton>
                  <DeleteSweepIcon />
                </IconButton>
              </div>
              <div className="sidefont">Trash</div>
            </MenuItem>
          </List>
        </SwipeableDrawer>
      </MuiThemeProvider>
    );
  }
}
export default SideMenu;
