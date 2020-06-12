import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import userServices from "../services/userServices";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar, Tooltip } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default class Collaborator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      searchWord: "",
      listOpen: false,
      listAnchorEl: null,
      searchedList: [],
      profileImage: localStorage.getItem("userProfileImage"),
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
      <div className="arrangeCardToIcon">
        <Tooltip title="Collab" arrow>
          <IconButton onClick={this.handleClick}>
            <PersonAddIcon />
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
            <Divider />
            <CardContent>
              <div className="collaboratorOwner">
                <Avatar>
                  <img
                    onClick={this.handleClick}
                    src={
                      this.state.profileImage === ""
                        ? null
                        : "http://fundoonotes.incubation.bridgelabz.com/" +
                          this.state.profileImage
                    }
                    alt="usr"
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
                    {this.props.noteData.user.firstName +
                      " " +
                      this.props.noteData.user.lastName}
                    (Owner)
                  </Typography>
                  <Typography color="textSecondary">
                    {this.props.noteData.user.email}
                  </Typography>
                </div>
              </div>

              <div className="collaboratorListBox">
                {this.props.collaborators.map((collaber) => {
                  return (
                    <div>
                      <div className="emailIcon">
                        {collaber.firstName.charAt(0)}
                      </div>
                      <div className="collaboratorDetails">
                        <Typography>
                          {collaber.firstName + " " + collaber.lastName}
                        </Typography>
                        <Typography color="textSecondary">
                          {collaber.email}
                        </Typography>
                      </div>
                      <HighlightOffIcon
                        onClick={(e) =>
                          this.props.removeCollab(collaber.userId)
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
                      <MenuItem onClick={(e) => this.props.clickOnUser(user)}>
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
