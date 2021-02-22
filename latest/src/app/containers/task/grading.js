
import React from 'react';
//import * as session from '../../../utils/session';
import { getFetch, postFetch, downloadDoc } from '../../../utils/fetchRequests';
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import { toast } from 'react-toastify';
import { commonErrorMsg } from "../../../utils/Message";
//import { async } from 'q';

export default class Grading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participant_details:{}
        };
    }
    componentWillMount = () => {
        if (this.props.location.state) {
            this.getTaskDetail();

        } else {
            this.props.history.push("/dashboard/task")
        }
    }

    /**function for get task details */
    getTaskDetail = async () => {
        let self = this;
        await getFetch(`task/` + this.props.location.state.taskId + `/`)
            .then(resp => {
                if (resp.data) {
                    self.setState({
                        title: resp.data.title,
                        description: resp.data.description,
                        submission_due_date: resp.data.submission_due_date,
                        grade_due_date: resp.data.grade_due_date,
                        questions: resp.data.questions,
                        assing_to: resp.data.assing_to
                    }, () => {
                        if (this.props.location.state.gradeId) {
                            self.getGradingDetails(this.props.location.state.gradeId)
                        }
                        this.getTaskInstanceDetails();
                    });
                }
            })
            .catch(err => { });
    }

    /**function for get task instance details */
    getTaskInstanceDetails = async () => {
        let self = this;
        await getFetch(`participant_task/` + this.props.location.state.taskInstancId + `/`)
            .then(resp => {
                if (resp.data) {
                    self.setState({
                        taskTitle: self.state.assing_to === 'teams' ? resp.data.team.name : resp.data.participant.user.full_name,
                        track: self.state.assing_to === 'teams' ? resp.data.team.team_track.track_name : '',
                        submitted_docs: resp.data.submitted_docs,
                        participant_details:resp.data
                    })
                }
            })
            .catch(err => { });
    }
    downloadSubmission = async () => {
        let submission_docs = this.state.submitted_docs;
        for (var i = 0; i < submission_docs.length; i++) {
            if (submission_docs[i].doc) {
                await downloadDoc(submission_docs[i].doc, submission_docs[i].doc.substring(submission_docs[i].doc.lastIndexOf('/') + 1)).then((responseBody) => { }).catch(err => { })
            }
        }
    }
    getGradingDetails = async (id) => {
        let self = this;
        await getFetch('grading/' + id + '/')
            .then(resp => {
                if (resp) {
                    self.setState({
                        over_all_comments: resp.data.over_all_comments,
                        grades: resp.data.grades,
                        status: resp.data.status
                    }, () => {
                        self.state.grades.map(function (item, index) {
                            self.state.questions[index].score = item.score;
                            self.state.questions[index].comment = item.comment
                            self.setState({
                                questions: self.state.questions
                            })
                            return item;
                        })
                    });
                }
            })
            .catch(err => { });
    }

    submit = async (e) => {
        e.preventDefault();
        const { questions, status, assing_to, over_all_comments } = this.state;
        let data = {
            questions: questions,
            status: status,
            task_type: assing_to,
            id: this.props.location.state.id,
            over_all_comments: over_all_comments,
            submitted_task_id: this.props.location.state.taskInstancId
        }
        let self = this;
        let url = 'task/' + this.props.location.state.taskId + '/grading/';
        if (this.props.location.state.gradeId) {
            url = 'task/' + this.props.location.state.taskId + '/update-grading/?grade_id=' + this.props.location.state.gradeId;
        }
        await postFetch(url, data)
            .then(function (response) {
                self.setState({
                    loading: false
                })
                if (response.status === 200) {
                    toast.success(response.msg);
                    self.props.history.push("/dashboard/task-view/" + self.props.location.state.taskId);
                } else {
                    toast.error(response.msg);
                }
            })
            .catch(err => {
                self.setState({
                    loading: false
                })
                toast.error(commonErrorMsg);
            });

    }

    submitGrading = (e, index) => {
        let temp = this.state.questions;
        temp[index][e.target.name] = e.target.value;
        //this.state.questions[index][e.target.name] = e.target.value;
        this.setState({
            questions: temp
        });
    }

    formHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { title, questions, over_all_comments, taskTitle, track ,status} = this.state;
        const participant_details = this.state.participant_details;
        return (
            <DashboardTemplate title={"Now grading - " + title} pageId="task" loading={this.state.loading}>
                <div className="card">
                    <div className="card-body p-5 clearfix">
                        <div className="row">
                            <div className="col-md-3">
                                <h3>{taskTitle}</h3>
                                <a href="#">
                                    <span onClick={() => this.downloadSubmission()} className="text-primary  pt-1 d-block font-weight-bold">
                                        Download submission file  <i className="fas fa-download"></i>
                                    </span>
                                </a>
                            </div>
                            {track ? <div className="col-md-3">
                                <p>Track: {track}</p>
                            </div> : ""}
                        </div>
                        <form onSubmit={(e) => this.submit(e)}>
                            <div className="ques-area my-5">
                                <div className="row justify-content-between my-1">
                                    <div className="col-md-4">
                                        <p className="grade m-0 h6 text-blue font-weight-bold">Grading question/criteria</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="text-center m-0 h6 text-blue font-weight-bold">Score</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p className="m-0 text-center h6 text-blue font-weight-bold">Comment</p>
                                    </div>
                                </div>
                                {questions
                                    ? questions.map((item, index) => {
                                        let comment = questions[index].comment
                                        if (comment === undefined || comment=== null){
                                            comment = ""
                                        }
                                        if (participant_details.team !== undefined && (participant_details.team.team_track === "undefined" || participant_details.team.team_track.id === item.track)){
                                            return(
                                                <div className="row justify-content-between my-4" key={index}>
                                                    <div className="col-md-4">
                                                        <h6>{item.question}</h6>
                                                    </div>
                                                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                                                        <input name="score" value={questions[index].score} onChange={(e) => this.submitGrading(e, index)} type="number" min="0" max={item.max_score} className="form-control mx-1 border-grey w-25" required ={status === 'Publish'}/>
                                                        <p className="m-0 pl-2 text-blue font-weight-bold">out of {item.max_score}</p>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <input name="comment" value={comment} onChange={(e) => this.submitGrading(e, index)} type="text" autoComplete="off" className="form-control mx-1 border-grey" required={false}/*item.feedback && status === 'Publish' */ />
                                                    </div>
                                                </div>
                                            )}
                                        }
                                    )
                                    : ''}
                                <div className="row">
                                    <div className="col-md-12 my-3">
                                        <div className="form-group">
                                            <label className="h6 font-weight-bold text-blue" htmlFor="comment">Overall Comment</label>
                                            <textarea value={over_all_comments} onChange={this.formHandler} name="over_all_comments" className="form-control" rows="5" id="comment"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="button">
                                            <button type="submit" onClick={(e) => this.setState({ status: 'Publish' })} className="btn btn-sm btn-success btn-block text-center">{this.props.location.state.gradeId ? "update" : "Save"}</button>
                                            {!this.props.location.state.gradeId || this.state.status === 'Draft' ?
                                                <button type="submit" onClick={(e) => this.setState({ status: 'Draft' })} className="btn btn-sm btn-light border border-secondary btn-block text-center">Save and Return Later</button> : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardTemplate>
        );
    }
}
