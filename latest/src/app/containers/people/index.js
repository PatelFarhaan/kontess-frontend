
import React from "react";
import { toast } from 'react-toastify';
import { commonErrorMsg } from "../../../utils/Message";
import { getFetch, postDelete, downloadDoc } from "../../../utils/fetchRequests";
import Pagination from '../../components/pagination'
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import Card from "./card";
import Select from 'react-select';
import * as session from "../../../utils/session";
import { profileLogo } from '../../globals/contants';
import Moment from 'react-moment';
import { async } from "q";
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import ManageRegistration from './manageRegistration';
import FileName from './fileName';
import {
    deleteUserMsg
} from '../../../utils/Message';
export default class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            participant: [],
            judge: [],
            admin: [],
            perPage: 5,
            searchVal: '',
            skillFilter: '',
            skilldata: [{ label: "All Participants", value: "" }],
        };
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

    handleSortingBySkill = async (skill) => {
        this.setState({
            skillFilter: skill.value
        }, () => {
            this.getAllUsers('participant', 0, '', skill.value);
        })
    }

    componentWillMount = async () => {
        let UserType = await session.getUserType();
        this.setState({
            UserType: UserType
        })
        let self = this;
        if (UserType !== 'admin') {
            await self.getAllUsers("admin");
            await self.getAllUsers('judge');
            await self.getAllUsers('participant');
        } else {
            this.setState({
                perPage: 10
            })
            await self.getAllUsers('all');
        }

        self.getSkill();
        self.setState({ showLoader: true });
    }

    // get the list of users (admin/judge/participants)
    getAllUsers = async (type, offset = 0, search = 0, skill = '') => {
        let data = {};
        let self = this;
        self.setState({
            loading: true,
            type: type
        })
        await getFetch(`user/?role=${type}&chat-list=true&limit=${self.state.perPage}&offset=${offset}&name=${search ? search : ''}&skill=${skill}`).then((resp) => {
            self.setState({
                loading: false
            })
            if (resp.data) {
                data[type] = resp.data;
                data[type].count = resp.count;
                self.setState(data);
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

    // handle pagination
    handlePagination = (data, type) => {
        let self = this;
        let selected = data.selected;
        let offset = Math.ceil(selected * self.state.perPage);
        self.getAllUsers(type, offset, self.state.searchVal);
    }

    // search users (admin/judge/participants)
    searchPeople = (event) => {
        let value = event.target.value;
        let self = this;
        self.setState({
            loading: false,
            searchVal: value
        })
        if (this.state.UserType !== 'admin') {
            self.getAllUsers("admin", 0, event.target.value);
            self.getAllUsers("judge", 0, event.target.value);
            self.getAllUsers("participant", 0, event.target.value, this.state.skillFilter);
        } else {
            self.getAllUsers(this.state.type, 0, event.target.value);
        }

    }

    deleteUser = async (id) => {
        confirmAlert({
            title: 'Confirm',
            message: deleteUserMsg,
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
    confirmDelete = async (id) => {
        let self = this;
        self.setState({
            loading: true
        })
        await postDelete(`user/${id}/delete-user/`).then((resp) => {
            self.setState({
                loading: false
            })
            if (resp.status === 200) {
                toast.success(resp.msg);
                self.getAllUsers('all');
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

    exportPeople = async (fileName) => {
        await getFetch(`user/export/`).then((resp) => {
            if (resp.status === 200) {
                downloadDoc(resp.data.csv_link, fileName + '.csv').then((responseBody) => { }).catch(err => { })
                document.getElementById("export").click();
            } else {
                toast.error(resp.msg);
            }
        }).catch(err => {
            toast.error(commonErrorMsg);
        })
    }
    render() {
        return (
            <div>
                <DashboardTemplate title="People" pageId="people" >
                    <div className="dashboard-grid">
                        <section className="dasboard-mid mt-2">
                            <div className="search-sec row justify-content-center align-items-end">
                                <div className="search col-md-4">
                                    <div className="form-group">
                                        <h6>Search People</h6>
                                        <input
                                            type="text"
                                            name="searchVal"
                                            value={this.state.searchVal}
                                            onChange={this.searchPeople}
                                            className="form-control height-size border-grey w-100" placeholder="Search"
                                        />
                                    </div>
                                </div>
                                <div className="Skill col-md-3">
                                    <div className="form-group">
                                        <h6>Filter Participant</h6>
                                        <Select
                                            value={this.state.skillFromUser}
                                            onChange={this.handleSortingBySkill}
                                            options={this.state.skilldata}
                                        />
                                    </div>
                                </div>
                                {this.state.UserType === 'admin' ?
                                    <div className="Skill col-md-4">
                                        <div className="form-group">
                                            <button className="btn btn-lg btn-primary btn-lg text-center mr-2" data-toggle="modal" data-target="#manageRegistration">Manage Registration</button>
                                            <button id="export" className="btn btn-lg btn-success btn-lg text-center mr-2" data-toggle="modal" data-target="#fileNameModal">Export People</button>
                                        </div>
                                    </div> : ''}
                            </div>
                            {this.state.UserType !== 'admin' ?
                                <div>
                                    <div className="user-wrapper border-bottom">
                                        <h4>Admin</h4>
                                        <Card data={this.state.admin} type="admin" />
                                        <Pagination perPage={this.state.perPage} count={this.state.admin.count} handlePageClick={(ev) => this.handlePagination(ev, `admin`)} />
                                    </div>
                                    <div className="user-wrapper border-bottom mt-10">
                                        <h4>Judge/Coach</h4>
                                        <Card data={this.state.judge} type="judge" />
                                        <Pagination perPage={this.state.perPage} count={this.state.judge.count} handlePageClick={(ev) => this.handlePagination(ev, `judge`)} />
                                    </div>
                                    <div className="user-wrapper border-bottom mt-10">
                                        <h4>Participants</h4>
                                        <Card data={this.state.participant} invite={true} type="participant" />
                                        <Pagination perPage={this.state.perPage} count={this.state.participant.count} handlePageClick={(ev) => this.handlePagination(ev, `participant`)} />
                                    </div>
                                    {!this.state.admin.length && !this.state.judge.length && !this.state.participant.length ?
                                        <div className="tab-pane fade active show"><h5 className="text-center">No result found!</h5></div>
                                        : ''}</div> : <div>
                                    <div className="ui pointing secondary menu">
                                        <a className={`item ${this.state.type === 'all' ? 'active' : ''}`} onClick={(e) => this.getAllUsers('all')}>All Users</a>
                                        <a className={`item ${this.state.type === 'participant' ? 'active' : ''}`} onClick={(e) => this.getAllUsers('participant')}>Participants</a>
                                        <a className={`item ${this.state.type === 'judge' ? 'active' : ''}`} onClick={(e) => this.getAllUsers('judge')}>Judge/Coach</a>
                                    </div>

                                    <div className="ui segment" style={{ 'min-height': '704px' }}>
                                        {this.state.loading ? <div className="ui active transition visible inverted dimmer">
                                            <div className="content"><div className="ui inverted text loader">Loading...</div></div>
                                        </div> : <div className="table-responsive">
                                                <table className="ui table">
                                                    <thead >
                                                        <tr>
                                                            <th >Name</th>
                                                            <th >Email</th>
                                                            <th >Teams</th>
                                                            <th >Role</th>
                                                            <th >SMU ID(Phone)</th>
                                                            <th >Pitch Name(School)</th>
                                                            <th>Citizenship(Major)</th>
                                                            <th>Use of funds(Affiliation)</th>
                                                            <th>Created on</th>
                                                            <th className="text-center">Action</th>
                                                        </tr>
                                                    </thead> <tbody>
                                                        {this.state[this.state.type] ? this.state[this.state.type].map((user, i) =>

                                                            <tr key={i}>
                                                                <td className="">
                                                                    <h4 className="ui image header">
                                                                        <img src={user.user_image ? user.user_image : profileLogo} />
                                                                        <div className="content">
                                                                            {user.full_name}
                                                                            <div className="sub header"><p className="skills">
                                                                                {user.skill.map(skill => (
                                                                                    <span className="badge badge-pill badge-info">{skill.label}</span>
                                                                                ))}
                                                                            </p></div>
                                                                        </div>
                                                                    </h4>
                                                                </td>
                                                                <td>{user.email}</td>
                                                                <td>{user.teams ? user.teams : ''}</td>
                                                                <td>{user.role}</td>
                                                                <td>{user.phone_number}</td>
                                                                <td>{user.school_name}</td>
                                                                <td>{user.major}</td>
                                                                <td>{/*user.affiliations && user.affiliations !== 'null' ? JSON.parse(user.affiliations).label : ''*/}
                                                                    {user.affiliations}</td>
                                                                <td> <Moment format="lll">{user.created_on}</Moment></td>
                                                                <td className="text-center pt-4">
                                                                    <Link
                                                                        to={'/dashboard/profile/' + user.id}
                                                                    >
                                                                        <i title="Edit" className="far fa-edit fa-lg "></i>

                                                                    </Link>
                                                                    <Link className="text-info"
                                                                        to={"/dashboard/my_team?UID=" + user.id}
                                                                    >
                                                                        <i title="Message" className="far fa-comment-alt fa-lg ml-2"></i>
                                                                    </Link>{user.role != 'admin' ? <i onClick={() => this.deleteUser(user.id)} title="Delete" className="fa fa-trash px-1 fa-lg ml-2"></i> : ''}</td>
                                                            </tr>) : ''}

                                                    </tbody> </table></div>}
                                    </div>


                                    <Pagination perPage={this.state.perPage} count={this.state[this.state.type] ? this.state[this.state.type].count : 0} handlePageClick={(ev) => this.handlePagination(ev, this.state.type)} />
                                </div>
                            }

                        </section>
                    </div>
                </DashboardTemplate>
                <ManageRegistration />
                <FileName download={this.exportPeople} />
            </div >

        );
    }
}