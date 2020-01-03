/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import * as routes from '../../globals/endpoints';
import { commonErrorMsg, inviteJudgeMsg, addJudgeMsg } from "../../../utils/Message";
import { toast } from 'react-toastify';
import { getFetch, postFetch } from '../../../utils/fetchRequests';
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import Pagination from '../../components/pagination';
import { profileLogo, Loading } from '../../globals/contants';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { async } from "q";
import { confirmAlert } from 'react-confirm-alert';
import * as session from '../../../utils/session';

export default class InviteMember extends React.Component {
    constructor(props) {
        super(props);
        const teamId = this.props.match.params.teamId;
        this.state = {
            loading: true,
            participantList: [],
            message: '',
            selectedParticipants: [],
            teamId: teamId,
            originalParticipants: [],
            perPage: 10,
            count: 0,
            searchVal: '',
            skillFilter: "",
            skilldata: [{ label: "All Judges", value: "" }],
        };
    }

    /**FUNCTION FOR SORT USER BY SKILLS */
    handleSortingBySkill = async (skill) => {
        this.setState({
            skillFilter: skill.value
        }, () => {
            this.getAllUsers('judge', 0, '', skill.value);
        })
    }

    /**GET SKILLS */
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
        let userType = await session.getUserType();
        this.setState({
            userType: userType
        })
        this.getSkill();
        await this.getAllUsers("judge");
    }

    // handle pagination
    handlePagination = (data) => {
        let self = this;
        let selected = data.selected;
        let offset = Math.ceil(selected * self.state.perPage);
        self.getAllUsers("judge", offset, self.state.searchVal);
    }

    // search users (participants)
    searchPeople = (event) => {
        let value = event.target.value;
        let self = this;
        self.setState({
            loading: true,
            searchVal: value
        })
        self.getAllUsers("judge", 0, event.target.value, this.state.skillFilter);
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

    sendInvitaion = async (judge, index) => {
        confirmAlert({
            title: 'Confirm',
            message: this.state.userType === 'admin' ? addJudgeMsg : inviteJudgeMsg,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.confirmInvitaion(judge)
                },
                {
                    label: 'No'
                }
            ]
        });
    }
    confirmInvitaion = async (judge) => {
        let self = this;
        let data = { "id": this.state.teamId, "judge_id": judge.id }
        let url = 'team/judge-invitation/';
        if (this.state.userType === 'admin') {
            url = 'team/' + this.state.teamId + '/admin-assing-team-judge/';
        }
        await postFetch(url, data)
            .then(function (resp) {
                if (resp.status === 200) {
                    toast.success(resp.msg);
                    self.props.history.push('/dashboard/team_view/' + self.state.teamId);
                } else {
                    toast.error(resp.msg);
                }
            })
            .catch(function (error) {
                toast.error(commonErrorMsg);
            });
    }

    render() {
        const { userType } = this.state;
        return (
            <DashboardTemplate title={userType === 'admin' ? 'Add Judge in Team' : 'Invite Judge For Team'} pageId="team_info">
                <div className="dashboard-grid">
                    <section className="dasboard-mid mt-2">
                        <div className="search-sec my-5 row justify-content-center align-items-center">
                            <div className="search col-md-4">
                                <div className="form-group ">
                                    <h6>Search Judge</h6>
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
                                    <h6>Filter Judge</h6>
                                    <Select
                                        value={this.state.skillFromUser}
                                        onChange={this.handleSortingBySkill}
                                        options={this.state.skilldata}
                                    />
                                </div>
                            </div>
                        </div>
                        {!this.state.loading ?
                            this.state.participantList.length ? this.state.participantList.map((participant, index) =>
                                <div className="user-wrapper border-bottom" key={index}>
                                    {
                                        participant.status !== 'accepted' ?
                                            <div className="card shadow-none my-3 border-0">
                                                <div className="card-body border-o">
                                                    <div className="row justify-content-between align-items-center">
                                                        <div className="col-md-1 text-center">
                                                            <Link to={'/dashboard/profile/' + participant.id}><div className="inviteImg"><img src={participant.user_image ? participant.user_image : profileLogo} /></div></Link>
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
                                                            {participant.judge_status === 'pending' ? <span className="badge badge-info">Invitation Pending</span> : participant.judge_status === 'rejected' ? <span className="badge badge-danger">Invitation Rejected</span> :
                                                                participant.judge_status === 'accepted' ? <span className="badge badge-info">Invitation Accepted</span> :
                                                                    ''}
                                                        </div>
                                                        <div className="col-md-2 text-center">
                                                            <button className="btn btn-md btn-primary px-4 rounded-0" onClick={() => this.sendInvitaion(participant, index)} > {userType === 'admin' ? 'Add Judge in Team' : 'Send Invitation'}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : ''
                                    }
                                </div>
                            ) : <h5 className="text-center padding15">No Judge  found!</h5> : <Loading />}
                        <Pagination perPage={this.state.perPage} count={this.state.count} handlePageClick={(ev) => this.handlePagination(ev)} />
                    </section>
                </div>
            </DashboardTemplate >
        );
    }
}
