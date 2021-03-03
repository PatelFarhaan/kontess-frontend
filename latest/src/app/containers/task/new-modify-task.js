
import React /*{ Component }*/ from "react";
//import * as routes from "../../globals/endpoints";
import { toast } from 'react-toastify';
import { commonErrorMsg } from "../../../utils/Message";
import { postFetch, getFetch, /*postDelete*/ } from "../../../utils/fetchRequests";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import NewEvent from "../Activity/newEvent";
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Icon from "@material-ui/core/Icon";
import MomentUtils from '@date-io/moment';
import moment from "moment";
//import { async } from "q";

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            submissionDueOnDate: moment().local(),
            submissionDueOnTime: moment(),
            gradesDueOnDate: moment(),
            gradesDueOnTime: moment(),
            questions: [],
            event:"",
            eventList: [],
            tracks: [],
            currentTrack: "null",
            question_for_all: false,
            all_questions_valid: true,
            max_no_of_judge: 0,
            loding: false,
            assing_to: 'teams'
        };
        this.formHandler = this.formHandler.bind(this);
        this.change = this.change.bind(this);
    }

    componentWillMount = async () => {
        await this.addQuestions();
        await this.getTracks();
        let location = this.props.history.location.pathname;
        if (location.indexOf('modify-task') !== -1) {
            this.setState({
                taskId: this.props.match.params.taskId,
            }, () => {
                this.getTaskDetail();
            })
        } else {
            if (this.props.location.state) {
                this.setState({
                    title: this.props.location.state.title,
                    description: this.props.location.state.description,
                    submissionDueOnDate: moment(this.props.location.state.submissionDueOnDate, 'YYYY-MM-DD, h:mm:ss a'),
                    submissionDueOnTime: moment(this.props.location.state.submissionDueOnTime, 'YYYY-MM-DD, h:mm:ss a'),
                    submissionDueDate: true,
                    submissionDueTime: true
                })
            }
        }
        this.getAllEvents()
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
                        submissionDueOnDate: moment(resp.data.submission_due_date, 'YYYY-MM-DD, h:mm:ss a'),
                        submissionDueOnTime: moment(resp.data.submission_due_date, 'YYYY-MM-DD, h:mm:ss a'),
                        gradesDueOnDate: moment(resp.data.grade_due_date, 'YYYY-MM-DD, h:mm:ss a'),
                        gradesDueOnTime: moment(resp.data.grade_due_date, 'YYYY-MM-DD, h:mm:ss a'),
                        questions: resp.data.questions,
                        submissionDueDate: true,
                        submissionDueTime: true,
                        gradesDueDate: true,
                        gradesDueTime: true,
                        assing_to: resp.data.assing_to,
                        event: resp.data.event,
                        status: resp.data.status
                    });
                }
            })
            .catch(err => { });
    }

    /**function for get team tracks */
    getTracks = async () => {
        let self = this;
        await getFetch(`track/`).then((resp) => {
            if (resp.data) {
                let temp_tracks = []

                resp.data.forEach(function(value){
                    temp_tracks.push({"name":value.track_name, "id":value.id})
                })

                self.setState({
                    tracks: resp.data
                })
            }
        }).catch(err => { })
    }

    combineDateAndTime = async (date, time) => {
        date = moment(date, 'YYYY-MM-DD');
        time = moment(time, 'hh:mm:ss a');
        let timeString = time.hour() + ':' + time.minutes() + ':00';
        var year = date.year();
        var month = date.month() + 1; // Jan is 0, dec is 11
        var day = date.date();
        var dateString = '' + year + '-' + month + '-' + day;
        var combined = new Date(dateString + ' ' + timeString);
        combined = moment(combined).format('YYYY-MM-DD, h:mm:ss a');
        return combined;
    };

    submit = async (e) => {
        console.log("e", e)
        e.preventDefault();
        /*
        const { submissionDueDate, submissionDueTime, gradesDueDate, gradesDueTime } = this.state;
        var validation = `${
            !submissionDueDate
                ? 'Please select submission due date'
                : !submissionDueTime
                    ? 'Please select submission due time'
                    : !gradesDueDate
                        ? 'Please select grades due date'
                        : !gradesDueTime
                            ? 'Please select grades due time'
                            : true
            }`;
        */
       const { submissionDueOnDate, submissionDueOnTime, gradesDueOnDate, gradesDueOnTime} = this.state;
       /*
       var validation = `${
        !submissionDueOnDate
            ? 'Please select submission due date'
            : !submissionDueOnTime
                ? 'Please select submission due time'
                : !gradesDueOnDate
                    ? 'Please select grades due date'
                    : !gradesDueOnTime
                        ? 'Please select grades due time'
                        : true
        }`;
        */

        var validation = "true"
        if (validation === 'true') {
            let { title, description, submissionDueOnDate, submissionDueOnTime, gradesDueOnDate, gradesDueOnTime, questions, assing_to, status, event } = this.state;
            let submission_due_date = await this.combineDateAndTime(submissionDueOnDate, submissionDueOnTime);
            let grade_due_date = await this.combineDateAndTime(gradesDueOnDate, gradesDueOnTime);
            let self = this;
            /*
            if(moment(submission_due_date) < moment()){
                this.setState({
                    error: 'Submission due must be in the future'
                });
                return false;
            }
            if (submission_due_date >= grade_due_date) {
                this.setState({
                    error: 'grade due date must be greater than submission due date'
                })
                return false
            }
            */
           let valid_question = []
           let tracks_ids = {}
           questions.forEach(function(question, index){
            tracks_ids[question.track] =0
           })
           tracks_ids = Object.keys(tracks_ids)
           const null_index = tracks_ids.indexOf("null");
           let tracks_ids_2 = []
           tracks_ids.forEach(function(item){
            tracks_ids_2.push(item)
           })
           if (null_index > -1) {
            tracks_ids_2.splice(null_index, 1);
          }

          if (assing_to === "teams"){
           let all_questions_valid = true
           questions.forEach(function(question, index){
                if(self.state.question_for_all ===true){
                    if(question.track === "null"){
                        if (!question.max_score || !question.question){
                            all_questions_valid = false
                        }
                        valid_question.push(question)
                    }
                }else if(self.state.question_for_all ===false){

                    let condition_1 = tracks_ids.length === 1 && null_index !== -1 // Only Null values for questions
                    let condition_2 = tracks_ids_2.length > 0  // Only tracks with values for questions

                    if (condition_1 || condition_2){
                        let a = condition_1 && question.track === "null";
                        let b = condition_2 && question.track !== "null";
                        if(a || b){
                            if (!question.max_score || !question.question){
                                all_questions_valid = false
                            }
                            valid_question.push(question)
                        }
                    }
                }
           })
           questions = valid_question
           if (all_questions_valid === false){
                this.setState({
                    all_questions_valid: all_questions_valid
                })
                return
           }
           }
            this.setState({
                loading: true
            })
            let url = "task/";
            if (this.state.taskId) {
                url = "task/" + this.state.taskId + "/update/"
            }
            const data = { title, description, submission_due_date, grade_due_date, questions, assing_to, status, event};
            await postFetch(url, data)
                .then(function (response) {
                    self.setState({
                        loading: false
                    })
                    if (response.status === 200) {
                        toast.success(response.msg);
                        self.props.history.push("/dashboard/task");
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
        } else {
            this.setState({
                error: validation,
                loading: false
            })
        }

    }

    addQuestions = async () => {
        let newQue = {}
        newQue["track"] = this.state.currentTrack
        this.setState({
            questions: this.state.questions.concat(newQue)
        })
    }

    removeNode = (index) => {
        this.state.questions.splice(index, 1)
        this.setState({
            questions: this.state.questions
        })
    }
    gradingQuestions = (e, index, type) => {
        let temp = this.state.questions;
        temp[index][e.target.name] = type ? e.target.checked : e.target.value;
        temp[index]["track"] = this.state.currentTrack
        //this.state.questions[index][e.target.name] = type ? e.target.checked : e.target.value;
        this.setState({
            questions: temp
        })
    }
    formHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    setAssignTo(assing_to) {
        let questions = this.state.questions
        this.setState({
            assing_to: assing_to
        })
    }
    change(event) {
        this.setState({
            event: parseInt(event.target.value)
        })
    }
    checkForAllTrack(event){
        let question_for_all=event.target.checked
        let filtered_questions  = []
        let currentTrack = this.state.currentTrack;
        if (question_for_all){
            currentTrack = "null"
            this.state.questions.map(function(question){
                if (question.track=="null"){
                    filtered_questions.push(question)
                }
            })
        }else{
            filtered_questions = this.state.questions
        }

        this.setState({
            question_for_all:question_for_all,
            questions:filtered_questions,
            currentTrack:currentTrack
        })
    }
    changeTrack(event) {
        let select_value = event.target.value;
        let temp = this.state.questions;
        let currentTrack = this.state.currentTrack;
        let assing_to = this.state.assing_to;

        let is_track_question_present = false
        temp.forEach(function(value, index){
            if(value.track == select_value){ //  || value.track == 0
                is_track_question_present = true
                return
            }
        });
        let self = this

        this.setState({
            currentTrack: select_value
        },function(){
            if (is_track_question_present == false){
                self.addQuestions()
            }
        })
    }


    editEvent = (event) => {
        this.setState({ event })
    }

    getAllEvents = async (offset = 0) => {
        let self = this;
        self.setState({
          loading: true,
          eventList: [],
        });
        await getFetch(`event/zoom-events/?limit=0&offset=${offset}`)
          .then((resp) => {
            self.setState({
              loading: false,
            });
            if (resp.status === 200) {
              console.log(resp.data);
              self.setState({ eventList: resp.data, count: resp.count });
            } else {
              toast.error(commonErrorMsg);
            }
          })
          .catch((err) => {
            self.setState({
              loading: false,
            });
            toast.error(err);
          });
      };

    render() {
        const { questions, taskId } = this.state;
        const currentTrack = this.state.currentTrack
        const question_for_all = this.state.question_for_all
        let self = this
        return (
            <DashboardTemplate title={taskId ? 'Update task' : "Create task"} pageId="task" loading={this.state.loading}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div className="new-task-form">
                        <div className="card">
                            <div className="card-body p-5 clearfix"><form onSubmit={(e) => this.submit(e)}>
                                <div className="form-group">
                                    <h6 className="font-weight-bold">Task name </h6>
                                    <input type="text" className="form-control border-grey" onChange={this.formHandler} name="title" value={this.state.title} placeholder="required *" required />
                                </div>
                                <div className="form-group">
                                    <h6 className="font-weight-bold">Description </h6>
                                    <textarea className="form-control border  border-grey" name="description" value={this.state.description} onChange={this.formHandler} rows="5" placeholder="required *" required></textarea>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="font-weight-bold text-333f52 mr-4 mt-4">submission due on </h6>
                                                <KeyboardDatePicker
                                                    disablePast
                                                    minDateMessage={""}
                                                    autoOk={true}
                                                    format="MM/DD/YYYY"
                                                    variant="inline"
                                                    margin="normal"
                                                    id="date-picker-inline"
                                                    value={this.state.submissionDueOnDate}
                                                    onChange={(date) => this.setState({ submissionDueOnDate: date, submissionDueDate: true, error: '' })}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 text-center">
                                            <div className="d-flex">
                                                <h6 className="font-weight-bold text-333f52 mr-4 mt-4">at </h6>
                                                <KeyboardTimePicker
                                                    autoOk={true}
                                                    variant="inline"
                                                    margin="normal"
                                                    id="time-picker"
                                                    value={this.state.submissionDueOnTime}
                                                    onChange={(date) => this.setState({ submissionDueOnTime: date, submissionDueTime: true, error: '' })}
                                                    keyboardIcon={<Icon>schedule</Icon>}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="font-weight-bold text-333f52 mr-4 mt-4">grades due on </h6>
                                                <KeyboardDatePicker
                                                    format="MM/DD/YYYY"
                                                    disablePast
                                                    minDateMessage={""}
                                                    autoOk={true}
                                                    variant="inline"
                                                    margin="normal"
                                                    id="date-picker-inline"
                                                    value={this.state.gradesDueOnDate}
                                                    onChange={(date) => this.setState({ gradesDueOnDate: date, gradesDueDate: true, error: '' })}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 text-center">
                                            <div className="d-flex">
                                                <h6 className="font-weight-bold text-333f52 mr-4 mt-4">at </h6>
                                                <KeyboardTimePicker
                                                    autoOk={true}
                                                    variant="inline"
                                                    margin="normal"
                                                    id="time-picker"
                                                    value={this.state.gradesDueOnTime}
                                                    onChange={(date) => this.setState({ gradesDueOnTime: date, gradesDueTime: true, error: '' })}
                                                    keyboardIcon={<Icon>schedule</Icon>}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row mt-4">
                                        <div className="col-md-4">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="font-weight-bold text-333f52 mr-4 ">Assign to </h6>
                                                <div className="ui checked radio checkbox">
                                                    <input type="radio" disabled={taskId && this.state.status !== 'Draft' ? true : false} checked={this.state.assing_to === 'teams'} name="teams" onChange={(e) => this.setAssignTo('teams')} />
                                                    <label>Teams</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4 text-center">
                                            <div className="d-flex">
                                                <div className="ui checked radio checkbox" >
                                                    <input type="radio" disabled={taskId && this.state.status !== 'Draft' ? true : false} checked={this.state.assing_to === 'individuals'} name="individuals" onChange={(e) => this.setAssignTo('individuals')} />
                                                    <label>Individuals</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center gQ">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="control-label font-weight-bold text-333f52"> Link With Event <br/> Select Event with link </label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                        <select className="form-control" onChange={this.change} value={this.state.event}>
                                            <option>Select Event</option>
                                            {
                                                this.state.eventList.map((event, index) => (<option key={index} value={event.id}>{event.title}</option>))
                                            }
                                        </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <button
                                                onClick={() => this.editEvent("")}
                                                className="btn btn-md btn-primary btn-block w-100"
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#tasknewevent"
                                                > Create New Zoom Event
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.assing_to === 'teams'?
                                    <div className="row justify-content-center gQ">
                                        <div className="col-md-12 row mt-4">
                                            <label htmlFor="alltracks">
                                                <input type="checkbox" id="alltracks" defaultChecked={false} checked={this.state.question_for_all} onChange={(e) => this.checkForAllTrack(e)}/> Use same rubrics for all tracks
                                            </label>
                                        </div>
                                        <div className="col-md-12 row">
                                            <div className="col-md-4">
                                                <label htmlFor="track-select">Select track to assign grading rubric</label>
                                            </div>
                                            <div className="col-md-4">
                                                <select
                                                    value={this.state.currentTrack}
                                                    disabled={question_for_all ? "disabled" :""}
                                                    onChange={(e)=> self.changeTrack(e)}
                                                    className="form-control">
                                                        <option value={"null"} >Select Track</option>
                                                        {
                                                            this.state.tracks.map(
                                                                function(track, index){
                                                                    return(<option key={index} value={track.id}>{track.track_name}</option>)
                                                            }
                                                        )
                                                        }
                                                </select>
                                            </div>
                                            <div className="col-md-4"></div>
                                        </div>
                                    </div>
                                    :
                                    <div className="row justify-content-center gQ">
                                    </div>
                                }

                                {
                                    this.state.all_questions_valid==false
                                    ?
                                        <div className="row justify-content-center gQ error">
                                            One Or More question are incomplete
                                        </div>
                                    : null
                                }
                                <div className="row justify-content-center gQ">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label font-weight-bold text-333f52">Grading questions/criteria</label>
                                        </div>
                                    </div>
                                    <div className="col-md-3 text-center">
                                        <div className="form-group">
                                            <label className="control-label font-weight-bold text-333f52">Max Score</label>
                                        </div>
                                    </div>
                                    <div className="col-md-2 text-center">
                                        <div className="form-group">
                                            <label className="control-label font-weight-bold text-333f52">Allow feedback?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-1 text-center">
                                    </div>
                                </div>

                                {questions
                                    ? questions.map((item, index) => {
                                    if (item.track == undefined ||item.track==currentTrack){
                                        return(
                                        <div className="row justify-content-center gQ fadeInAnimation" key={index}>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input value={item.question} name="question" onChange={(e) => this.gradingQuestions(e, index)} type="text" placeholder="required *" className="form-control mx-1 border-grey mb-2" required />
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="form-group">
                                                    <input   value={item.max_score} min="0" max="10000" name="max_score" onChange={(e) => this.gradingQuestions(e, index)} type="number" placeholder="*" className="form-control mx-1 border-grey mb-2 w-25 mx-auto" required />
                                                </div>
                                            </div>
                                            <div className="col-md-2 text-center">
                                                <div className="form-group">
                                                    <div className="form-group custom-checkbox">
                                                        <input type="checkbox" id={`select` + index} name="feedback" defaultChecked={false} checked={item.feedback} onChange={(e) => this.gradingQuestions(e, index, 'checkBox')} />
                                                        <label className="bg-black" htmlFor={`select` + index}></label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-1 text-center">
                                                {index > 0 ? <i onClick={() => this.removeNode(index)} className="far fa-times-circle  fa-2x text-danger"></i> : ''}
                                            </div>
                                        </div>
                                        )
                                        }
                                    }
                                )
                                    : ''}
                                <div className="form-group ">
                                    <a onClick={() => this.addQuestions()} className="mon-med text-primary" ><i className=" fa fa-plus-circle  mr-2"></i> Add new line</a>
                                </div>
                                <p className="red">{this.state.error}</p>
                                <div className="save-button">
                                    <button type="submit" onClick={(e) => this.setState({ status: 'Publish' })} className="btn btn-success btn-block" value="Publish">{taskId && this.state.status !== 'Draft' ? 'Update' : "Save"}</button>
                                    {!this.state.taskId || this.state.status === 'Draft' ? <button type="submit" onClick={(e) => this.setState({ status: 'Draft' })} className="btn btn-sm btn-light border border-secondary btn-block text-center" value="Draft">Save Draft</button> : ''}
                                </div>
                            </form>
                            <NewEvent ModalId={"tasknewevent"} getAllEvents={this.getAllEvents} zoom_consent={"true"} > </NewEvent>
                            </div>
                        </div>
                    </div>
                </MuiPickersUtilsProvider>
            </DashboardTemplate >
        );
    }
}