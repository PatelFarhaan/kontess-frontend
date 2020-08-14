
import React from "react";
import { Link } from "react-router-dom";
import * as routes from '../../globals/endpoints';
import { confirmAlert } from 'react-confirm-alert';
import { commonErrorMsg, noResultFoundMsg, deleteEventkMsg } from "../../../utils/Message";
import * as session from "../../../utils/session";
import { toast } from 'react-toastify';
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import Calendar from 'react-calendar';
import moment from 'moment';
import { postFetch, getFetch, postDelete } from "../../../utils/fetchRequests";
import { profileLogo } from '../../globals/contants';
import {
    DateTimePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

export default class JoinTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            message: '',
            confirm: 0,
            date: new Date(),
            teamInfo: '',
            selectedUsers: [],
            schedule_date: moment(new Date()).format('YYYY-MM-DD, h:mm:ss a'),
            team_id: this.props.match.params.teamId,
            eventId: '',
            pastEvent: false,
            minDate: new Date(),
            participants: [],
            inviteJudge: false
        };
        this.formHandler = this.formHandler.bind(this);
    }

    componentWillMount = async () => {
        let user_id = session.getSessionUserId();
        this.setState({
            user_id: user_id
        })
        this.getTeamInfo();
        let location = this.props.history.location.pathname;
        if (location.indexOf('edit') != -1) {
            this.setState({
                eventId: this.props.match.params.eventId,
            }, () => {
                this.getEventDetail();
            })
        }
    };

    getEventDetail = async () => {
        let self = this;
        await getFetch(`team_event/` + this.state.eventId + `/?team_id=` + this.state.team_id)
            .then(resp => {
                if (resp.data) {
                    self.setState({
                        title: resp.data.title,
                        location: resp.data.location,
                        schedule_date: moment(resp.data.schedule_date, 'YYYY-MM-DD hh:mm A'),
                        date: moment(resp.data.schedule_date, 'YYYY-MM-DD hh:mm A'),
                        minDate: moment(resp.data.schedule_date, 'YYYY-MM-DD hh:mm A') > moment() ? moment() : moment(resp.data.schedule_date, 'YYYY-MM-DD hh:mm A'),
                        pastEvent: moment(resp.data.schedule_date, 'YYYY-MM-DD hh:mm A') > moment() ? false : true,
                        participants: resp.data.partipants,
                        created_by: resp.data.created_by.id,
                        inviteJudge: resp.data.team_mentor ? true : false
                    });
                }
            })
            .catch(err => { });
    }

    onChange = date => this.setState({ date })

    handleCheckBox = (participant) => {
        this.setState({
            participants: this.participantIndex(participant.user.id) != -1 ? this.state.participants.filter((_, i) => i !== this.participantIndex(participant.user.id)) : this.state.participants.concat(participant)
        })
    }

    handleSelectAll = () => {
        this.setState({
            participants: this.state.participants.length ? [] : this.state.teamInfo.partipants
        })
    }

    formHandler(event) {
        this.setState({ [event.target.name]: event.target.value, error: '' });
    }

    selectDate = value => {
        value = new Date(value);
        let date = moment(value).format('YYYY-MM-DD, h:mm:ss a');
        this.setState({ schedule_date: date, date: value, error: '' });
    };

    participantIndex = (participantID) => {
        let index = -1;
        let participants = this.state.participants;
        if (participants.length) {
            participants.find(function (participant, i) {
                if (participant.user.id === participantID) {
                    index = i;
                }
            });
        }
        return index;
    }

    getTeamInfo = async () => {
        let self = this;
        await getFetch(`team/` + this.state.team_id)
            .then(resp => {
                if (resp.data) {
                    self.setState({
                        teamInfo: resp.data
                    });
                }
            })
            .catch(err => { });
    };

    validateFields = async () => {
        const { title, location, schedule_date, team_id, participants } = this.state;
        var validation = `${
            !title
                ? "Please enter event name"
                : !schedule_date
                    ? "Please select event date"
                    : !location
                        ? "Please enter event location"
                        : !participants.length
                            ? "Please select participants"
                            : true
            }`;
        return validation;
    }

    submit = async event => {
        let self = this;
        self.setState({ error: '' });
        event.preventDefault();
        const { title, location, schedule_date, team_id, participants, inviteJudge } = self.state;
        const data = { title, schedule_date, location, team_id, participants, inviteJudge };
        var validation = await this.validateFields();
        if (validation === "true") {
            self.setState({
                loading: true
            });
            await postFetch("team_event/", data)
                .then(function (response) {
                    self.setState({
                        loading: false
                    });
                    if (response && response.msg) {
                        toast.success(response.msg);
                        self.props.history.push("/dashboard/team_view/" + team_id);
                    } else {
                        toast.error(commonErrorMsg);
                    }
                })
                .catch(err => {
                    self.setState({
                        loading: false
                    });
                    toast.error(commonErrorMsg);
                });
        } else {
            self.setState({ error: validation });
        }
    };

    update = async event => {
        let self = this;
        self.setState({ error: '' });
        event.preventDefault();
        const { title, location, schedule_date, team_id, eventId, participants, inviteJudge } = self.state;
        const data = { title, schedule_date, location, team_id, participants, inviteJudge };
        var validation = await this.validateFields();
        if (validation === "true") {
            self.setState({
                loading: true
            });
            await postFetch("team_event/" + eventId + "/edit/", data)
                .then(function (response) {
                    self.setState({
                        loading: false
                    });
                    if (response && response.msg) {
                        toast.success(response.msg);
                        self.props.history.push("/dashboard/team_view/" + team_id);
                    } else {
                        toast.error(commonErrorMsg);
                    }
                })
                .catch(err => {
                    self.setState({
                        loading: false
                    });
                    toast.error(commonErrorMsg);
                });
        } else {
            self.setState({ error: validation });
        }
    };

    deleteEvent = () => {
        confirmAlert({
            title: 'Confirm',
            message: deleteEventkMsg,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.confirmDelete()
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    confirmDelete = async () => {
        let self = this;
        await postDelete(`team_event/` + this.state.eventId + `/`)
            .then(resp => {
                if (resp.msg) {
                    toast.success(resp.msg);
                    self.props.history.push("/dashboard/team_view/" + this.state.team_id);
                } else {
                    toast.error(commonErrorMsg);
                }
            })
            .catch(err => { });
    }
    handleCheckBoxJudge = async () => {
        this.setState({
            inviteJudge: !this.state.inviteJudge
        })
    }
    render() {
        const { teamInfo, user_id, eventId } = this.state;
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DashboardTemplate title={eventId ? "View Team Event" : "Create Team Event"} pageId="team_info" loading={this.state.loading}>
                    <div className="dashboard-grid">
                        <section className="dasboard-mid mt-2">
                            <div className="card">
                                <div className="card-body">

                                    <div className="p-3">
                                        <div className="row justify-content-between">

                                            <div className="col-md-6">
                                                <div className="mr-4">
                                                    <div className="form-sec">
                                                        <div className="form-group">
                                                            <div className="row">
                                                                <div className="col-md-2">
                                                                    <label className="control-label font-weight-bold">Event Name</label>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <input
                                                                        type="text"
                                                                        name="title"
                                                                        className="form-control"
                                                                        value={this.state.title}
                                                                        onChange={this.formHandler}
                                                                        placeholder="Event Name"
                                                                        required
                                                                        disabled={this.state.pastEvent}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="row">
                                                                <div className="col-md-2">
                                                                    <label className="control-label font-weight-bold">Location</label>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <input
                                                                        type="text"
                                                                        name="location"
                                                                        className="form-control"
                                                                        value={this.state.location}
                                                                        onChange={this.formHandler}
                                                                        placeholder="Location"
                                                                        disabled={this.state.pastEvent}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="row justify-content-center">
                                                                <div className="col-md-9">
                                                                    <div className="assigned-members d-flx justify-content-between align-items-center mb-3">
                                                                        <h5 className="d-inline-block">Invite Members</h5>
                                                                        <div className="custom-control custom-checkbox dark-checkbox ml-5 d-inline-block">
                                                                            <input type="checkbox" className="custom-control-input" id="customCheck1" onChange={(e) => this.handleSelectAll()} checked={this.state.participants.length === (teamInfo.partipants ? teamInfo.partipants.length : -1) ? true : false} />
                                                                            <label className="custom-control-label ml-2" htmlFor="customCheck1">Select all Members</label>
                                                                        </div>
                                                                    </div>
                                                                    <ul className="members-list list-group list-group-flush px-5">

                                                                        {teamInfo
                                                                            ? teamInfo.partipants.map((partipant, index) => (

                                                                                <li key={partipant.id} className="d-flex members-list-content list-group-item py-2 px-0 border-bottom">
                                                                                    <div className="checklist-left w-50">
                                                                                        <img
                                                                                            src={
                                                                                                partipant.user.user_image
                                                                                                    ? partipant.user.user_image
                                                                                                    : profileLogo
                                                                                            }
                                                                                            title={partipant.user.full_name}
                                                                                            className="mx-1 bg-dark rounded-circle"
                                                                                            onError={event =>
                                                                                                event.target.setAttribute('src', profileLogo)
                                                                                            }
                                                                                        />
                                                                                        <strong className="pr-5">{partipant.user.full_name}{user_id === partipant.user.id ? ' (You)' : ''}</strong>
                                                                                    </div>
                                                                                    <div className="custom-control custom-checkbox dark-checkbox ml-5 d-inline-block">
                                                                                        <input
                                                                                            onChange={(e) => this.handleCheckBox(partipant)} id={partipant.user.id} type="checkbox" className="custom-control-input" checked={this.participantIndex(partipant.user.id) != -1 ? true : false} />
                                                                                        <label className="custom-control-label" htmlFor={partipant.user.id}></label>
                                                                                    </div>
                                                                                </li>
                                                                            ))
                                                                            : ''}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {teamInfo && teamInfo.team_mentor.admin_status === 'approved' && teamInfo.team_mentor.judge_status === 'approved' ?
                                                            <div className="form-group">
                                                                <div className="row justify-content-center">
                                                                    <div className="col-md-9">
                                                                        <div className="assigned-members d-flx justify-content-between align-items-center mb-3">
                                                                            <h5 className="d-inline-block">Invite Judge/Coach</h5>
                                                                        </div>
                                                                        <ul className="members-list list-group list-group-flush px-5">
                                                                            <li key={teamInfo.team_mentor.id} className="d-flex members-list-content list-group-item py-2 px-0 border-bottom">
                                                                                <div className="checklist-left w-50">
                                                                                    <img
                                                                                        src={
                                                                                            teamInfo.team_mentor.user_image
                                                                                                ? teamInfo.team_mentor.user_image
                                                                                                : profileLogo
                                                                                        }
                                                                                        title={teamInfo.team_mentor.full_name}
                                                                                        className="mx-1 bg-dark rounded-circle"
                                                                                        onError={event =>
                                                                                            event.target.setAttribute('src', profileLogo)
                                                                                        }
                                                                                    />
                                                                                    <strong className="pr-5">{teamInfo.team_mentor.full_name}{user_id === teamInfo.team_mentor.id ? ' (You)' : ''}</strong>
                                                                                </div>
                                                                                <div className="custom-control custom-checkbox dark-checkbox ml-5 d-inline-block">
                                                                                    <input
                                                                                        onChange={(e) => this.handleCheckBoxJudge()} id={teamInfo.team_mentor.id} type="checkbox" checked={this.state.inviteJudge} className="custom-control-input" />
                                                                                    <label className="custom-control-label" htmlFor={teamInfo.team_mentor.id}></label>
                                                                                </div>
                                                                            </li>

                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div> : ''}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <h5>Select Date & Time</h5>
                                                <DateTimePicker variant="inline" disabled={this.state.pastEvent} minDate={this.state.minDate} value={this.state.date} onChange={this.selectDate} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row flex-columns justify-content-center">
                                            <div className="col-md-12">
                                                <span className="error">{this.state.error}</span>
                                                {this.state.eventId ? <div className="d-flex justify-content-center mb-2">
                                                    {!this.state.pastEvent ? this.state.created_by === user_id ?
                                                        <div><button className="btn btn-lg btn-success btn-lg text-center mr-2" onClick={this.update}>Update</button>
                                                            < button className="btn btn-lg btn-danger btn-lg text-center mr-2" onClick={() => this.deleteEvent()}>Delete</button>
                                                        </div> : ''
                                                        : ''
                                                    } <Link to={'/dashboard/team_view/' + this.state.team_id} className="btn btn-lg btn-primary text-center">
                                                        Back
                                                      </Link></div> :
                                                    <div className="d-flex justify-content-center mb-2"> <button className="btn btn-lg btn-success btn-lg text-center mr-2" onClick={this.submit} >Save</button><Link to={'/dashboard/team_view/' + this.state.team_id} className="btn btn-lg btn-primary text-center">
                                                        Cancel
                                              </Link></div>}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </DashboardTemplate >
            </MuiPickersUtilsProvider >

        );
    }
}
