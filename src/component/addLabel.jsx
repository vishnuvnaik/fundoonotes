import React, { Component } from "react";
import Popover from "@material-ui/core/Popover";
import noteServices from "../services/noteServices";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { MenuItem, Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import InputBase from "@material-ui/core/InputBase";
import "./CSS/dashboard.css";

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
        this.state.labelIdListChange();
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
      console.log(index, labelId);
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
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
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
                // return (
                //   <div className="lablelistSelect">
                //     <Checkbox
                //       label={labelList.label}
                //       size="small"
                //       checked={this.state.activeCheckboxes.includes(labelList.id)}
                //       onChange={(e) => this.handleChange(ele.label, ele.id)}
                //       color="primary"
                //       inputProps={{ "aria-label": "secondary checkbox" }}
                //     />
                //     <div>{ele.label}</div>
                //   </div>
                // );
              })}
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}

// console.log(this.state.labelList[0].id);
// console.log(label.id);

// let labelPresent;
// let updatedLabel;
// let response = !this.state.noteLabelList.find((el) =>
//   label.id === el.id ? true : false
// )
// let responce =
//   this.state.noteLabelList.length === 0
//     ? this.setState({
//         noteLabelList: {
//           ...this.state.noteLabelList,
//           label,
//         },
//       })
//     : ((updatedLabel = this.state.noteLabelList.filter((el) =>
//         label.id !== el.id ? el : null
//       )),
//       this.setState({
//         noteLabelList: updatedLabel,
//       }));
// constructor(props) {

//   super(props);
//   this.state = {
//     anchorEl: null,
//     open: false,
//     noteLabelList: this.props.labelIdList,
//     checked: false,
//     labelList: [],
//     labelIdListChange: this.props.labelIdListChange,
//     noteData: this.props.allNote,
//     instanceLabel: "",
//     addNoteLabelTemporary: this.props.addNoteLabelTemporary,
//   };
// }
// getLables = async () => {
//   await noteServices
//     .getNoteLabel()
//     .then((response) =>
//       this.setState({ labelList: response.data.data.details })
//     );
// };
// handleClick = (event) => {
//   this.getLables();
//   this.setState({
//     anchorEl: event.currentTarget,
//     open: !this.state.open,
//   });
// };
// handleChange = (label, id) => {
//   let filter = [];
//   let flag = false;
//   let indexMain;
//   if (this.state.noteLabelList.length > 0) {
//     this.state.noteLabelList.filter((e, index) => {
//       if (e.id !== id) {
//         return e;
//       } else {
//         indexMain = index;
//         flag = true;
//       }
//     });
//     if (flag) {
//       this.state.noteLabelList.splice(indexMain, 1);
//     } else {
//       this.state.noteLabelList.push({ label: label, id: id });
//     }
//   } else {
//     this.state.noteLabelList.push({ label: label, id: id });
//   }

//   this.setState({ noteLabelList: this.state.noteLabelList });
//   this.setState({ noteLabelList: this.state.noteLabelList });
//   this.state.labelIdListChange();
// };
// addLabelNote = (label, id) => {
//   this.state.addNoteLabelTemporary(label, id);
//   addNoteLabel(id, this.state.noteData.id).then((response) => {});
// };
// onChangeInstanceLabel = (e) => {
//   this.setState({ instanceLabel: e.target.value });
// };
// addInstanceLabel = () => {
//   if (this.state.instanceLabel) {
//     noteServices.addNoteLabel(this.state.instanceLabel).then((response) => {
//       this.addLabelNote(response.data.label, response.data.id);
//       this.setState({ instanceLabel: "" });
//       this.state.noteRefresh();
//     });
//   }
// };
