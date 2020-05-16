import React, { Component } from "react";
import { Card, InputBase, IconButton, Tooltip } from "@material-ui/core";
import ShowCards from "./showCards";
import CheckBox from "@material-ui/icons/CheckBox";
import Brush from "@material-ui/icons/Brush";
import Image from "@material-ui/icons/Image";
import "./CSS/dashboard.css";
class Notes extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.openCard = this.openCard.bind(this);
  }

  async openCard() {
    await this.setState({ open: !this.state.open });
    console.log("In open card");
    console.log(this.state.open);
  }
  render() {
    return !this.state.open ? (
      <div className="show">
        <Card className="notesCard">
          <InputBase
            className="takeNote"
            style={{ marginTop: "0px", marginLeft: "1em", fontWeight: "bold" }}
            placeholder="Take a note..."
            onClick={(event) => this.openCard()}
          ></InputBase>
          <div>
            <Tooltip title="New List">
              <IconButton>
                <CheckBox />
              </IconButton>
            </Tooltip>
            <Tooltip title="Note with drawing">
              <IconButton>
                <Brush />
              </IconButton>
            </Tooltip>
            <Tooltip title="Note with image">
              <IconButton>
                <Image />
              </IconButton>
            </Tooltip>
          </div>
        </Card>
      </div>
    ) : (
      <div className="show">
        <ShowCards changeCard={this.openCard} />
      </div>
    );
  }
}
export default Notes;
