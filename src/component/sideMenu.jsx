import React, { Component } from "react";
import settingsIcon from "@material-ui/icons/Settings";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import "./CSS/dashboard.css";
import LabelIcon from "@material-ui/icons/Label";
import LabelMenu from "./labelMenu";
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
  constructor(props) {
    super(props);
    this.state = {
      openLabel: false,
      label: this.props.label,
    };
  }
  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      label: props.label,
    });
  }

  render() {
    let label = this.state.label.map((ele) => {
      return (
        <React.Fragment key={ele.id}>
          <div
            onClick={() => {
              this.props.change(ele.label);
            }}
            className="note"
          >
            <LabelOutlinedIcon
              style={{
                marginLeft: "20px",
              }}
            />
            <span>{ele.label}</span>
          </div>
        </React.Fragment>
      );
    });
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
            <div>
              <span className="sidefont">labels</span>
            </div>
            <div className="sidefont">{label}</div>
            <div
              onClick={() => {
                this.props.change("Edit Labels");
              }}
              className="note"
            >
              <MenuItem>
                <div className="note">
                  <IconButton>
                    <CreateOutlinedIcon />
                  </IconButton>
                </div>
                <div className="sidefont">Edit Labels</div>
              </MenuItem>
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

            <div
              onClick={() => {
                this.props.change("Trash");
              }}
              className="note"
            >
              <MenuItem>
                <div>
                  <IconButton>
                    <DeleteSweepIcon />
                  </IconButton>
                </div>
                <div className="sidefont">Trash</div>
              </MenuItem>
            </div>
          </List>
        </SwipeableDrawer>
      </MuiThemeProvider>
    );
  }
}
export default SideMenu;
