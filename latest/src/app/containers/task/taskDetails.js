
import React from 'react';
import * as session from '../../../utils/session';
import { getFetch, postFetch, downloadDoc } from '../../../utils/fetchRequests';
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import Card from "./Card";
import Pagination from '../../components/pagination'
import moment from "moment";
import Moment from 'react-moment';
import { profileLogo, Loading } from '../../globals/contants';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { commonErrorMsg, removeJudgeMsg } from "../../../utils/Message";
//import { async } from 'q';
import FileName from '../people/fileName';
import { Urlify } from '../../globals/contants';

export default class TaskDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            perPage: 10,
            userId: session.getSessionUserId(),
            dataList: [],
            questions: [],
            assing_to: '',
        };
    }

    componentWillMount = async () => {
        let UserType = await session.getUserType();
        this.setState({
            UserType: UserType,
            taskId: this.props.match.params.taskId
        }, () => {
            this.getTaskDetail();
        })
    };

    search = (event) => {
        this.setState({
            searchVal: event.target.value
        })
        if (this.state.assing_to === 'individuals') {
            this.getIndividuals(0, event.target.value);
        } else {
            this.getAllTeams(0, this.state.curruntTrack, event.target.value);
        }

    }

    /**function for get All Teams */
    getAllTeams = async (offset = 0, track = '', search = '') => {
        let self = this;
        self.setState({
            dataList: [],
            curruntTrack: track
        })
        await getFetch('track/' + track + '/team-list/?task_id=' + this.state.taskId + '&team_name=' + search + '&limit=' + this.state.perPage + '&offset=' + offset).then((responseBody) => {
            if (responseBody.status === 200) {
                self.setState({
                    dataList: responseBody.data,
                    teamsCount: responseBody.count
                }, () => {
                    self.getAllUsers('judge')
                })
            }
        }).catch(err => { })
    }

    // get the list of users (admin/judge/participants)
    getAllUsers = async (type, offset = 0, search = 0, skill = '') => {
        let data = {};
        let self = this;
        self.setState({
            type: type
        })
        await getFetch(`user/?role=${type}&limit=${10000}&offset=${offset}&name=${search ? search : ''}&skill=${skill}`).then((resp) => {
            if (resp.data) {
                data[type] = resp.data;
                data[type].count = resp.count;
                self.setState(data);
            }
        }).catch(err => {
        })
    }

    /**function for get team tracks */
    getTracks = async () => {
        let self = this;
        await getFetch(`track/`).then((resp) => {
            if (resp.data) {
                self.setState({
                    tracks: resp.data
                })
                if (resp.data.length >0){
                    self.getAllTeams(0, resp.data[0].id)
                }
            }
        }).catch(err => { })
    }

    /**function for get task details */
    getTaskDetail = async () => {
        let self = this;
        await getFetch(`task/` + this.state.taskId + `/`)
            .then(resp => {
                if (resp.data) {
                    self.setState({
                        title: resp.data.title,
                        description: resp.data.description,
                        submission_due_date: resp.data.submission_due_date,
                        grade_due_date: resp.data.grade_due_date,
                        questions: resp.data.questions,
                        assing_to: resp.data.assing_to,
                        release_score_to_participant: resp.data.release_score_to_participant,
                        is_randomized: resp.data.is_randomized,
                        is_judge_locked: resp.data.is_judge_locked
                    }, () => {
                        if (resp.data.assing_to === 'teams') {
                            self.getTracks();
                        }
                        else {
                            self.getIndividuals();
                        }
                    });
                }
            })
            .catch(err => { });
    }

    getIndividuals = async (offset = 0, search = '') => {
        let self = this;
        self.setState({
            dataList: []
        })
        await getFetch('participant_task/' + this.state.taskId + '/individual-tasks/?pname=' + search + '&limit=' + this.state.perPage + '&offset=' + offset).then((responseBody) => {
            if (responseBody.status === 200) {
                self.setState({
                    dataList: responseBody.data,
                    teamsCount: responseBody.count
                }, () => {
                    self.getAllUsers('judge')
                })
            }
        }).catch(err => { })
    }

    getTaskStatus = (submissionDueDate, gradeDueDate) => {
        let submission_due_date = moment(submissionDueDate, 'YYYY-MM-DD hh:mm A');
        let grade_due_date = moment(gradeDueDate, 'YYYY-MM-DD hh:mm A');
        let status;
        let text_class;
        let result;
        if (moment() < submission_due_date) {
            status = 'Submission on going';
            text_class = 'text-primary';
            result = <div> <h6 className={`d-block pt-2 m-0 ${text_class}`}>{status}</h6><hr /> <button title="You can release score after grading completed" className="btn btn-md btn-primary px-4 rounded-0" disabled>Release Score to Participants</button></div>
        } else if (moment() > submission_due_date && moment() < grade_due_date) {
            status = 'Submission finished now grading on going';
            text_class = 'text-info';
            result = <div> <h6 className={`d-block pt-2 m-0 ${text_class}`}>{status}</h6><hr /><button title="You can release score after grading completed" className="btn btn-md btn-primary px-4 rounded-0" disabled>Release Score to Participants</button></div>
        } else if (moment() > grade_due_date && moment() > submission_due_date) {
            status = 'Judging finished';
            text_class = 'text-success';
            result = <div><h6 className={`d-block pt-2 m-0 ${text_class}`}>{status}</h6> <hr />
                {this.state.UserType === 'admin' ? this.state.release_score_to_participant ? <span className="badge badge-success">Score Relased to Participants</span> :
                    <button onClick={() => this.relaseScore()} className="btn btn-md btn-primary px-4 rounded-0">Release Score to Participants</button>
                    : ''}
            </div>
        }
        return result
    }

    relaseScore = async () => {
        let self = this;
        let data = {
            release_score_to_participant: true
        };
        await postFetch('task/' + this.state.taskId + '/release-score/', data)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success(response.msg);
                    self.getTaskDetail();
                } else {
                    toast.error(response.msg);
                }
            })
            .catch(err => {
                toast.error(commonErrorMsg);
            });
    }
    getJudgeStatus = (Judge) => {
        let data = <a onClick={() => this.assignJuge(Judge)} className="text-primary" >Assign</a>;
        if (this.state.dataList.judges) {
            /*
            this.state.dataList.judges.find(function (judge) {
                if (judge.id === Judge.id) {
                    data = <a className="text-info"  >Assigned</a>;;
                }
                return;
            });*/
            const found = this.state.dataList.judges.find( judge => judge.id === Judge.id );
            if( found ){data = <a className="text-info" >Assigned</a>;}

        }
        return data;
    }

    assignJuge = (Judge) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to assign this judge?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.conifrmAssign(Judge)
                },
                {
                    label: 'No'
                }
            ]
        });
    }
    conifrmAssign = async (Judge) => {
        let self = this;
        let data = {
            judges: [Judge],
            track: this.state.curruntTrack
        };
        let url = 'task/' + this.state.taskId + '/judge_assign/';
        if (this.state.assing_to === 'individuals') {
            url = 'task/' + this.state.taskId + '/judge_assign/?assing_to=individuals';
        }
        await postFetch(url, data)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success(response.msg);
                    if (self.state.assing_to === 'individuals') {
                        self.getIndividuals();
                    } else {
                        self.getAllTeams(0, self.state.curruntTrack);
                    }
                } else {
                    toast.error(response.msg);
                }
            })
            .catch(err => {
                toast.error(commonErrorMsg);
            });
    }

    reamoveJuge = (Judge) => {
        confirmAlert({
            title: 'Confirm',
            message: removeJudgeMsg,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.conifrmRemove(Judge)
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    conifrmRemove = async (Judge) => {
        let self = this;
        let data = {
            judge_id: Judge.id,
            track: this.state.curruntTrack
        };
        let url = 'task/' + this.state.taskId + '/judge_remove/';
        if (this.state.assing_to === 'individuals') {
            url = 'task/' + this.state.taskId + '/judge_remove/?assing_to=individuals';
        }
        await postFetch(url, data)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success(response.msg);
                    if (self.state.assing_to === 'individuals') {
                        self.getIndividuals();
                    } else {
                        self.getAllTeams(0, self.state.curruntTrack);
                    }
                } else {
                    toast.error(response.msg);
                }
            })
            .catch(err => {
                toast.error(commonErrorMsg);
            });
    }

    onPageChangeAll = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.perPage)
        if (this.state.assing_to === 'teams') {
            this.getAllTeams(offset, this.state.curruntTrack);
        } else {
            this.getIndividuals(offset);
        }
    }

    exportResult = async (fileName) => {
        await getFetch(`task/${this.state.taskId}/export/`).then((resp) => {
            if (resp.status === 200) {
                let extension = this.getExtension(resp.data.csv_link)
                downloadDoc(resp.data.csv_link, fileName + '.' + extension).then((responseBody) => { }).catch(err => { })
                document.getElementById("export").click();
            } else {
                toast.error(resp.msg);
            }
        }).catch(err => {
            toast.error(commonErrorMsg);
        })
    }

    getExtension(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }

    randomizeJudgesAgain = () => {
        confirmAlert({
            title: 'Confirm',
            message: 'This will overwrite the results of all submission. Proceed?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.randomizeJudges()
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    randomizeJudges = async () => {
        let self = this;
        await postFetch('task/' + this.state.taskId + '/random-judge-assing/', {})
            .then(function (response) {
                if (response.status === 200) {
                    toast.success(response.msg);
                    self.getTaskDetail();
                } else {
                    toast.error(response.msg);
                }
            })
            .catch(err => {
                toast.error(commonErrorMsg);
            });
    }

    lockJudge = async () => {
        let self = this;
        await postFetch('task/' + this.state.taskId + '/lock/', {})
            .then(function (response) {
                if (response.status === 200) {
                    toast.success(response.msg);
                    self.getTaskDetail();
                } else {
                    toast.error(response.msg);
                }
            })
            .catch(err => {
                toast.error(commonErrorMsg);
            });
    }



    render() {
        const { title, judge, description, submission_due_date, grade_due_date, questions, assing_to, is_randomized, is_judge_locked } = this.state;

        return (
            <DashboardTemplate title="Task View" pageId="task" loading={this.state.loading}>
                <div>
                    <div className="all-header clear">
                        <div className="row">
                            <div className="col-lg-12 mb-4">
                                <div className="card">
                                    <div className="card-body p-3 clearfix">
                                        <div className="float-left">
                                            <h5 className="font-family-open">{title}</h5>
                                            {description ? <p
                                                dangerouslySetInnerHTML={{
                                                    __html: Urlify(description)
                                                }}></p> : ''}
                                            <a data-toggle="collapse" href="#taskDetails">View Detail</a>
                                        </div>
                                        <div className="float-right">
                                            {this.getTaskStatus(submission_due_date, grade_due_date)}
                                            {this.state.UserType === 'admin' ?
                                                <div> <hr />
                                                    {assing_to === 'teams' ? is_randomized ? !is_judge_locked ? <button className="btn btn-md btn-primary text-center mr-2" onClick={() => this.randomizeJudgesAgain()}>Radomize judge again</button>
                                                        : <button className="btn btn-md btn-primary text-center mr-2" disabled><i className="fas fa-lock"></i>Judges locked</button> : <button className="btn btn-md btn-primary text-center mr-2" onClick={() => this.randomizeJudges()}>Begin randomize judges</button> : ''}
                                                    <button id="export" className="btn btn-md btn-success text-center mr-2" data-toggle="modal" data-target="#fileNameModal">Export Result</button>
                                                </div> : ''}
                                        </div>
                                    </div>
                                    <div id="taskDetails" className="collapse" data-parent="#accordion">
                                        <div className="card-body">
                                            <div className="grading-wrapper">
                                                <div className="clearfix mb-3">
                                                    <div className="float-left">
                                                        <p>
                                                            <strong className="text-dark">Submission due on : </strong>
                                                            <Moment format="ll">{moment(submission_due_date, 'YYYY-MM-DD hh:mm A')}</Moment> at <Moment format="hh:mm A">{moment(submission_due_date, 'YYYY-MM-DD hh:mm A')}</Moment>
                                                        </p>
                                                    </div>
                                                    <div className="float-right">
                                                        <p>
                                                            <strong className="text-dark">Grades Due On : </strong>
                                                            <Moment format="ll">{moment(grade_due_date, 'YYYY-MM-DD hh:mm A')}</Moment> at <Moment format="hh:mm A">{moment(grade_due_date, 'YYYY-MM-DD hh:mm A')}</Moment>
                                                        </p>
                                                    </div>
                                                </div>
                                                <h6>Grading questions/criteria</h6>
                                                <div className="grading-question-detail">
                                                    <table className="table table-striped">
                                                        <thead className="thead-light"><tr>
                                                            <th className="text-dark">Grading questions</th>
                                                            <th className="text-dark">Max Score</th>
                                                            <th className="text-dark">Allow feedback?</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                            {questions
                                                                ? questions.map((item, index) => {
                                                                    if (this.state.curruntTrack == item.track || item.track == null){
                                                                        return(
                                                                            <tr key={index}>
                                                                                <td><span>{item.question}</span></td>
                                                                                <td><span>{item.max_score}</span></td>
                                                                                <td><span className={`py-1 px-3 rounded-pill text-white ${item.feedback ? 'bg-info' : 'bg-danger'}`}>{item.feedback ? 'Allow' : 'Not Allow'}</span></td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                })
                                                                : ''}
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="view-result">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <h6>Search {assing_to === 'teams' ? 'team' : 'participant'}</h6>
                                    <input
                                        type="text"
                                        name="searchVal"
                                        value={this.state.searchVal}
                                        onChange={this.search}
                                        className="form-control height-size border-grey w-100" placeholder="Search"
                                        autoComplete="off"
                                    />
                                </div>

                            </div>
                        </div>
                        {assing_to === 'teams' ? <div className="ui pointing secondary menu">
                            {this.state.tracks.map((track, index) => (
                                <a key={index} className={`item ${this.state.curruntTrack === track.id ? 'active' : ''}`} onClick={(e) => this.getAllTeams(0, track.id)} >{track.track_name}</a>
                            ))}
                        </div> : ''}
                        <div className="card-body padding-40">
                            <div className="tab-content">
                                <div className="row">
                                    <div className="col-md-9">
                                        {assing_to === 'teams' ?
                                            <Card judges={this.state.dataList.judges} questions={questions} teamList={this.state.dataList.teams} callBack={(e) => this.getAllTeams()} type={assing_to} tracks={this.state.tracks}/> :
                                            <Card judges={this.state.dataList.judges} questions={questions} individualsList={this.state.dataList.individuals} callBack={(e) => this.getAllTeams()} type={assing_to} tracks={this.state.tracks}/>}
                                        <Pagination perPage={this.state.perPage} count={this.state.teamsCount} handlePageClick={this.onPageChangeAll} />
                                    </div>
                                    <div className="col-md-3 juges">
                                        <div className="card border border-secondary mb-3">
                                            <div className="card-head py-2 px-3 border-707070">
                                                <h6 className="m-0 text-333f52">Judge/Coach assigned</h6>
                                            </div>
                                            <div className="card-body px-3 py-0 list">
                                                {this.state.dataList.judges ? this.state.dataList.judges.length ? this.state.dataList.judges.map((user, index) => (
                                                    <div key={index} className="assigned-judge-list border-bottom border-secondary py-1 my-2">
                                                        <div className="clearfix">
                                                            <div className="judge-name float-left">
                                                                <span className="img-user">
                                                                    <img src={user.user_image ? user.user_image : profileLogo} alt="" className="img-fluid" onError={(event) => event.target.setAttribute("src", profileLogo)} />
                                                                </span>
                                                                <span className="mb-0 font-weight-light pl-3">{user.full_name}</span>
                                                            </div>
                                                            <div className="judge-action float-right">
                                                                <a onClick={() => this.reamoveJuge(user)} className="text-danger" >remove</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : <h5 className="text-center mt-5" >No Judge/Coach assigned to this track!</h5> : <Loading />}
                                            </div>
                                        </div>

                                        <div className="card border border-secondary">
                                            <div className="card-head py-2 px-3 border-707070">
                                                <h6 className="m-0 text-333f52">List of all Judge/Coach</h6>
                                            </div>
                                            <div className="card-body px-3 py-0 list">
                                                {judge ? judge.map((user, index) => (
                                                    <div key={index} className="assigned-judge-list border-bottom border-secondary py-1 my-2">
                                                        <div className="clearfix">
                                                            <div className="judge-name float-left">
                                                                <span className="img-user">
                                                                    <img src={user.user_image ? user.user_image : profileLogo} alt="" className="img-fluid" onError={(event) => event.target.setAttribute("src", profileLogo)} />
                                                                </span>
                                                                <span className="mb-0 font-weight-light pl-3">{user.full_name}</span>
                                                            </div>
                                                            <div className="judge-action float-right">
                                                                {this.getJudgeStatus(user)}

                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : <Loading />}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <FileName download={this.exportResult} />
            </DashboardTemplate>
        );
    }
}
