
import React from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import * as session from "../../../utils/session";
//import * as routes from "../../globals/endpoints";
import { profileLogo, kontessLogo, Loading } from '../../globals/contants';
import { confirmSendReq, reqSend, errorMsgForInvitation, deleteTeamMsg } from "../../../utils/Message";
import { postFetch, downloadDoc } from "../../../utils/fetchRequests";
import history from "../../../history";
//import { async } from "q";
import ResultView from "./resultVIew";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expend: false,
      tracks: [],
      curruntUserId: '',
      curruntUserType: 'Participant',
      perPage: 10
    };
  }

  componentWillMount = async () => {
    let userType = await session.getUserType();
    let user_id = await session.getSessionUserId();
    this.setState({
      userId: user_id,
      curruntUserType: userType
    })
    // if(this.props.type === "teams" && this.state.tracks.length===0){
    //   this.getTracks()
    // }
    this.getMyTeams();
  }

  getMyTeams = async (offset = 0) => {
    // let self = this;
    // await getFetch('team/myteam/?limit=' + this.state.perPage + '&offset=' + offset).then((responseBody) => {
    //   if (responseBody.status === 200) {
    //     self.setState({
    //       teamList: responseBody
    //     })
    //   } else {
    //     self.setState({
    //       loading: false
    //     })
    //   }
    // }).catch(err => { })
  }

  expended = () => {
    this.setState({ expend: !this.state.expend })
  }


  sendJoinRequest = (teamId, partipantsLength) => {

    if (partipantsLength < 6 || this.state.curruntUserType === 'judge') {
      confirmAlert({
        title: 'Confirm',
        message: confirmSendReq,
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.confirmReq(teamId)
          },
          {
            label: "No"
          }
        ]
      });
    } else {
      toast.error(errorMsgForInvitation);
    }
  }

  confirmReq = async (teamId) => {
    let self = this;
    let user_id = await session.getSessionUserId();
    let body = { teamId: teamId, participant_id: user_id, essay: "request for join" }
    await postFetch(`participant/create_team_request/`, body)
      .then(function (resp) {
        if (resp.status === 200) {
          self.props.callBack();
          toast.success(reqSend);
        } else {
          toast.error(resp.msg);
        }
      })
      .catch(function (error) {
        self.setState({ error: 'error' });
      });

  }

  /**Function for check status */
  checkStatus = (partipants) => {
    let data = false;
    if (partipants.length) {
      let user_id = session.getSessionUserId();
      partipants.find(function (partipant) {
        if (partipant.user.id === user_id) {
          data = true;
          return true;
        }
        return false;
      });
    }
    return data;
  }

  /**Function for delete item*/
  deleteTeam = (id) => {
    confirmAlert({
      title: 'Confirm',
      message: deleteTeamMsg,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.confirmDelete(id)
        },
        {
          label: 'No',
        }
      ]
    });
  }

  /**Function for confirm delete item*/
  confirmDelete = async (id) => {
    let self = this;
    await postFetch(`team/${id}/team-delete/`, {})
      .then(function (resp) {
        if (resp.status === 200) {
          self.props.callBack();
        } else {
          toast.error(resp.msg);
        }
      })
      .catch(function (error) {
        self.setState({ error: 'error' });
      });
  }

  /**Function for get submission status*/
  getSubmissionStatus = (submission_docs, id, taskInstancId, task_grading) => {
    let result = "";
    if (this.props.judging == false){
      result = <h5 className="text-danger  pt-1 d-block">No submission found</h5>;
    }
    let gradeResult;
    let self = this;
    if (this.props.judging){
      gradeResult = self.showGradeButton(id, taskInstancId, task_grading);
      return <div>{gradeResult}</div>
    }

    if (submission_docs.length) {
      if (this.props.judges && this.props.judges.length) {
        this.props.judges.find(function (item) {
          if (item.id === self.state.userId) {
            gradeResult = self.showGradeButton(id, taskInstancId, task_grading);
          }
          return false;
        });
      }
      result = <div>{gradeResult}<a  onClick={() => this.downloadSubmission(submission_docs)}><span className="text-primary  pt-1 d-block font-weight-bold">Download submission file  <i className="fas fa-download"></i></span></a></div>;
    }
    return result;
  }

  /**Function for get show grade button*/
  showGradeButton = (id, taskInstancId, task_grading) => {

    let result = <button onClick={() => this.goForGrade(id, taskInstancId)} className="btn btn-md px-4 rounded-0 btn-primary">Begin Grading</button>;
    if (task_grading !== undefined && task_grading.length>0) {
      let self = this;
      task_grading.find(function (item) {
        if (item.judge.id === self.state.userId) {
          if (item.status === 'Publish') {
            result = <button onClick={() => self.goForGrade(id, taskInstancId, item.id)} className="btn btn-md px-4 rounded-0 btn-success">View / Regrade</button>;
          } else {
            result = <button onClick={() => self.goForGrade(id, taskInstancId, item.id)} className="btn btn-md px-4 rounded-0 btn-warning">Resume Grading</button>;
          }
        }
        return false;
      });
    }
    return result;
  }

  /**Function for go for give grade */
  goForGrade = (id, taskInstancId, gradeId) => {
    let judging = this.props.judging
    let location_path = "/dashboard/grading"

    if (judging){
      location_path = "/dashboard/live-grading"
    }
    history.push({
      pathname: location_path,
      state: {
        taskId: this.props.taskId,
        id: id,
        taskInstancId: taskInstancId,
        gradeId: gradeId
      }
    })
  }

  /**Function for go download submission */
  downloadSubmission = async (submission_docs) => {
    for (var i = 0; i < submission_docs.length; i++) {
      if (submission_docs[i].doc) {
        await downloadDoc(submission_docs[i].doc, submission_docs[i].doc.substring(submission_docs[i].doc.lastIndexOf('/') + 1)).then((responseBody) => { }).catch(err => { })
      }
    }
  }

  showOverAll = (task_grading, id) => {
    if (this.state.curruntUserType === 'admin') {
      let show = false;
      if (task_grading.length) {
        let result = 0;
        let total_judge = 0;
        task_grading.map(function (item) {
          if (item.status === 'Publish') {
            total_judge++;
            show = true;
            item.grades.map(function (grade) {
              result = result + grade.score
              return result;
            });
          }
          return item;
        });
        return show ? <div> <h5 className="text-danger">Overall : {total_judge === 0 ? result : parseFloat(result / total_judge).toFixed(1)}</h5><a  className="text-primary  pt-1 d-block font-weight-bold" data-toggle="collapse" data-target={"#collapseOne" + id} aria-expanded="false" aria-controls="collapseOne">View Details</a></div> : '';
      }
    }
  }

  render() {
    const { curruntUserType } = this.state;
    let judging = this.props.judging
    let self = this
    // console.log("this.props.tracks", this.props.tracks)
    // console.log("this.props.teamList", this.props.teamList)

    return (
      <div className="tab-pane fade active show" id="accordionExample">
        {
          this.props.type === 'teams'
            ?
            this.props.tracks && this.props.teamList !== undefined && this.props.teamList
                ?
                  this.props.teamList.length
                    ?
                    this.props.tracks.map(function(trackItem, index){
                      let track_wise_teams = []
                      self.props.teamList.map((team, index) =>
                        {
                          // console.log("team.submitted_docs", team.submitted_docs)
                          // console.log("team.submitted_task_id",team.submitted_task_id)
                          // console.log("team.task_grading", team.task_grading)
                          // console.log("team.id", team.id)
                          // console.log("team", team)

                          if (team.team_track === undefined || trackItem.id === team.team_track.id ){
                            console.log("trackItem.id", trackItem.id, team.team_track == undefined || trackItem.id === team.team_track.id )
                            let team_div =
                              <div key={index} className="card-body">
                                <div className="row justify-content-between align-items-center">
                                  <div className="col-md-1 text-center">
                                    <div className="inviteImg"><img src={team.logo ? team.logo : kontessLogo} alt="kontess logo"/></div>
                                  </div>

                                  <div className="col-md-2">
                                    <Link aria-expanded="true" to={'/dashboard/team_view/' + team.id}><h4>{team.name}</h4></Link>
                                    <div className="my-1">{team.team_track.track_name}</div>
                                  </div>

                                  <div className="col-md-4">

                                    <div className="d-flex justify-content-start align-items-center">
                                      <p className="m-0 mr-1 w-15">Members</p>
                                      {team.partipants.map((partipant, index) => (
                                        <Link key={index} to={'/dashboard/profile/' + partipant.user.id}>
                                          <img
                                            src={partipant.user.user_image ? partipant.user.user_image : profileLogo}
                                            title={partipant.user.full_name}
                                            className="mx-1 bg-dark rounded-circle"
                                            onError={(event) => event.target.setAttribute("src", profileLogo)}
                                            alt="profile logo"/>
                                        </Link>
                                      ))}
                                    </div>

                                    <div className="d-flex mt-2 justify-content-start align-items-center">
                                      <p className="m-0 mr-1 w-15">Coach</p>

                                      {/* {team.random_judges ? team.random_judges.map(judge => (
                                        <Link to={'/dashboard/profile/' + judge.id}> <img src={judge.user_image ? judge.user_image : profileLogo} title={judge.full_name} className="mx-1 bg-dark rounded-circle" onError={(event) => event.target.setAttribute("src", profileLogo)} /></Link>
                                      )) : ''} */}

                                      {
                                        team.team_mentor.id && team.team_mentor.admin_status === 'approved' && team.team_mentor.judge_status === 'approved'
                                        ?
                                          <Link to={'/dashboard/profile/' + team.team_mentor.id}>
                                            <img
                                              src={team.team_mentor.user_image ? team.team_mentor.user_image : profileLogo}
                                              title={team.team_mentor.full_name} className="mx-1 bg-dark rounded-circle"
                                              onError={(event) => event.target.setAttribute("src", profileLogo)}
                                              alt="profile logo"
                                              />
                                            </Link>
                                        :
                                        ''
                                      }

                                    </div>
                                  </div>

                                  <div className="col-md-2 text-center">
                                    {self.showOverAll(team.task_grading, team.id)}
                                    {team.random_judges && team.random_judges.length ? <div className="d-flex align-items-center">
                                      <p className="m-0 mr-1">Judges</p>

                                      <div>
                                        {
                                          team.random_judges.map((judge, index) => (
                                            <Link key={index} className="mb-2 d-inline-block" to={'/dashboard/profile/' + judge.id}>
                                              <img
                                                src={judge.user_image ? judge.user_image : profileLogo}
                                                title={judge.full_name} className="mx-1 bg-dark rounded-circle"
                                                onError={(event) => event.target.setAttribute("src", profileLogo)}
                                                alt="profile logo"
                                                />
                                            </Link>
                                        ))}
                                      </div>
                                    </div> : ''}
                                  </div>
                                  <div className="col-md-3 text-center">
                                    {self.getSubmissionStatus(team.submitted_docs, team.id, team.id, team.task_grading)}
                                  </div>
                                </div>
                                <div>
                                  {
                                    curruntUserType === 'admin' ?
                                    <div id={"collapseOne" + team.id} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample" >
                                      <div className="col-md-12 pb-3">
                                        <ResultView judges={self.props.judges} questions={self.props.questions} task_grading={team.task_grading}></ResultView>
                                      </div>
                                    </div> : ''
                                  }
                                </div>
                              </div>
                            track_wise_teams.push(team_div)
                        }})
                        return(
                          <div className="team-head">
                            {track_wise_teams}
                          </div>
                        )
                      }):
                    <h5 className="text-center">No team found!</h5>
                 :
                <Loading />
              :
          this.props.individualsList
            ?
              this.props.individualsList.length
                ?
                  this.props.individualsList.map((individual, index) => {

                    // console.log("individual.submitted_docs", individual.submitted_docs)
                    // console.log("individual.participant_id",individual.participant.id)
                    // console.log("individual.id", individual.id)
                    // console.log("individual.task_grading", individual.task_grading)
                    return(
                      <div key={individual.participant.id} className="card my-2">
                        <div className="card-body">
                          <div className="row justify-content-between align-items-center">
                            <div className="col-md-1 text-center">
                              <Link to={'/dashboard/profile/' + individual.participant.user.id}><div className="inviteImg"><img src={individual.participant.user.user_image ? individual.participant.user.user_image : profileLogo} alt="profile logo"/></div></Link>
                            </div>
                            <div className="col-md-6">
                              <h5><Link to={'/dashboard/profile/' + individual.participant.user.id}>{individual.participant.user.full_name ? individual.participant.user.full_name : individual.participant.user.username}</Link> </h5>
                              <p className="skills">
                                {individual.participant.user.skill.map((skill, index) => (
                                  <span key={index} className="badge badge-info">{skill.label}</span>
                                ))}
                              </p>
                            </div>
                            <div className="col-md-2">
                              {this.showOverAll(individual.task_grading, individual.id)}

                            </div>
                            <div className="col-md-3 text-right pr-5">
                              {this.getSubmissionStatus(individual.submitted_docs, individual.participant.id, individual.id, individual.task_grading)}

                            </div>

                          </div>
                        </div>

                        {
                          curruntUserType === 'admin'
                          ?
                            <div id={"collapseOne" + individual.id} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample" >
                              <div className="col-md-12 pb-3">
                                <ResultView judges={this.props.judges} questions={this.props.questions} task_grading={individual.task_grading}>
                                </ResultView>
                              </div>
                            </div>
                          : ''
                        }
                      </div>
                      )
                  }
                )
              :
            <h5 className="text-center">No participants found!</h5>
          :
            <Loading />
      }
      </div>
    );
  }
}
