/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from 'react';
import { toast } from 'react-toastify';
import * as session from '../../../utils/session';
import { getFetch, postFetch } from '../../../utils/fetchRequests';
import { commonErrorMsg } from '../../../utils/Message';
import { Link } from "react-router-dom";
import Moment from 'react-moment';

export default class TeamTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      perPage: 100,
      mytask: false,
      userId: session.getSessionUserId()
    };
  }

  componentWillMount = async () => {
    await this.getTeamEvents();
    let UserType = await session.getUserType();
    this.setState({
      UserType: UserType
    })
  };

  getTeamEvents = async () => {
    let self = this;
    await getFetch(`team_task/?team_id=` + this.props.teamId + '&limit=' + this.state.perPage + '&offset=0&mytask=' + this.state.mytask)
      .then(resp => {
        if (resp.data) {
          self.setState({
            tasks: resp.data
          });
        }
      })
      .catch(err => { });
  }

  showMyTask = () => {
    this.setState({
      mytask: !this.state.mytask
    }, () => {
      this.getTeamEvents()
    })
  }

  participantIndex = (participants) => {
    let index = -1;
    let self = this;
    if (participants.length) {
      participants.find(function (participant, i) {
        if (participant.user.id === self.state.userId) {
          index = i;
        }
      });
    }
    return index;
  }

  markMyTaskComplete = async (taskId) => {
    let self = this;
    const data = { status: "complete" };
    await postFetch("task_status/" + taskId + '/update/', data)
      .then(function (response) {
        if (response && response.msg) {
          toast.success(response.msg);
          self.getTeamEvents();
        } else {
          toast.error(commonErrorMsg);
        }
      })
      .catch(err => {
        toast.error(commonErrorMsg);
      });
  }

  render() {
    const { tasks, mytask, userId, UserType } = this.state;
    return (
      <div>
        <div className="team-task-head d-flex justify-content-between">
          <h5>Team Tasks</h5>
          {UserType === 'participant' ?
            <div className="custom-control custom-checkbox dark-checkbox ml-5 d-inline-block">
              <input type="checkbox" className="custom-control-input" id="customCheck1" onChange={(e) => this.showMyTask()} checked={mytask} />
              <label className="custom-control-label ml-2" htmlFor="customCheck1">My task only</label>
            </div> : ''
          }
        </div>
        <ul className="list-unstyled overflow-height">
          {tasks.length
            ? tasks.map((task, index) => (
              <li key={task.id}>

                <div className={`comment-widgets no-hover p-1 border border-dark mb-0 ${this.participantIndex(task.participants) !== -1 ? task.task_status.status === 'complete' ? 'bg-white' : 'bg-d7' : 'bg-white'}`} >
                  <div className="d-flex flex-row comment-row border-0">
                    <div className="tesk-detail w-100 border-0 ml-0 pl-0">
                      <Link to={'/dashboard/edit-team-task/' + this.props.teamId + '/' + task.id}><h5 className="text-muted mb-0">{task.title}</h5> </Link>
                      <span>Assigned to:  {task.participants.map((partipant, index) => (
                        userId === partipant.user.id ? 'Me, ' : partipant.user.full_name + ', '
                      ))
                      }</span>
                      <h6 className="text-muted mb-0 event-name">
                        Created By : {task.created_by.id === userId ? 'Me' : task.created_by.full_name}
                      </h6>
                    </div>
                    {this.participantIndex(task.participants) !== -1 ? task.task_status.status !== 'complete' ?
                      <div className="task-state w-100 text-right">
                        <button onClick={() => this.markMyTaskComplete(task.task_status.id)} className="btn btn-md btn-success px-4 rounded-0">
                          Mark Complete
                          </button>
                      </div> : <div className="task-state float-right text-center w-50"> <span className="border border-success state d-block">
                        <strong>completed</strong> <br />  <Moment format="ll">{task.task_status.updated_on}</Moment>
                      </span> </div> : ''
                    }
                  </div>
                </div>
              </li>
            ))
            : <h4 className="text-center padding100">No team task yet</h4>}
        </ul>
        <div className="my-3">
          <Link to={'/dashboard/create-team-task/' + this.props.teamId} className="btn btn-lg btn-primary px-4 rounded-0 btn-block w-75 m-auto">
            Assign new tasks
          </Link>
        </div>
      </div >
    );
  }
}
