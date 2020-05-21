import React, { Component } from "react";
import search from "../assets/search.svg";
import tickon from "../assets/tickon.svg";
import tickoff from "../assets/tickoff.svg";
import plus from "../assets/plus.svg";
import { Popover } from "@material-ui/core";
import "./CSS/dashboard.css";
class LabelMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelName: "",
    };
  }
  handleClick = () => {
    this.props.changeLabel(this.state.labelName);
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
