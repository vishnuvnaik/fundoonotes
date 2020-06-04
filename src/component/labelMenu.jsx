import React, { Component } from "react";
import { Button } from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import AddIcon from "@material-ui/icons/Add";
import DialogTitle from "@material-ui/core/DialogTitle";
import noteServices from "../services/noteServices";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import InputBase from "@material-ui/core/InputBase";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import "./CSS/dashboard.css";
class LabelMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      labels: [],
      enterLable: "",
    };
    this.getLabels();
  }

  handleClickOpen = () => {
    this.setState({ open: !this.state.open });
  };
  onChangeLable = (e, index) => {
    this.state.labels[index].label = e.target.value;
    this.setState({ labels: this.state.labels });
  };
  editNotelabel = (labelId, index) => {
    let editdata = { label: this.state.labels[index].label };
    noteServices.updateNoteLabel(labelId, editdata);
    this.getLabels();
  };
  addLabel = () => {
    let userId = JSON.parse(localStorage.getItem("userDetails")).userId;
    noteServices.addNoteLabel(this.state.enterLable);
    this.setState({ enterLable: "" });
    this.getLabels();
    this.getLabels();
  };
  getLabels = async () => {
    await noteServices
      .getNoteLabel()
      .then((response) =>
        this.setState({ labels: response.data.data.details })
      );
  };
  deleteLabel = (labelId) => {
    noteServices.deleteNotelabel(labelId);
    this.getLabels();
    this.getLabels();
  };
  render() {
    return (
      <div className="labelContainer">
        <div className="labelHeader">
          <div>Labels</div>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={this.handleClickOpen}
          >
            Edit
          </Button>
        </div>
        <div className="labelList">
          {this.state.labels.map((ele) => {
            return (
              <div className="label">
                <LabelIcon />
                {ele.label}
              </div>
            );
          })}
        </div>
        <Dialog
          id="simple-dialog-label"
          onClose={this.handleClickOpen}
          aria-labelledby="simple-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="dialogBoxtitleLabel">Edit Labels</DialogTitle>
          <List>
            <div className="addLabelHead">
              <AddIcon />
              <InputBase
                placeholder="enter label..."
                value={this.state.enterLable}
                onChange={(e) => {
                  this.setState({ enterLable: e.target.value });
                }}
                inputProps={{ "aria-label": "naked" }}
              />
              <IconButton size="small" onClick={this.addLabel}>
                <CheckCircleIcon fontSize="small" />
              </IconButton>
            </div>
            {this.state.labels.map((ele, index) => {
              return (
                <div className="editLabellist">
                  <LabelIcon />
                  <InputBase
                    value={ele.label}
                    onChange={(e) => this.onChangeLable(e, index)}
                    inputProps={{ "aria-label": "naked" }}
                  />
                  <IconButton
                    onClick={(e) => this.editNotelabel(ele.id, index)}
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => this.deleteLabel(ele.id)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </div>
              );
            })}
            <div className="editLabelFooter">
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClickOpen}
              >
                Done
              </Button>
            </div>
          </List>
        </Dialog>
      </div>
    );
  }
}
export default LabelMenu;
