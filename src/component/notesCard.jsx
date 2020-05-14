import React, { Component } from "react";
import { Card, InputBase, IconButton } from "@material-ui/core";
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
            style={{ marginTop: "0px" }}
            onClick={(event) => this.openCard()}
            placeholder="Take a notes..."
          ></InputBase>
          <div>
            <IconButton>
              <CheckBox />
            </IconButton>
            <IconButton>
              <Brush />
            </IconButton>
            <IconButton>
              <Image />
            </IconButton>
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
