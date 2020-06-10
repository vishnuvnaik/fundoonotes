import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Divider, Typography, IconButton, Tooltip } from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import UndoIcon from "@material-ui/icons/Undo";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import noteServices from "../services/noteServices";
import "./CSS/dashboard.css";

export default class QueAndAns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      editorState: EditorState.createEmpty(),
      question: false,
      questionMsg: "",
      chatTime: "",
      reply: false,
      parentId: "",
      like: "",
      replyList: [],
    };
  }
  componentWillMount = () => {
    this.clickShowMsgHideEditor();
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
        this.setState({ question: true });
        this.setState({ editorState: "" });
      });
  };
  clickShowMsgHideEditor = () => {
    if (this.props.noteData.questionAndAnswerNotes.length > 0) {
      this.setState({
        chatTime: new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(
          new Date(this.props.noteData.questionAndAnswerNotes[0].createdDate)
        ),
      });
      this.setState({
        questionMsg: this.props.noteData.questionAndAnswerNotes[0].message,
      });
      this.setState({
        parentId: this.props.noteData.questionAndAnswerNotes[0].id,
      });

      this.setState({ replyList: this.props.noteData.questionAndAnswerNotes });
      this.setState({ question: true });
    }
  };
  replyOfAnswer = () => {
    noteServices
      .replyQuestion(
        this.state.editorState.getCurrentContent().getPlainText("\u0001"),
        this.state.parentId
      )
      .then((res) => {
        this.state.replyList.push(res.data.data.details);
        this.setState({ replyList: this.state.replyList });
        this.setState({ editorState: EditorState.createEmpty() });
      });
    this.setState({ reply: !this.state.reply });
  };
  likeQuestion = () => {
    noteServices
      .likeQuestion(!this.state.like, this.state.parentId)
      .then((res) => {
        this.setState({ like: !this.state.like });
      });
  };
  likeReply(likeDt, replyId) {
    noteServices.likeQuestion(likeDt, replyId).then((res) => {
      let replyFilList = this.state.replyList.map((reply) => {
        if (reply.id === replyId) {
          if (reply.like.length) {
            let dt = Object.assign({}, reply, {
              like: [{ userId: reply.id, like: likeDt }],
            });
            return dt;
          } else {
            let dt = Object.assign({}, reply, {
              like: [{ userId: replyId, like: likeDt }],
            });
            return dt;
          }
        } else {
          return reply;
        }
      });
      this.setState({ replyList: replyFilList });
    });
  }

  render() {
    return (
      <div>
        <div className="queAnsDialog">
          <div className="queAndAnsNoteData">
            <div className="queAnsTitle fontWeight-600">
              <div>{this.props.noteData.title}</div>
              {/* <div>
                <Button onClick={(e) => this.props.containerRendering("", "")}>
                  Close
                </Button>
              </div> */}
            </div>
            <div className="fontWeight-600">
              {this.props.noteData.description}
            </div>
          </div>
          <div className={this.state.question ? "hide" : "noteQuesion"}>
            <div className="closeButton">
              <Button onClick={(e) => this.props.containerRendering("", "")}>
                Close
              </Button>
            </div>
            <div style={{ fontWeight: "bold" }}>Ask a Question</div>
            <Editor
              editorState={this.state.editorState}
              placeholder="enter question"
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
            />
            <div id="askBtn">
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => this.onClickQueAns()}
              >
                Ask
              </Button>
            </div>
          </div>
        </div>
        <div className="queAnsDialog">
          <Divider />
          <div className={this.state.question ? "showNew margin-20px" : "hide"}>
            <div style={{ fontWeight: "bold " }}>Question Asked</div>
            <div className="closeButton">
              <Button onClick={(e) => this.props.containerRendering("", "")}>
                Close
              </Button>
            </div>
            <div className="queAnsHeader">
              <div>
                <h5>{this.state.chatTime}</h5>
              </div>
              <div className="ratingRight">
                <IconButton
                  onClick={(e) => this.setState({ reply: !this.state.reply })}
                >
                  <UndoIcon />
                </IconButton>
                <Tooltip title="Like">
                  <IconButton onClick={this.likeQuestion}>
                    {this.state.like ? (
                      <ThumbUpAltIcon color="primary" />
                    ) : (
                      <ThumbUpAltIcon />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Unlike">
                  <IconButton onClick={this.likeQuestion}>
                    {this.state.like ? (
                      <ThumbDownAltIcon />
                    ) : (
                      <ThumbDownAltIcon color="primary" />
                    )}
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className="questionList">
              <Typography variant="h5">{this.state.questionMsg}</Typography>
            </div>
          </div>
          {this.state.replyList.map((reply) => {
            return (
              <div
                className={this.state.question ? "showNew margin-20px" : "hide"}
              >
                <Divider />
                <div className="replyHeader">
                  <div>
                    <h5>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }).format(new Date(reply.createdDate))}
                    </h5>
                  </div>
                  <div className="ratingRight">
                    {/* <IconButton onClick={e => this.setState({reply:!this.state.reply})}>
                    <UndoIcon />
                  </IconButton> */}
                    <Tooltip title="Like">
                      <IconButton
                        onClick={(e) =>
                          this.likeReply(
                            reply.like.length ? !reply.like[0].like : true,
                            reply.id
                          )
                        }
                      >
                        {reply.like.length ? (
                          reply.like[0].like ? (
                            <ThumbUpAltIcon color="primary" />
                          ) : (
                            <ThumbUpAltIcon />
                          )
                        ) : (
                          <ThumbUpAltIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Unlike">
                      <IconButton
                        onClick={(e) =>
                          this.likeReply(
                            reply.like.length ? !reply.like[0].like : true,
                            reply.id
                          )
                        }
                      >
                        {reply.like.length ? (
                          reply.like[0].like ? (
                            <ThumbDownAltIcon />
                          ) : (
                            <ThumbDownAltIcon color="primary" />
                          )
                        ) : (
                          <ThumbDownAltIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
                <div className="replyList">
                  <Typography variant="h5">{reply.message}</Typography>
                </div>
              </div>
            );
          })}
          <Divider />
          <div className={this.state.reply ? "showNew margin-20px" : "hide"}>
            <Editor
              editorState={this.state.editorState}
              placeholder="enter your reply"
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChangeRep}
            />
            <div id="askBtn">
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => this.replyOfAnswer()}
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
