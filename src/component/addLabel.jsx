import React, { Component } from "react";
import Popover from "@material-ui/core/Popover";
import noteServices from "../services/noteServices";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { MenuItem, Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import InputBase from "@material-ui/core/InputBase";
import "../CSS/addLabel.css";

export default class AddLabelNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      noteLabelList: [],
      addlabel: false,
      checked: false,
      labelList: [],
      labelIdListChange: props.labelIdListChange,
      instanceLabel: "",
      setChecked: true,
      labelNotes: [],
      activeCheckboxes: [],
      id: this.props.noteIdList,
    };
    this.handleCheck = this.handleCheck.bind(this);
  }
  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      noteLabelList: props.labelIdList,
    });
  }
  getLabels = async () => {
    await noteServices
      .getNoteLabel()
      .then((response) =>
        this.setState({ labelList: response.data.data.details })
      );
  };
  handleClick = (event) => {
    this.getLabels();
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open,
    });
  };

  onChangeInstanceLabel = (e) => {
    this.setState({ instanceLabel: e.target.value });
  };
  addInstanceLabel = () => {
    if (this.state.instanceLabel) {
      noteServices.addNoteLabel(this.state.instanceLabel).then((response) => {
        this.state.noteLabelList.push({
          label: response.data.label,
          id: response.data.id,
        });
        this.setState({ noteLabelList: this.state.noteLabelList });
        this.setState({ instanceLabel: "" });
        //this.setState({ labelIdListChange: this.state.labelIdListChange });
      });
    }
  };
  handleCheck = (labelList, labelId) => {
    let found = this.state.activeCheckboxes.includes(labelId);
    if (found) {
      this.setState({
        activeCheckboxes: this.state.activeCheckboxes.filter(
          (x) => x !== labelId
        ),
      });
      const index = this.state.labelNotes.findIndex(
        (labelNotes) => labelNotes.id === labelId
      );

      if (index > -1) {
        this.state.labelNotes.splice(index, 1);
      }
      this.setState({ labelNotes: this.state.labelNotes });
      this.props.labelNotes(this.state.labelNotes);
    } else {
      this.setState({
        activeCheckboxes: [...this.state.activeCheckboxes, labelId],
      });
      this.state.labelNotes.push(labelList);
      this.props.labelNotes(this.state.labelNotes);
    }
  };
  render() {
    return (
      <div>
        <MenuItem variant="contained" color="grey" onClick={this.handleClick}>
          Add Label
        </MenuItem>
        <Popover
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "bottom",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "bottom",
          }}
          open={this.state.open}
          keepMounted
          anchorEl={this.state.anchorEl}
          onClose={this.handleClick}
        >
          <li className="reminderHeading">Label Note</li>
          <div className="lableAddInstanceHeading">
            <InputBase
              placeholder="enter label"
              value={this.state.instanceLabel}
              onChange={this.onChangeInstanceLabel}
            />
            <Button size="small" onClick={this.addInstanceLabel}>
              Add
            </Button>
          </div>
          <div>
            <div>
              {this.state.labelList.map((labelList, index) => {
                return (
                  <List>
                    <div className="lablelistSelect">
                      <Checkbox
                        label={labelList.label}
                        inputProps={{
                          "aria-label": "checkbox with default color",
                        }}
                        onChange={() =>
                          this.handleCheck(labelList, labelList.id)
                        }
                        checked={this.state.activeCheckboxes.includes(
                          labelList.id
                        )}
                      />
                      <Typography
                        style={{ width: "100%" }}
                        onClick={() => this.checkboxoutline(labelList)}
                      >
                        {labelList.label}
                      </Typography>
                    </div>
                  </List>
                );
              })}
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}
