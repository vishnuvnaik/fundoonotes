import React, { Component } from "react";
import search from "../assets/search.svg";
import tickon from "../assets/tickon.svg";
import tickoff from "../assets/tickoff.svg";
import plus from "../assets/plus.svg";
import { Popover } from "@material-ui/core";
import noteServices from "../services/noteServices";
import "./CSS/dashboard.css";
class LabelMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      noteLabelList: this.props.labelIdList,
      checked: false,
      labelList: [],
      labelIdListChange: props.labelIdListChange,
      instanceLabel: "",
    };
  }
  handleClick = () => {
    this.props.changeLabel(this.state.labelName);
  };
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
  addInstanceLabel = () => {
    if (this.state.instanceLabel) {
      noteServices.noteLabel(this.state.instanceLabel).then((response) => {
        this.state.noteLabelList.push({
          label: response.data.label,
          id: response.data.id,
        });
        this.setState({ noteLabelList: this.state.noteLabelList });
        this.setState({ instanceLabel: "" });
        this.state.labelIdListChange();
      });
    }
  };
  handleChange = (label, id) => {
    let flag = false;
    let indexMain;
    if (this.state.noteLabelList.length > 0) {
      this.state.noteLabelList.filter((e, index) => {
        if (e.id !== id) {
          return e;
        } else {
          indexMain = index;
          flag = true;
        }
      });
      if (flag) {
        this.state.noteLabelList.splice(indexMain, 1);
      } else {
        this.state.noteLabelList.push({ label: label, id: id });
      }
    } else {
      this.state.noteLabelList.push({ label: label, id: id });
    }

    this.setState({ noteLabelList: this.state.noteLabelList });
    this.setState({ noteLabelList: this.state.noteLabelList });
    this.state.labelIdListChange();
  };
  render() {
    return (
      <Popover
        open={true}
        onClose={this.props.labelClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={this.props.anchor}
      >
        <div className="label_conTop">
          <div>
            <span>Label note</span>
          </div>
          <div className="label_search">
            <input
              type="text"
              autoFocus
              value={this.state.labelName}
              onChange={(event) => {
                this.setState({
                  labelName: event.target.value,
                });
              }}
              placeholder="Enter label name"
            />
            <img src={search} alt="l" />
          </div>
        </div>
        <div className="label_conBot">
          <div className="label_contents">
            <img src={tickoff} alt="" />
            <span>hello</span>
          </div>
        </div>
        {this.state.labelName !== "" ? (
          <div onClick={this.handleClick} className="labelAdd_pos">
            <img src={plus} alt="p" />
            <span>{this.state.labelName}</span>
          </div>
        ) : null}
      </Popover>
    );
  }
}
export default LabelMenu;
