import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Divider, Typography, List } from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import reply_black from "../assets/reply_black.png";
import thumb_up from "../assets/thumb_up.png";
import thumb_down from "../assets/thumb_down.png";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import noteServices from "../services/noteServices";
import "../CSS/qanda.css";

export default class QueAndAns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      editorState: EditorState.createEmpty(),
      question: null,
      questionMsg: "",
      chatTime: "",
      reply: false,
      parentId: "",
      like: "",
      replyList: [],
      data: [],
      profileImage: "",
      email: "",
      firstName: "",
      showQust: null,
      profileImage: localStorage.getItem("userProfileImage"),
      questionAndAnswerNotes: [],
      message: "",
      qustId: "",
      count: 0,
    };
  }

  componentDidMount = () => {
    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstName");
    this.setState({
      email: email,
      firstName: firstName,
    });
    noteServices.getNotesDetail(this.props.noteData.id).then((response) => {
      if (response.status === 200) {
        this.setState({
          data: response.data.data.data[0],
          questionAndAnswerNotes:
            response.data.data.data[0].questionAndAnswerNotes,
        });
        if (this.state.data.questionAndAnswerNotes.length > 0) {
          this.setState({
            question: false,
            questionMsg: response.data.data.data[0].questionAndAnswerNotes[0].message.replace(
              /<[^>]*>/g,
              ""
            ),
          });
        } else {
          this.setState({ question: true });
        }
      }
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  };
  onEditorStateChangeRep = (editorState) => {
    this.setState({ editorState });
  };
  onClickQueAns = () => {
    noteServices
      .askQuestion(
        this.state.editorState.getCurrentContent().getPlainText("\u0001"),
        this.props.noteData.id
      )
      .then((res) => {
        this.setState({ questionMsg: res.data.data.details.message });
        this.setState({ parentId: res.data.data.details.id });
        this.setState({
          chatTime: new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(new Date(res.data.data.details.createdDate)),
        });
        this.setState({ question: false });
        this.setState({ editorState: "" });
      });
  };
  dislikeButton = (id) => {
    this.setState({ like: false });
    let data = {
      like: this.state.like,
    };
    noteServices.likeQuestion(data, id).then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.setState({ count: response.data.data.details.count });
        this.componentDidMount();
      }
    });
  };
  replyButton = (id) => {
    this.setState({ reply: true, qustId: id });
  };
  replyBack = () => {
    let data = {
      message: this.state.editorState
        .getCurrentContent()
        .getPlainText("\u0001"),
    };

    noteServices
      .replyQuestion(data, this.props.noteData.id)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            reply: false,
            message: response.data.data.details.message,
            editorState: "",
          });
          this.componentDidMount();
        }
      });
  };

  likeButton = (id) => {
    this.setState({ like: true });
    let data = {
      like: this.state.like,
    };
    console.log(id, data);

    const form_data = new FormData();
    form_data.append("like", this.state.like);
    noteServices.likeQuestion(data, id).then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.setState({ count: response.data.data.details.count });
        this.componentDidMount();
      }
    });
  };

  message = (message) => {
    var content = message.replace(/<[^>]*>/g, "");
    return content;
  };
  closeReply = () => {
    this.setState({ reply: false });
  };

  render() {
    return (
      <div>
        <div className="queandanstitle">
          <div className="queandadialog">
            <List>
              <Typography style={{ fontWeight: "bold" }}>
                {this.state.data.title}
              </Typography>
              <Typography>{this.state.data.description}</Typography>
            </List>
          </div>
        </div>
        {this.state.question ? null : (
          <div>
            <div
              className="closebutton"
              onClick={() => this.props.containerRendering("", "")}
            >
              Close
            </div>
            <div className="queandadisplay">
              <div style={{ width: "80%" }}>
                <Divider />
                <List>
                  <Typography style={{ fontWeight: "bold" }}>
                    Question Asked
                  </Typography>
                  <Typography>{this.state.questionMsg}</Typography>
                </List>
                <Divider />
              </div>
            </div>
          </div>
        )}

        {this.state.question ? (
          <div>
            <div className="asked">
              Ask A Question
              <div
                className="closebutton1"
                onClick={() => this.props.containerRendering("", "")}
              >
                Close
              </div>
            </div>
            <div className="quePresent">
              <div className="quePresent1">
                <Editor
                  placeholder="Enter the Question"
                  editorState={this.state.editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={this.onEditorStateChange}
                />
              </div>
            </div>
            <div className="askButton">
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.onClickQueAns()}
              >
                Ask
              </Button>
            </div>
          </div>
        ) : this.state.reply ? (
          <div>
            <div className="repPresent">
              <div className="repPresent1">
                <Editor
                  placeholder="Enter the Reply"
                  editorState={this.state.editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={this.onEditorStateChange}
                />
              </div>
            </div>
            <div className="repButton" onClick={() => this.closeReply()}>
              Close
            </div>
            <div className="repButton" onClick={() => this.replyBack()}>
              Reply
            </div>
          </div>
        ) : (
          <div>
            {this.state.questionAndAnswerNotes.map((qustans, index) => {
              if (qustans.isApproved === true)
                return (
                  <div className="displayRep">
                    <div className="displayRepInner">
                      <label htmlFor="file-input" className="fileLabel">
                        <img
                          src={
                            this.state.profileImageFromRes == ""
                              ? null
                              : "http://fundoonotes.incubation.bridgelabz.com/" +
                                this.state.profileImage
                          }
                          className="picStyle"
                        />
                      </label>

                      <div className="nameandqueDisplay">
                        <Typography>
                          {this.state.data.user.firstName}{" "}
                          {this.state.data.user.lastName}
                        </Typography>
                        <Typography>{this.message(qustans.message)}</Typography>

                        <Typography></Typography>
                      </div>
                      <div className="namelikerow">
                        <div>
                          <h5>
                            {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }).format(new Date(qustans.createdDate))}
                          </h5>
                        </div>
                        <div className="replyButt">
                          <img
                            src={reply_black}
                            onClick={() =>
                              this.replyButton(
                                this.state.questionAndAnswerNotes[index].id
                              )
                            }
                            style={{ width: "20px", height: "20px" }}
                          />
                        </div>

                        {qustans.like.length > 0 &&
                        qustans.like[0].like === true ? (
                          <div className="likerow">
                            <div className="likeRow1">
                              <img
                                src={thumb_up}
                                onClick={() =>
                                  this.dislikeButton(
                                    this.state.questionAndAnswerNotes[index].id
                                  )
                                }
                                className="dislike"
                              />
                            </div>
                            <div className="dislike1">
                              <div>1 Like</div>
                            </div>
                          </div>
                        ) : (
                          <div className="likeBut">
                            <div className="likeBut2">
                              <img
                                src={thumb_down}
                                onClick={() =>
                                  this.likeButton(
                                    this.state.questionAndAnswerNotes[index].id
                                  )
                                }
                                className="likeBut3"
                              />
                            </div>
                            <div className="likeButEnd">
                              <div>0 Likes</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>
        )}
      </div>
    );
  }
}
