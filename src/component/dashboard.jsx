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
  Avatar,
  MenuItem,
} from "@material-ui/core";
import People from "@material-ui/icons/ExitToApp";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import SearchIcon from "@material-ui/icons/Search";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import SideMenu from "./sideMenu";
import keep from "../assets/keep.png";
import Notes from "./notesCard";
import "./CSS/dashboard.css";
import noteServices from "../services/noteServices";
import AllNotes from "./allNotes";
import userServices from "../services/userServices";
import LabelMenu from "./labelMenu";
import ImageUploader from "react-images-upload";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import QueAndAns from "./qAndA";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
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
      profileImage: localStorage.getItem("userProfileImage"),
      singleNoteData: [],
      containerRender: "queAndAns",
      src: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 9,
      },
    };
  }
  componentDidMount() {
    this.getNote();
    this.getLabel();
  }
  containerRendering = (data, renderComponent) => {
    if (data) {
      this.setState({ singleNoteData: data });
    }
    this.setState({ headerName: renderComponent });
  };
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

  onChangeProfile = (crop) => {
    // event.stopPropagation();
    // event.preventDefault();
    let form_data = new FormData();
    form_data.append("file", crop);
    userServices.uploadUserProfile(form_data).then((response) => {
      this.setState({ crop: response.data.status.imageUrl });
      localStorage.setItem("userProfileImage", response.data.status.imageUrl);
    });
  };
  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };
  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }
  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }
  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  render() {
    const { croppedImageUrl } = this.state;

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
            containerRendering={this.containerRendering.bind(this)}
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
    let remObj = this.state.allNotes.map((allnote) => {
      if (allnote.isDeleted === false && allnote.reminder.length !== 0) {
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
              {this.state.headerName !== "queAndAns" ? (
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
              ) : null}

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
                    <Avatar>
                      <img
                        onClick={this.handleClickProfile}
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
                  </Tooltip>
                </div>
              </div>
            </Toolbar>
          </AppBar>

          <div className={this.state.open ? "moveMargin" : "moveMargin2"}>
            <div className="displayNotes">
              {this.state.search !== "" ? (
                <div>
                  <Notes getNotes={this.getNote} />
                  <div className="allNotes_position">{seaObj}</div>
                </div>
              ) : (
                <React.Fragment>
                  {this.state.headerName === "" ? (
                    <div>
                      <Notes getNotes={this.getNote} />
                      <div className="allNotes_position">{allObj}</div>
                    </div>
                  ) : this.state.headerName === "Archive" ? (
                    <div className="allNotes_position">{arcObj}</div>
                  ) : this.state.headerName === "queAndAns" ? (
                    <div>
                      <QueAndAns
                        noteData={this.state.singleNoteData}
                        containerRendering={this.containerRendering.bind(this)}
                      />
                    </div>
                  ) : this.state.headerName === "Remainder" ? (
                    remObj.length > 0 ? (
                      <div>
                        <Notes getNotes={this.getNote} />
                        <div className="allNotes_position">{remObj}</div>
                      </div>
                    ) : (
                      <div className="emptySidebarMsgContainer">
                        <div className="emptySidebarMsg">
                          <NotificationsNoneIcon />
                          <div>Notes with upcoming reminders appear here</div>
                        </div>
                      </div>
                    )
                  ) : this.state.headerName === "Trash" ? (
                    <div className="allNotes_position">{trashObj}</div>
                  ) : null}
                </React.Fragment>
              )}
            </div>
          </div>
          <MuiThemeProvider theme={theme1}>
            {/* <div className="userMenu">
              <Menu
                id="menu"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                anchorEl={this.state.menuAnchorEl}
                keepMounted
                open={this.state.menuOpen}
                onClose={this.handleClose}
              >
                <input
                  id="myInput"
                  type="file"
                  ref={(ref) => (this.upload = ref)}
                  style={{ display: "none" }}
                  onChange={this.onChangeProfile.bind(this)}
                />
                <MenuItem
                  onClick={() => {
                    this.upload.click();
                  }}
                >
                  Profile Pic Upload
                </MenuItem>
                <MenuItem>
                  <Typography variant="h6">
                    {JSON.parse(localStorage.getItem("userDetails")).firstName}{" "}
                    {JSON.parse(localStorage.getItem("userDetails")).lastName}
                  </Typography>
                  <Typography color="textSecondary">
                    {JSON.parse(localStorage.getItem("userDetails")).email}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
                </div> */}
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
            >
              <div className="userMenu">
                <div className="App">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={this.onSelectFile}
                    />
                  </div>
                  {this.state.src && (
                    <ReactCrop
                      src={this.state.src}
                      crop={this.state.crop}
                      ruleOfThirds
                      onImageLoaded={this.onImageLoaded}
                      onComplete={this.onCropComplete}
                      onChange={this.onCropChange}
                    />
                  )}
                  {croppedImageUrl && (
                    <img
                      alt="Crop"
                      style={{ maxWidth: "100%" }}
                      src={croppedImageUrl}
                    />
                  )}
                </div>
                {/*   <input
                  id="myInput"
                  type="file"
                  ref={(ref) => (this.upload = ref)}
                  style={{ display: "none" }}
                  onChange={this.onChangeProfile.bind(this)}
                />
                <Avatar>
                  <img
                    onClick={this.handleClickProfile}
                    src={
                      this.state.profileImage == ""
                        ? null
                        : "http://fundoonotes.incubation.bridgelabz.com/" +
                          this.state.profileImage
                    }
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "gray",
                      borderRadius: "50px",
                    }}
                  />
                </Avatar>
                <MenuItem
                  onClick={() => {
                    this.upload.click();
                  }}
                >
                  Update Profile
                </MenuItem> */}
                <Avatar>
                  <img
                    onClick={this.handleClickProfile}
                    src={
                      this.state.profileImage == ""
                        ? null
                        : "http://fundoonotes.incubation.bridgelabz.com/" +
                          this.state.profileImage
                    }
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "gray",
                      borderRadius: "50px",
                    }}
                  />
                </Avatar>
                <MenuItem>
                  <Typography color="textSecondary">
                    {JSON.parse(localStorage.getItem("userDetails")).email}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </div>
            </Popover>
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
