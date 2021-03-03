
import React from "react";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import EventCalender from '../Activity/eventCalender';
import { getFetch, postFetchMutiPart } from '../../../utils/fetchRequests';
import Pagination from '../../components/pagination';
import Moment from 'react-moment';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { commonErrorMsg, submitFileMsg } from "../../../utils/Message";
import $ from 'jquery';
//import { Link } from 'react-router-dom';
import { Loading } from '../../globals/contants';
import { Urlify } from '../../globals/contants';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            perPage: 10,
            tasks: [],
            files: [],
        };
    }
    componentWillMount = async () => {
        await this.getTask();
    }

    // handle pagination
    handlePagination = (data) => {
        let self = this;
        let selected = data.selected;
        let offset = Math.ceil(selected * self.state.perPage);
        self.getTask(offset);
    }

    getTask = async (offset = 0) => {
        let self = this;
        this.setState({
            tasks: []
        })
        await getFetch('participant_task/?&limit=' + this.state.perPage + '&offset=' + offset)
            .then(resp => {
                if (resp.data) {
                    self.setState({
                        tasks: resp,
                        count: resp.count
                    }, () => {
                        $('.task-state .btn').on('click', function (e) {
                            e.stopPropagation();
                        });
                    });
                }
            })
            .catch(err => { });
    }

    getClass = (task) => {
        if (task.status === 'submit') {
            return 'text-success';
        } else {
            let submission_due_date = moment(task.task.submission_due_date, 'YYYY-MM-DD, h:mm:ss a');
            if (submission_due_date.diff(moment()) >= 0) {
                return 'text-danger-due'
            } else {
                return 'text-danger'
            }
        }
    }

    fileSelectedHandler = (e, id) => {
        this.setState({ files: [...this.state.files, ...e.target.files] })
        confirmAlert({
            title: 'Confirm',
            message: submitFileMsg,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.confirmUpload(id)
                },
                {
                    label: 'No',
                    onClick: () => this.setState({ files: [] })
                }
            ]
        });
    }

    confirmUpload = async (id) => {
        let self = this;
        const formData = new FormData()
        formData.append('status', 'submit')
        formData.append('submitted_date', moment().format('YYYY-MM-DD, h:mm:ss a'))
        this.state.files.forEach((file, i) => {
            formData.append('doc', file)
        })
        self.setState({
            loading: true
        })
        await postFetchMutiPart(`participant_task/${id}/update/`, formData).then((resp) => {
            self.setState({
                loading: false,
                files: []
            });
            if (resp.status === 200) {
                toast.success(resp.msg);
                self.getTask();

            } else {
                toast.error(commonErrorMsg);
            }
        }).catch(err => {
            self.setState({
                loading: false
            });
            toast.error(err);
        })
    }

    goToResults = (submitted_task_id) => {
        this.props.history.push({
            pathname: '/dashboard/result',
            state: {
                submitted_task_id: submitted_task_id
            }
        })
    }
    showOverAll = (task_grading) => {
        if (task_grading.length) {
            let result = 0;
            task_grading.forEach( item => {
                if (item.status === 'Publish') {
                    item.grades.forEach( grade => {
                        result = result + grade.score
                    });
                }
            });
            return <div> <h5 className="text-danger">Result Overall : {result}</h5></div>;
        }
    }

    getTaskQuestions(task, trackIds=null){
        let srNO = 0;
        if (trackIds == null){
            trackIds = []
            if (task.team != null && task.team.team_track){
                trackIds.push(task.team.team_track.id)
            }
        }
        
        let taskQuestionsArr = []
        task.task.questions.forEach(function(item, index){
            if (item.track == null || trackIds.indexOf(item.track) !== -1){
                srNO += 1
                taskQuestionsArr.push(
                    <li key={srNO} className="clearfix">
                        <h6 className="float-left">{srNO}. {item.question}</h6>
                        <h6 className="float-right">max score {item.max_score}</h6>
                    </li>
                )
            }
        })
        return taskQuestionsArr
    }

    render() {
        const { tasks } = this.state;
        return (
            <DashboardTemplate title="Task" pageId="task" loading={this.state.loading}>
                <div className="setting_container">
                    <div className="chat-container clearfix">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="accordion" id="accordionExample">
                                    {tasks.data ? tasks.data.length ? tasks.data.map((task, index) => (
                                        <div key={index} className={'comment-widgets no-hover border border-dark mb-0 ' + this.getClass(task)}>
                                            <div className="card-header border-0 bg-d7 p-2" id="headingOne">

                                                <div className={'d-block click-data collapsed '} data-toggle="collapse" data-target={"#collapseOne" + task.id} aria-expanded="false" aria-controls="collapseOne">
                                                    <div className="d-flex flex-row comment-row border-0 p-1">
                                                        <div className="tesk-detail w-100 border-0 ml-0 pl-0">
                                                            <div>
                                                                <h6 className="d-inline-block mb-0">{task.task.title}</h6>
                                                                <span className={`ml-2 badge badge-pill ${task.task.assing_to && task.task.assing_to === 'teams' ? 'badge-info' : 'badge-warning'}`} >{task.task.assing_to && task.task.assing_to === 'teams' ? '(Team - ' + task.team.name + ')' : '(Individual)'}</span>
                                                            </div>
                                                            <span className="text-line-clamp">description:<span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: Urlify(task.task.description)
                                                                }}
                                                            ></span></span>
                                                        </div>
                                                        <div className="task-state w-100 text-right mr-4">
                                                            Submission   due  <Moment format="lll">{moment(task.task.submission_due_date, 'YYYY-MM-DD hh:mm A')}</Moment>
                                                            <span className="submit-date d-block"> {task.status === 'submit' ? <div>Submitted on <Moment format="lll">{moment(task.submitted_docs[0].submitted_date, 'YYYY-MM-DD hh:mm A')}</Moment></div> : ''}</span>
                                                            {moment(task.task.submission_due_date, 'YYYY-MM-DD, h:mm:ss a') < moment() && moment() < moment(task.task.grade_due_date, 'YYYY-MM-DD, h:mm:ss a') && task.status === 'submit' ?
                                                                <h6 className="blink text-primary font-weight-bold">Now grading. Result will be released soon.</h6> : ''}
                                                            {task.task.release_score_to_participant ? this.showOverAll(task.task_grading) : ''}
                                                            {
                                                                task.task.event !== null
                                                                ?   <label className={`btn btn-md px-4 rounded-0  ${task.status === 'submit' ? 'btn-secondary' : 'btn-danger'}`} >
                                                                    Not Allowed
                                                                    </label>
                                                                :
                                                                    moment() < moment(task.task.submission_due_date, 'YYYY-MM-DD, h:mm:ss a')
                                                                    ?   <label htmlFor={"choose-logo" + task.id} className={`btn btn-md  px-4 rounded-0 ${task.status === 'submit' ? 'btn-success' : 'btn-primary'}`} >
                                                                            {task.status === 'submit' ? 'Resubmit' : 'Submit'}
                                                                        </label>
                                                                    :
                                                                        <label className={`btn btn-md px-4 rounded-0  ${task.status === 'submit' ? 'btn-secondary' : 'btn-danger'}`} >
                                                                            {task.status === 'submit' ? 'Submited' : 'Past due'}
                                                                        </label>}

                                                            <input id={"choose-logo" + task.id} multiple className="choose-file" name="" type="file" onChange={(e) => this.fileSelectedHandler(e, task.id)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id={"collapseOne" + task.id} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample" >
                                                <div className="card-body bg-white">
                                                    <h5 className="border-bottom pb-2 mb-3">Criteria</h5>
                                                    <ul className="list-unstyled criteria-list">
                                                        {
                                                            this.getTaskQuestions(task)
                                                        }
                                                    </ul>
                                                    {task.status === 'submit' ? <div>
                                                        <h6>submitted files
                                                        {task.submitted_docs.map((item, index) =>
                                                            <div key={index} className="mt-1">
                                                                {index + 1}.)  <a href={item.doc} download target="_blank" rel="noopener noreferrer">
                                                                    {item.doc.substring(item.doc.lastIndexOf('/') + 1)}
                                                                </a><br /></div>
                                                        )}
                                                        </h6>
                                                        {task.task.release_score_to_participant ? <a onClick={() => this.goToResults(task.id)} >
                                                            <span className="text-primary  pt-1 d-block font-weight-bold text-underline">View score detail  <i className="fas fa-eye"></i>
                                                            </span></a> : ''}</div> : ''}


                                                </div>
                                            </div>

                                        </div>
                                    )) : <h6 className="text-center">No task found!</h6> : <Loading />}
                                    <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} />
                                </div>
                            </div>
                            <div className="offset-lg-1 col-lg-4">
                                <EventCalender />


                            </div>

                        </div>

                    </div>
                </div>
            </DashboardTemplate>
        );
    }
}