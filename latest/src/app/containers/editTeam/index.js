import React from "react";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import * as routes from "../../globals/endpoints";
import { toast } from "react-toastify";
import * as session from "../../../utils/session";
import { Link } from "react-router-dom";
import {
  getFetch,
  postFetch,
  postFetchMutiPart,
} from "../../../utils/fetchRequests";
import { profileLogo, kontessLogo } from "../../globals/contants";
import { confirmAlert } from "react-confirm-alert";
import TeamFiles from "./team-files";
import TeamEvents from "./team-events";
import TeamTasks from "./team-tasks";
import firebase from "../../../firebase";
import moment from "moment";
import Moment from "react-moment";
// import PDFICON from "assets/icons/pdf.png";
// import XLSXICON from "assets/icons/xlsx.png";
// import XSLCON from "assets/icons/xls.png";
// import FILEICON from "assets/icons/file.png";
import { Urlify } from "../../globals/contants";

import { animateScroll } from "react-scroll";
import {
  confirmLeaveTeam,
  confirmSendReq,
  fileMaxSize,
  errorMsgForInvitation,
  confirmLeaveTeamDelete,
  commonErrorMsg,
  only6ImgAllow,
  reqSend,
  removeMentor,
} from "../../../utils/Message";
import { async } from "q";
let database = "";

export default class Team extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.teamId;
    this.state = {
      team_name: "",
      files: [],
      track: "",
      imagePreviewUrl: "",
      description: "",
      loading: false,
      logo: "",
      logoImg: "",
      teamInfo: {},
      curruntUser: "",
      editMode: false,
      id: id,
      deletedItems: "",
      tracks: [],
      showSection: false,
      messages: [],
      curruntUserType: "",
    };
    this.formHandler = this.formHandler.bind(this);
  }

  componentWillMount = async () => {
    await this.getTeamInfo();
    await this.getTracks();
    let user = await JSON.parse(localStorage.getItem("user"));
    let img = user.user_image;
    if (user.username) {
      this.setState({
        userName: user.username,
        userImg: img,
        userFullName: user.full_name,
        curruntUser: user.id,
        curruntUserType: user.role,
      });
    }

    let showSection = await this.showPrivateSection();
    this.setState(
      {
        showSection: showSection,
      },
      () => {
        if (this.state.showSection) {
          this.activateMsgListener();
        }
      }
    );
  };

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  /**function for get team tracks */
  getTracks = async () => {
    let self = this;
    await getFetch(`track/`)
      .then((resp) => {
        if (resp.data) {
          self.setState({
            tracks: resp.data,
          });
        }
      })
      .catch((err) => {});
  };

  activateMsgListener = () => {
    let token = "_kontess_team_" + this.state.teamInfo.id + "_";
    let team_token = "_";
    this.state.teamInfo.partipants.map(
      (partipant) => (team_token = team_token + partipant.user.id + "_")
    );
    this.setState({
      chatToken: token,
      team_token: team_token,
    });
    const messagesRef = firebase
      .ref("chat/" + token)
      .orderByChild("timeStamp")
      .limitToLast(500);
    messagesRef.on("child_added", (snapshot) => {
      const message = { text: snapshot.val(), id: snapshot.key };
      this.setState(
        (prevState) => ({
          messages: [message, ...prevState.messages],
        }),
        () => {
          this.scrollToBottom();
          this.markAsUnreadMsg(token, snapshot.key);
        }
      );
    });
  };

  markAsUnreadMsg = async (token, key) => {
    const messagesRef = firebase.ref("chat/" + token + "/" + key);
    messagesRef.update({ seen: true });
    let seenBy;
    messagesRef.on("value", function (snap) {
      seenBy = snap.val().seenBy;
    });
    if (seenBy.indexOf("_" + this.state.userId + "_") == -1) {
      seenBy = seenBy + this.state.userId + "_";
      messagesRef.update({ seenBy: seenBy });
    }
  };
  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "chatContainer",
    });
  }

  editTeam = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };
  getTeamInfo = async () => {
    let self = this;
    this.setState({
      loading: true,
    });
    await fetch(routes.baseURL + "team/" + this.state.id, {
      method: "GET",
      headers: await routes.reqHeader(),
    })
      .then(function (response) {
        self.setState({
          loading: false,
        });
        return response.json();
      })
      .then(function (responseBody) {
        self.setState({
          teamInfo: responseBody.data,
          team_name: responseBody.data.name,
          description: responseBody.data.description,
          logoImg: responseBody.data.logo,
          files: responseBody.data.portfolio,
          track: responseBody.data.team_track.slug,
        });
      })
      .catch(function (error) {
        self.setState({
          loading: false,
        });
      });
  };
  change = (event) => {
    this.setState({ track: event.target.value });
  };
  fileSelectedHandler = (e) => {
    if (this.state.files.length < 6) {
      this.setState({ files: [...this.state.files, ...e.target.files] }, () => {
        this.renderImg();
      });
    } else {
      alert(only6ImgAllow);
    }
  };
  logoSelectedHandler = (e) => {
    this.setState({ logo: e.target.files[0] });
    let self = this;
    var reader = new FileReader();
    reader.onload = function (event) {
      self.setState({
        logoImg: reader.result,
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  removeImg = (index, id) => {
    let tempArr = this.state.files;
    tempArr.splice(index, 1);
    this.setState({ files: tempArr }, () => {
      this.renderImg();
    });
    this.setState({
      deletedItems: this.state.deletedItems
        ? this.state.deletedItems + "," + id
        : id,
    });
  };
  renderImg = () => {
    let self = this;
    var filesAmount = this.state.files.length;
    for (var i = 0; i < filesAmount; i++) {
      if (!self.state.files[i].docs) {
        var reader = new FileReader();
        let filetype = self.state.files[i].type;
        console.log(filetype);
        reader.onload = function (event) {
          self.setState({
            [i - 1]:
              filetype.indexOf("image") !== -1 ||
              filetype.indexOf("video") !== -1
                ? reader.result
                : self.renderNewFileIcon(filetype),
          });
        };
        reader.readAsDataURL(self.state.files[i]);
      }
    }
  };

  renderNewFileIcon = (filetype) => {
    switch (filetype) {
      // case "application/pdf":
      //   return PDFICON;
      // case "xlsx":
      //   return XLSXICON;
      // case "xls":
      //   return XSLCON;
      // case "application/vnd.ms-excel":
      //   return XSLCON;
      default:
      // return FILEICON;
    }
  };

  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }

  handleSend() {
    if (this.state.message.trim()) {
      var newItem = {
        userId: this.state.curruntUser,
        full_name: this.state.userFullName,
        message: this.state.message.trim(),
        timeStamp: new Date().getTime(),
        userImg: this.state.userImg,
        seen: false,
        team_token: this.state.team_token,
        seenBy: "_" + this.state.curruntUser + "_",
      };
      firebase.ref("chat/" + this.state.chatToken).push(newItem);
      this.setState({ message: "" });
    }
  }

  submit = async () => {
    const { team_name, description, track } = this.state;
    var validation = `${
      !team_name
        ? "Please enter team name"
        : !description
        ? "Please enter team introduction"
        : !track
        ? "Please select a track"
        : true
    }`;
    if (validation === "true") {
      this.setState({
        loading: true,
      });
      let self = this;
      const formData = new FormData();
      formData.append("name", team_name);
      formData.append("description", description);
      formData.append("deletedItems", this.state.deletedItems);
      formData.append("team_track", track);
      this.state.files.forEach((file, i) => {
        if (!file.docs) {
          formData.append("portfolio", file);
        }
      });
      if (this.state.logo) {
        formData.append("logo", this.state.logo);
      }
      let id = this.props.match.params.teamId;
      await fetch(routes.baseURL + "team/" + id + "/team_update/", {
        method: "POST",
        headers: await routes.reqHeaderMultipart(),
        body: formData,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          self.setState({
            loading: false,
          });
          if (res.status === 200) {
            self.setState({
              editMode: false,
            });
            self.getTeamInfo();
          } else {
            toast.error(res.msg);
          }
        })
        .catch(function (error) {
          self.setState({
            loading: false,
          });
          toast.error(commonErrorMsg);
        });
    } else {
      toast.error(validation);
    }
  };

  inviteMembers() {
    this.props.history.push("invite_members");
  }
  checkStatus = (partipants) => {
    let data = false;
    if (partipants.length) {
      let user_id = session.getSessionUserId();
      partipants.find(function (partipant) {
        if (partipant.user.id === user_id) {
          data = true;
        }
      });
    }
    return data;
  };
  inviteMember = () => {
    let partipants = this.state.teamInfo.partipants.length;
    if (partipants < 6) {
      let self = this;
      self.props.history.push("/dashboard/invite_members/" + this.state.id);
    } else {
      toast.error(errorMsgForInvitation);
    }
  };

  leaveTeam = () => {
    let msg = confirmLeaveTeam;
    let partipants = this.state.teamInfo.partipants.length;
    if (partipants < 2) {
      msg = confirmLeaveTeamDelete;
    }
    confirmAlert({
      title: "Confirm",
      message: msg,
      buttons: [
        {
          label: "Proceed",
          onClick: () => this.confirmLeave(),
        },
        {
          label: "No",
        },
      ],
    });
  };
  confirmLeave = async () => {
    let self = this;
    self.setState({
      loading: true,
    });
    await fetch(routes.baseURL + "team/" + this.state.id + "/leave_team/", {
      method: "POST",
      headers: await routes.reqHeader(),
      body: {},
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        self.setState({
          loading: false,
        });
        if (res.status === 200) {
          toast.success(res.msg);
          setTimeout(function () {
            self.props.history.push("/dashboard/team_info");
          }, 3000);
        } else {
          toast.error(res.msg);
        }
      })
      .catch(function (error) {
        self.setState({
          loading: false,
        });
        toast.error(commonErrorMsg);
      });
  };

  sendJoinRequest = (teamId) => {
    confirmAlert({
      title: "Confirm",
      message: confirmSendReq,
      buttons: [
        {
          label: "Yes",
          onClick: () => this.confirmReq(teamId),
        },
        {
          label: "No",
        },
      ],
    });
  };

  // check if prtivate team section can be shown or not
  showPrivateSection = () => {
    let data = false;
    let user_id = session.getSessionUserId();
    if (this.state.curruntUserType === "judge") {
      if (
        this.state.teamInfo.team_mentor.id &&
        this.state.teamInfo.team_mentor.id === user_id &&
        this.state.teamInfo.team_mentor.admin_status === "approved" &&
        this.state.teamInfo.team_mentor.judge_status === "approved"
      ) {
        data = true;
      }
    } else {
      if (this.state.teamInfo.partipants.length) {
        this.state.teamInfo.partipants.find(function (partipant) {
          if (partipant.user.id === user_id) {
            data = true;
          }
        });
      }
    }
    return data;
  };

  removeMentor = () => {
    confirmAlert({
      title: "Confirm",
      message: removeMentor,
      buttons: [
        {
          label: "Yes",
          onClick: () => this.confirmRemoveMentor(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  confirmRemoveMentor = async () => {
    let teamId = this.state.teamInfo.id;
    let self = this;
    await postFetch("team/" + teamId + "/admin-remove-team-judge/", {})
      .then(function (response) {
        if (response.status === 200) {
          toast.success(response.msg);
          self.getTeamInfo();
        } else {
          toast.error(commonErrorMsg);
        }
      })
      .catch((err) => {
        toast.error(commonErrorMsg);
      });
  };

  sendJoinRequest = () => {
    let partipantsLength = this.state.teamInfo.partipants.length;
    if (partipantsLength < 6) {
      confirmAlert({
        title: "Confirm",
        message: confirmSendReq,
        buttons: [
          {
            label: "Yes",
            onClick: () => this.confirmReq(),
          },
          {
            label: "No",
          },
        ],
      });
    } else {
      toast.error(errorMsgForInvitation);
    }
  };

  confirmReq = async () => {
    let self = this;
    let user_id = await session.getSessionUserId();
    let teamId = this.state.teamInfo.id;
    let body = {
      teamId: teamId,
      participant_id: user_id,
      essay: "request for join",
    };
    await fetch(routes.baseURL + "participant/create_team_request/", {
      method: "POST",
      headers: await routes.reqHeader(),
      body: JSON.stringify(body),
    })
      .then(function (response) {
        self.setState({
          loading: false,
        });
        return response.json();
      })
      .then(function (responseBody) {
        if (responseBody.status === 200) {
          toast.success(reqSend);
          self.getTeamInfo();
        } else {
          toast.error(responseBody.msg);
        }
      })
      .catch(function (error) {
        self.setState({
          loading: false,
        });
      });
  };
  getExtension(filename) {
    var parts = filename.split(".");
    return parts[parts.length - 1];
  }
  isVideo = (filename) => {
    var ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case "m4v":
      case "avi":
      case "mpg":
      case "mp4":
      case "mov":
        // etc
        return true;
    }
    return false;
  };

  renderFileIcon = (filename) => {
    var ext = this.getExtension(filename);
    switch (ext) {
      // case "pdf":
      //   return PDFICON;
      // case "xlsx":
      //   return XLSXICON;
      // case "xls":
      //   return XSLCON;
      default:
        return filename;
    }
  };

  checkUrl = (text) => {
    let data = false;
    if (
      new RegExp(
        "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
      ).test(text)
    ) {
      data = true;
    }
    return data;
  };
  validateUrl = (url) => {
    const validFirstBits = ["ftp://", "http://", "https://", "www."];
    const firstBitIsValid = validFirstBits.some(
      (bit) => url.indexOf(bit) === 0
    );
    if (!firstBitIsValid) {
      url = "https://" + url;
    }
    return url;
  };

  attachFile = async (e) => {
    let size = e.target.files[0].size / 1024 / 1024;
    if (size <= 2) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      postFetchMutiPart(`chat-docs/`, formData)
        .then((resp) => {
          if (resp.status === 200) {
            let fileName = resp.data.file_url;
            let ext = this.getExtension(fileName);
            var newItem = {
              userId: this.state.curruntUser,
              full_name: this.state.userFullName,
              message: null,
              file: fileName,
              ext: ext,
              timeStamp: new Date().getTime(),
              userImg: this.state.userImg,
              seen: false,
              team_token: this.state.team_token,
              seenBy: "_" + this.state.curruntUser + "_",
            };
            firebase.ref("chat/" + this.state.chatToken).push(newItem);
          } else {
            toast.error(commonErrorMsg);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      toast.error(fileMaxSize);
    }
  };

  renderMsg = (obj) => {
    console.log(obj);
    if (obj.file && obj.ext) {
      return (
        <div className="message file-message">
          {this.isVideo(obj.ext) ? (
            <div className="w-200">
              <video controls>
                <source type="video/mp4" src={obj.file} />
              </video>
            </div>
          ) : (
            <div className="content">
              <img width={200} src={this.renderFileIcon(obj.file)} />
              <div className="content-overlay"></div>
              <div className="content-details fadeIn-bottom">
                <a
                  href={obj.file}
                  download
                  target="_blank"
                  className="content-text"
                >
                  <h5>View</h5>
                </a>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="message">
          <span
            dangerouslySetInnerHTML={{
              __html: Urlify(obj.message),
            }}
          ></span>
        </div>
      );
    }
  };

  render() {
    let {
      teamInfo,
      loading,
      curruntUser,
      editMode,
      files,
      showSection,
      userImg,
    } = this.state;
    return (
      <DashboardTemplate
        title={teamInfo.name}
        pageId="team_info"
        loading={loading}
      >
        <div className="dashboard-grid">
          <section className="dasboard-mid mt-2">
            {teamInfo.created_by && curruntUser === teamInfo.created_by.id ? (
              <div className="icon text-right" onClick={(e) => this.editTeam()}>
                <i className="far fa-edit fa-2x"></i>
              </div>
            ) : (
              ""
            )}
            <div className="head-row">
              <div className="row align-items-center teamInfo">
                {editMode ? (
                  <div className="col-md-2">
                    <label
                      htmlFor="choose-logo"
                      className="py-3 px-2 w-50 border border-secondary bg-transparent text-center teamLogo"
                      style={{
                        backgroundImage: "url(" + this.state.logoImg + ")",
                      }}
                    >
                      <span>{this.state.logoImg ? "" : "Logo"}</span>
                    </label>
                    <input
                      accept="image/x-png,image/gif,image/jpeg"
                      id="choose-logo"
                      className="choose-file"
                      name=""
                      type="file"
                      onChange={this.logoSelectedHandler}
                    />
                  </div>
                ) : (
                  <div className="col-md-2">
                    <label
                      htmlFor="choose-logo"
                      className="py-3 px-2 w-50 border border-secondary bg-transparent text-center teamLogo"
                      style={{
                        backgroundImage: "url(" + teamInfo.logo + ")",
                      }}
                    >
                      <span>{teamInfo.logo ? "" : "Logo"}</span>
                    </label>
                  </div>
                )}
                <div className="col-md-3">
                  {editMode ? (
                    <div className="form-group">
                      <label>Team Name</label>
                      <input
                        name="team_name"
                        value={this.state.team_name}
                        onChange={this.formHandler}
                        className="form-control"
                        type="text"
                        placeholder="Team Name"
                      />
                    </div>
                  ) : (
                    <h3 className="p-0 m-0">{teamInfo.name}</h3>
                  )}
                </div>
                <div className="col-md-3">
                  {editMode ? (
                    <div className="position-relative">
                      <label>Team Track</label>
                      <select
                        className="form-control"
                        onChange={(e) => this.change(e)}
                        value={this.state.track}
                      >
                        <option>Select Track</option>
                        {this.state.tracks.map((track) => (
                          <option value={track.slug}>{track.track_name}</option>
                        ))}
                      </select>
                      <div className="select-icon-absolute position-absolute">
                        <i className="fa fa-caret-down"></i>
                      </div>
                    </div>
                  ) : (
                    <h3 className="p-0 m-0">
                      {" "}
                      {teamInfo.team_track
                        ? teamInfo.team_track.track_name
                        : ""}
                    </h3>
                  )}
                </div>
              </div>
            </div>
            <div className="team my-5">
              <div className="row justify-content-between">
                <div className="col-3">
                  <p>
                    {teamInfo.partipants ? teamInfo.partipants.length : 0}{" "}
                    Members
                    <hr />
                  </p>
                  <div
                    className="nav flex-column nav-pills mr-5"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    {teamInfo.partipants
                      ? teamInfo.partipants.map((partipant, index) => (
                          <Link
                            to={"/dashboard/profile/" + partipant.user.id}
                            key={index}
                            className="nav-link active d-flex align-items-center justify-content-between"
                          >
                            <span className="d-flex align-items-center">
                              <img
                                src={
                                  partipant.user.user_image
                                    ? partipant.user.user_image
                                    : profileLogo
                                }
                                title={partipant.user.full_name}
                                className="mx-1 bg-dark rounded-circle"
                                onError={(event) =>
                                  event.target.setAttribute("src", profileLogo)
                                }
                              />
                              {partipant.user.full_name}{" "}
                            </span>
                            {teamInfo.team_lead.id === partipant.user.id ? (
                              <div className="ribbon">
                                <span>Leader</span>
                              </div>
                            ) : (
                              ""
                            )}
                          </Link>
                        ))
                      : ""}
                    <p>
                      Coach
                      <hr />
                    </p>
                    {teamInfo.team_mentor &&
                    teamInfo.team_mentor.admin_status &&
                    teamInfo.team_mentor.judge_status ? (
                      <div>
                        <span className="nav-link active d-flex align-items-center justify-content-between">
                          <Link
                            to={"/dashboard/profile/" + teamInfo.team_mentor.id}
                            className="d-flex align-items-center"
                          >
                            <img
                              src={
                                teamInfo.team_mentor.user_image
                                  ? teamInfo.team_mentor.user_image
                                  : profileLogo
                              }
                              title={teamInfo.team_mentor.full_name}
                              className="mx-1 bg-dark rounded-circle"
                              onError={(event) =>
                                event.target.setAttribute("src", profileLogo)
                              }
                            />
                            {teamInfo.team_mentor.full_name}{" "}
                          </Link>
                          {teamInfo.team_mentor.admin_status === "pending" ||
                          teamInfo.team_mentor.judge_status === "pending" ? (
                            <div className="ribbon badge-warning">
                              <span>Approval Pending</span>
                            </div>
                          ) : this.state.curruntUserType === "admin" ? (
                            <div
                              className="btn btn-outline-danger"
                              onClick={() => this.removeMentor()}
                            >
                              <span>Remove</span>
                            </div>
                          ) : (
                            ""
                          )}
                        </span>
                        {teamInfo.team_mentor.admin_status === "pending" ||
                        (teamInfo.team_mentor.judge_status === "pending" &&
                          this.state.curruntUserType === "admin") ? (
                          <Link
                            to={"/dashboard/invite_judge/" + teamInfo.id}
                            className="btn btn-info btn-md btn-block"
                          >
                            Add Judge/Coach
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <div className="butn-block mx-3">
                        {teamInfo.partipants &&
                        teamInfo.partipants.length &&
                        this.checkStatus(teamInfo.partipants) ? (
                          //     <Link
                          //       to={'/dashboard/invite_judge/' + teamInfo.id}
                          //       className="btn btn-info btn-md btn-block"
                          //     >
                          //       Invite Judge/Coach
                          // </Link>
                          ""
                        ) : this.state.curruntUserType === "admin" ? (
                          <Link
                            to={"/dashboard/invite_judge/" + teamInfo.id}
                            className="btn btn-info btn-md btn-block"
                          >
                            Add Judge/Coach
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                    <div className="butn-block mx-3 mt-2">
                      {teamInfo.created_by &&
                      curruntUser === teamInfo.created_by.id ? (
                        <button
                          onClick={(e) => this.inviteMember()}
                          className="btn btn-primary btn-md btn-block"
                        >
                          Invite Members
                        </button>
                      ) : (
                        ""
                      )}
                      {teamInfo.partipants &&
                      teamInfo.partipants.length &&
                      this.checkStatus(teamInfo.partipants) ? (
                        <button
                          onClick={(e) => this.leaveTeam()}
                          className="btn btn-danger btn-md btn-block"
                        >
                          Leave Team
                        </button>
                      ) : this.state.curruntUserType !== "admin" &&
                        this.state.curruntUserType !== "judge" ? (
                        teamInfo.status === "pending" ? (
                          <span className="badge badge-info">
                            Request Pending
                          </span>
                        ) : (
                          <button
                            onClick={() => this.sendJoinRequest()}
                            className="btn btn-primary btn-md btn-block"
                          >
                            Join Team
                          </button>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-9">
                  <div className="tab-content" id="v-pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                    >
                      <h2 className="intro">
                        <u>Introduction</u>
                      </h2>
                      {editMode ? (
                        <div className="border border-secondary p-2">
                          <div className="form-group">
                            <textarea
                              value={this.state.description}
                              name="description"
                              onChange={this.formHandler}
                              className="form-control"
                              cols="7"
                              rows="5"
                            ></textarea>
                          </div>
                          <div className="text-right">
                            <button
                              className="bg-transparent btn btn-md border border-secondary mx-2"
                              onClick={() => this.editTeam()}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-md btn-primary text-white mx-2"
                              onClick={this.submit.bind(this)}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="border-secondary p-2">
                          {teamInfo.description ? (
                            <p
                              dangerouslySetInnerHTML={{
                                __html: Urlify(teamInfo.description),
                              }}
                            ></p>
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                      <div className="upload-btn my-3 add-product-side-upload">
                        {editMode ? (
                          <div className=" field-choose-file">
                            <input
                              id="choose-file"
                              className="choose-file"
                              name=""
                              type="file"
                              onChange={this.fileSelectedHandler}
                              accept="image/*, video/*,application/pdf,.xlsx, .xls"
                            />
                            <label
                              for="choose-file"
                              className="upload-file mx-5 text-light bg-primary "
                            >
                              Upload media (max 6 images, videos 1 min, 200MB
                              max)
                            </label>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="row">
                        {files
                          ? files.map((file, index) => (
                              <div
                                key={index}
                                className="col-md-4 position-relative mb-4"
                              >
                                {file.docs ? (
                                  this.isVideo(file.docs) ? (
                                    <div className="border border-secondary cstm-box">
                                      {" "}
                                      <video autoPlay controls>
                                        <source
                                          type="video/mp4"
                                          src={file.docs}
                                        />
                                      </video>{" "}
                                      {editMode ? (
                                        <i
                                          onClick={(e) =>
                                            this.removeImg(index, file.id)
                                          }
                                          className="custm-minus p-1 rounded-circle bg-secondary text-white position-absolute fa fa-minus "
                                        ></i>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  ) : (
                                    <div className="content border border-secondary ">
                                      <a>
                                        <img
                                          className="content-image"
                                          src={this.renderFileIcon(file.docs)}
                                        />
                                        {editMode ? (
                                          <i
                                            onClick={(e) =>
                                              this.removeImg(index, file.id)
                                            }
                                            className="custm-minus p-1 rounded-circle bg-secondary text-white position-absolute fa fa-minus "
                                          ></i>
                                        ) : (
                                          <div>
                                            <div className="content-overlay"></div>
                                            <div className="content-details fadeIn-bottom">
                                              <a
                                                href={file.docs}
                                                download
                                                target="_blank"
                                                className="content-text"
                                              >
                                                <h5>View</h5>
                                              </a>
                                            </div>
                                          </div>
                                        )}
                                      </a>
                                    </div>
                                  )
                                ) : this.state[index] &&
                                  this.state[index].indexOf("video") != -1 ? (
                                  <div className="border border-secondary cstm-box">
                                    {" "}
                                    <video autoPlay controls>
                                      <source
                                        type="video/mp4"
                                        src={this.state[index]}
                                      />
                                    </video>{" "}
                                    <i
                                      onClick={(e) => this.removeImg(index)}
                                      className="custm-minus p-1 rounded-circle bg-secondary text-white position-absolute fa fa-minus "
                                    ></i>
                                  </div>
                                ) : (
                                  <div className="content border border-secondary">
                                    <a>
                                      <img
                                        className="content-image"
                                        src={this.state[index]}
                                      />
                                      <div></div>
                                    </a>
                                    <i
                                      onClick={(e) => this.removeImg(index)}
                                      className="custm-minus p-1 rounded-circle bg-secondary text-white position-absolute fa fa-minus "
                                    ></i>
                                  </div>
                                )}
                              </div>
                            ))
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {showSection ? (
          <div className="chat-container clearfix">
            <hr />
            <div className="row">
              <div className="col-md-8">
                <div className="chat bg-white">
                  <div className="chat-header border-bottom p-3">
                    <div className="chat-about d-flex align-items-center">
                      <div className="img-user mr-3">
                        <img
                          src={teamInfo.logo ? teamInfo.logo : kontessLogo}
                          alt="avatar"
                          onError={(event) =>
                            event.target.setAttribute("src", kontessLogo)
                          }
                        />
                      </div>
                      <h4>{teamInfo.name}</h4>
                    </div>
                  </div>
                  <div className="chat-history py-4 px-5" id="chatContainer">
                    <ul>
                      {this.state.messages.length ? (
                        this.state.messages
                          .slice(0)
                          .reverse()
                          .map((message, index) => (
                            <li key={message.id} className="clearfix">
                              <div
                                className={`message-data p-3 mb-4 ${
                                  message.text.userId === curruntUser
                                    ? "align-right in-right"
                                    : "in-left"
                                }`}
                              >
                                {this.state.messages.slice(0).reverse()[
                                  index - 1
                                ] &&
                                this.state.messages.slice(0).reverse()[
                                  index - 1
                                ].text.userId === message.text.userId ? (
                                  ""
                                ) : (
                                  <div
                                    className={`d-flex pb-3 ${
                                      message.text.userId === curruntUser
                                        ? " justify-content-end"
                                        : ""
                                    }`}
                                  >
                                    <div className="img-user">
                                      <img
                                        src={
                                          message.text.userId === curruntUser
                                            ? userImg
                                              ? userImg
                                              : profileLogo
                                            : message.text.userImg
                                            ? message.text.userImg
                                            : profileLogo
                                        }
                                        alt="avatar"
                                        onError={(event) =>
                                          event.target.setAttribute(
                                            "src",
                                            profileLogo
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="about ml-3">
                                      <span className="message-data-time">
                                        <Moment
                                          from={moment().format(
                                            "YYYY-MM-DD hh:mm:ss"
                                          )}
                                        >
                                          {message.text.timeStamp}
                                        </Moment>
                                      </span>{" "}
                                      &nbsp; &nbsp;
                                      <div className="name text-left">
                                        {message.text.full_name}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {this.renderMsg(message.text)}
                              </div>
                            </li>
                          ))
                      ) : (
                        <h5 className="text-center">No messages found!!</h5>
                      )}
                    </ul>
                  </div>
                  <div className="chat-message p-3">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <label
                          className="input-group-text border-0"
                          htmlFor="choose-logo"
                        >
                          <i class="fas fa-paperclip"></i>
                          <input
                            accept="image/*, video/*,application/pdf,.xlsx, .xls"
                            id="choose-logo"
                            className="choose-file"
                            name=""
                            type="file"
                            onChange={this.attachFile}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control bg-gray border-left"
                        placeholder="Message"
                        value={this.state.message}
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                      />
                      <button
                        className="input-group-text input-group-append border-0 text-primary"
                        onClick={this.handleSend.bind(this)}
                      >
                        <i class="fas fa-paper-plane fa-lg mr-2"></i>
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="team-task-list">
                  {/* <h5 className="text-primary mb-4">
                    For direct messages, go to the
                    <Link to="/dashboard/my_team">"Messages"</Link> tab
                  </h5>
                  <TeamTasks teamId={teamInfo.id}></TeamTasks> */}
                </div>
                <hr />
                <TeamEvents teamId={teamInfo.id}></TeamEvents>
              </div>
            </div>
            <hr />
            <TeamFiles teamId={teamInfo.id}></TeamFiles>
          </div>
        ) : (
          ""
        )}
      </DashboardTemplate>
    );
  }
}
