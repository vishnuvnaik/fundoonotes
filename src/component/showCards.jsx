import React, { Component } from "react";
import {
  Card,
  InputBase,
  IconButton,
  Toolbar,
  Button,
} from "@material-ui/core";
import FiberPin from "@material-ui/icons/FiberPin";
import "./CSS/dashboard.css";
class ShowCards extends Component {
  constructor() {
    super();
    this.state = {
      nextLine: true,
      title: "",
      description: "",
      openCard: false,
      reminder: "",
      collaborator: "",
      color: "",
      image: "",
      archive: false,
      pin: false,
      trash: false,
      label: [],
    };
    // this.handleLabel = this.handleLabel.bind(this);
    // this.handleReminder = this.handleReminder.bind(this);
  }
  handleLabel(val) {
    console.log("value===", val);

    this.setState({
      label: val,
    });
  }
  handleClose = () => {
    this.setState({
      openCard: false,
    });
  };
  handleLabel(val) {
    console.log("value===", val);

    this.setState({
      label: val,
    });
  }

  addNotes() {
    this.setState({
      title: "",
      description: "",
    });
    if (this.state.title !== "" && this.state.description !== "") {
      console.log("something typed");
    } else {
      console.log("empty position");
      this.setState({
        openCard: false,
      });
    }
  }

  render() {
    return (
      <Card className="cardlist">
        <div className="titleAndPin">
          <div>
            <InputBase
              className="titleNote"
              placeholder="Title"
              onChange={(event) => this.setState({ title: event.target.value })}
            ></InputBase>
          </div>
          <div>
            <IconButton
              onClick={(event) =>
                this.isPinned(event, this.props.show, this.props.index)
              }
            >
              <FiberPin />
            </IconButton>
          </div>
        </div>
        <div className="inp">
          <InputBase
            className="in"
            type={File}
            onChange={(event) =>
              this.setState({ description: event.target.value })
            }
            placeholder="Take a note..."
            multiline={this.state.nextLine}
          ></InputBase>
        </div>

        <div className="toolbarAndClose">
          <Toolbar className="CardToolbar">
            <div></div>
          </Toolbar>
          <div className="closeButton">
            <Button
              form="styled_component"
              variant="contained"
              color="offwhite "
              onClick={(event) => this.addNotes(event)}
            >
              Close
            </Button>
          </div>
        </div>
      </Card>
    );
  }
}
export default ShowCards;
