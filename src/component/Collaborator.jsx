import React, { Component } from "react";
import {
  IconButton,
  Tooltip,
  Popover,
  Card,
  Typography,
  InputBase,
  CardActions,
  Button,
  CardContent,
  MenuItem,
  Divider,
  Avatar,
} from "@material-ui/core";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import userServices from "../services/userServices";
import "./CSS/dashboard.css";
import noteServices from "../services/noteServices";
class CollaboratorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      listOpen: false,
      listAnchorEl: null,
      profileImage: localStorage.getItem("userProfileImage"),
      searchWord: "",
      searchedList: [],
      data: [],
      collabatorName: "",
      collabatorArray: [],
      details: [],
      fullDetails: [],
      capitalInitial: "",
    };
  }

  handleClick = (e) => {
    this.setState({
      open: !this.state.open,
      anchorEl: e.currentTarget,
    });
  };

  onChangeSearch = (e) => {
    this.setState({ searchWord: e.target.value });
    userServices
      .searchUserByWord(e.target.value)
      .then((response) =>
        this.setState({ searchedList: response.data.data.details })
      );
  };
  listHandleClose = (e) => {
    userServices
      .searchUserByWord(this.state.searchWord)
      .then((response) =>
        this.setState({ searchedList: response.data.data.details })
      );
    this.setState({
      listOpen: !this.state.listOpen,
      listAnchorEl: e.currentTarget,
      searchWord: "",
    });
  };

  render() {
    return (
      <div className="collaborator">
        <Tooltip title="Collab">
          <IconButton onClick={this.handleClick}>
            <GroupAddOutlinedIcon />
          </IconButton>
        </Tooltip>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClick}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Card className="collabPop">
            <div className="collabTitle">Collaborators</div>
            <Divider></Divider>
            <CardContent>
              <div className="collaboratorOwner">
                <Avatar>
                  <img
                    onClick={this.handleClick}
                    src={
                      this.state.profileImage == ""
                        ? null
                        : "http://fundoonotes.incubation.bridgelabz.com/" +
                          this.state.profileImage
                    }
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "black",
                      borderRadius: "50px",
                    }}
                  />
                </Avatar>
                <div className="collaboratorDetails">
                  <Typography>
                    {JSON.parse(localStorage.getItem("userDetails")).firstName}
                    (Owner)
                  </Typography>
                  <Typography color="textSecondary">
                    {JSON.parse(localStorage.getItem("userDetails")).email}
                  </Typography>
                </div>
              </div>

              <div className="collaboratorListBox">
                {this.props.data.collaborators.map((callaber) => {
                  return (
                    <div>
                      <div className="emailIcon">
                        {callaber.firstName.charAt(0)}
                      </div>
                      <div className="collaboratorDetails">
                        <Typography>
                          {callaber.firstName + " " + callaber.lastName}
                        </Typography>
                        <Typography color="textSecondary">
                          {callaber.email}
                        </Typography>
                      </div>
                      <HighlightOffIcon
                        onClick={(e) =>
                          this.props.data.removeCollab(callaber.userId)
                        }
                        fontSize="small"
                      />
                    </div>
                  );
                })}
              </div>

              <IconButton>
                <PersonAddIcon />
              </IconButton>

              <InputBase
                placeholder="Search"
                value={this.state.searchWord}
                onChange={this.onChangeSearch}
                onClick={this.listHandleClose}
              />

              <Popover
                id="searchedListPopover"
                open={this.state.listOpen}
                anchorEl={this.state.listAnchorEl}
                onClose={this.listHandleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div className="collabSearchList">
                  {this.state.searchedList.map((user) => {
                    return (
                      <MenuItem
                        key={user.id}
                        onClick={(e) => this.props.data.addCollab(user)}
                      >
                        <div>{user.firstName + " " + user.lastName}</div>
                        <div>{"[" + user.email + "]"}</div>
                      </MenuItem>
                    );
                  })}
                </div>
              </Popover>
            </CardContent>
            <CardActions className="collabAction">
              <Button size="small" color="primary" onClick={this.handleClick}>
                Save
              </Button>
            </CardActions>
          </Card>
        </Popover>
      </div>
    );
  }
}

export default CollaboratorComponent;
