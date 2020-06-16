import React, { Component } from "react";
import {
  WbIncandescent,
  NotificationsNone,
  Archive,
  DeleteSweep,
  LabelOutlined,
} from "@material-ui/icons";
import "./CSS/dashboard.css";
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
            <LabelOutlined
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
              >
                <div>
                  <IconButton>
                    <WbIncandescent />
                  </IconButton>
                </div>
                <div className="sidefont">Notes</div>
              </MenuItem>
            </div>

            <div
              onClick={() => {
                this.props.change("Remainder");
              }}
            >
              <MenuItem>
                <div>
                  <IconButton>
                    <NotificationsNone />
                  </IconButton>
                </div>
                <div className="sidefont">Reminders</div>
              </MenuItem>
              <Divider></Divider>
            </div>
            <div className="sidefont">
              <LabelMenu />
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
                    <Archive />
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
                    <DeleteSweep />
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
