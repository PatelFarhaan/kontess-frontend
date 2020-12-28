
import React from "react";
import * as routes from '../../globals/endpoints';
import { commonErrorMsg } from "../../../utils/Message";
import { toast } from 'react-toastify';
import { getFetch } from "../../../utils/fetchRequests";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import Pagination from '../../components/pagination';
import { profileLogo } from '../../globals/contants';
import Select from 'react-select';
import { Link } from 'react-router-dom';
export default class InviteMember extends React.Component {
    constructor(props) {
        super(props);
        const teamId = this.props.match.params.teamId;
        this.state = {
            loading: false,
            participantList: [],
            message: '',
            selectedParticipants: [],
            teamId: teamId,
            originalParticipants: [],
            perPage: 10,
            count: 0,
            searchVal: '',
            skillFilter: "",
            skilldata: [{ label: "All Participants", value: "" }],
        };
    }
    handleSortingBySkill = async (skill) => {
        this.setState({
            skillFilter: skill.value
        }, () => {
            this.getAllUsers('participant', 0, '', skill.value);
        })
    }
    getSkill = async () => {
        let self = this;
        await getFetch('user_skill/').then((resp) => {
            if (resp) {
                self.setState({
                    skilldata: this.state.skilldata.concat(resp.data)
                })
            }
        }).catch(err => { })
    }
    componentWillMount = async () => {
        this.getSkill();
        await this.getAllUsers("participant");
    }

    // handle pagination
    handlePagination = (data) => {
        let self = this;
        let selected = data.selected;
        let offset = Math.ceil(selected * self.state.perPage);
        self.getAllUsers("participant", offset, self.state.searchVal);
    }

    // search users (participants)
    searchPeople = (event) => {
        let value = event.target.value;
        let self = this;
        self.setState({
            loading: true,
            searchVal: value
        })
        self.getAllUsers("participant", 0, event.target.value, this.state.skillFilter);
    }

    getAllUsers = async (type, offset = 0, search = 0, skill = '') => {
        let self = this;
        self.setState({
            loading: true,
        })
        await getFetch(`user/?role=${type}&team_id=${self.state.teamId}&limit=${self.state.perPage}&offset=${offset}&name=${search ? search : ''}&skill=${skill}`).then((resp) => {
            self.setState({
                loading: false
            })
            if (resp.data) {
                let newParticipantArr = resp.data.map(item => ({ ...item, selected: false }));
                self.setState({ participantList: newParticipantArr, count: resp.count });
            } else {
                toast.error(commonErrorMsg);
            }
        }).catch(err => {
            self.setState({
                loading: false
            })
            toast.error(err);
        })
    }

    // Select or deselect participants
    selectParticipant = (value, index) => {
        let self = this;
        self.state.participantList[index].selected = !value.selected;
        self.forceUpdate();
        let memberIndex = self.state.selectedParticipants.length ? self.state.selectedParticipants.findIndex(item => item.id === value.id) : -1;
        // if member is already selected
        if (memberIndex >= 0) {
            // Deselect the member
            self.state.selectedParticipants.splice(memberIndex, 1);
            self.forceUpdate();
            // if member is not selected
        } else {
            // Select the member
            self.state.selectedParticipants.push(value);
            self.forceUpdate();
        }
    }

    // Send invitation to the participants 
    inviteMembers = async () => {
        let self = this;
        //Get the selected participants
        this.state.selectedParticipants.forEach(function (item) { delete item.selected });
        self.setState({ loading: true });
        let data = {
            "participants": this.state.selectedParticipants
        }
        await fetch(routes.baseURL + `team/${this.state.teamId}/send_invitation/`, {
            method: 'POST',
            headers: await routes.reqHeader(),
            body: JSON.stringify(data)
        }).then(function (response) {
            self.setState({
                loading: false,
                message: '',
                selectedParticipants: [],
            })
            return response.json();
        }).then(function (responseBody) {
            if (responseBody.status === 200 && responseBody.msg) {
                toast.success(responseBody.msg);
            } else {
                if (responseBody.msg) {
                    toast.error(responseBody.msg);
                } else {
                    toast.error(commonErrorMsg);
                }
            }
        }).then(async resp => {
            await this.getAllUsers("participant");
        })
            .catch(async error => {
                self.setState({
                    loading: false,
                    message: '',
                    selectedParticipants: [],
                })
                toast.error(commonErrorMsg);
                await this.getAllUsers("participant");
            });
    }

    render() {
        return (
            <DashboardTemplate title="Invite Team Members" pageId="team_info" loading={this.state.loading}>
                <div className="dashboard-grid">
                    <section className="dasboard-mid mt-2">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-2">
                                        <h4>{this.state.participantList.length ? 'Participants' : this.state.message}</h4>
                                    </div>
                                    {this.state.selectedParticipants.length ?
                                        <div className="col-md-3 text-right">
                                            <button className="btn btn-md btn-primary px-4 rounded-0" onClick={this.inviteMembers} >Invite Members</button>
                                        </div> : ''}
                                </div>
                            </div>
                        </div>
                        <div className="search-sec my-5 row justify-content-center align-items-center">
                            <div className="search col-md-4">
                                <div className="form-group ">
                                    <h6>Search Participants</h6>
                                    <input
                                        type="text"
                                        name="searchVal"
                                        value={this.state.searchVal}
                                        onChange={this.searchPeople}
                                        className="form-control height-size border-grey  w-100" placeholder="Search" />
                                </div>
                            </div>
                            <div className="search col-md-3">
                                <div className="form-group">
                                    <h6>Filter Participant</h6>
                                    <Select
                                        value={this.state.skillFromUser}
                                        onChange={this.handleSortingBySkill}
                                        options={this.state.skilldata}
                                    />
                                </div>
                            </div>
                        </div>
                        {this.state.participantList.length ? this.state.participantList.map((participant, index) =>
                            <div className="user-wrapper border-bottom" key={index}>
                                {
                                    participant.status !== 'accepted' ?
                                        <div className="card shadow-none my-3 border-0">
                                            <div className="card-body border-o">
                                                <div className="row justify-content-between align-items-center">
                                                    <div className="col-md-1 text-center">
                                                        <Link to={'/dashboard/profile/' + participant.id}><div className="inviteImg"><img src={participant.user_image ? participant.user_image : profileLogo} alt="profile logo"/></div></Link>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h4><Link to={'/dashboard/profile/' + participant.id}>{participant.full_name}</Link> </h4>
                                                        <p className="skills">
                                                            {participant.skill.map(skill => (
                                                                <span className="badge badge-pill badge-info">{skill.label}</span>
                                                            ))}
                                                        </p>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <p className="line-limit">{participant.biography}</p>
                                                    </div>
                                                    <div className="col-md-2 text-right">
                                                        {participant.status === 'pending' ? <span className="badge badge-info">Invitation Pending</span> : participant.status === 'rejected' ? <span className="badge badge-danger">Invitation Rejected</span> :
                                                            participant.status === 'accepted' ? <span className="badge badge-info">Invitation Accepted</span> :
                                                                ''}
                                                    </div>
                                                    <div className="col-md-2 text-center">
                                                        <button className="btn btn-md btn-primary px-4 rounded-0" onClick={() => this.selectParticipant(participant, index)} >{participant.selected ? "Selected" : "Select"}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : ''
                                }
                            </div>
                        ) : <h5 className="text-center padding15">No particepent  found!</h5>}
                        <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} />
                    </section>
                </div>
            </DashboardTemplate >
        );
    }
}
