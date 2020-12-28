
import React from "react";
import { Link } from "react-router-dom"
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
//import * as routes from "../../globals/endpoints";
import * as session from "../../../utils/session";
import Pagination from '../../components/pagination'
import Card from "./Card";
import { getFetch } from "../../../utils/fetchRequests";

export default class TeamInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      teamList: [],
      myTeamList: [],
      ascending: '',
      curruntUserType: '',
      perPage: 10,
      serachVal: '',
      tracks: [],
      curruntTrack: ''
    };
  }

  // On component mount, get all teams and my teams
  componentWillMount = async () => {
    this.getAllTeams();
    this.getMyTeams();
    this.getTracks();
    let userType = await session.getUserType();
    this.setState({
      curruntUserType: userType
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
      }
    }).catch(err => { })
  }

  /**function for get My Teams */
  getMyTeams = async (offset = 0) => {
    let self = this;
    this.setState({
      myTeamList: []
    })
    await getFetch('team/myteam/?limit=' + this.state.perPage + '&offset=' + offset).then((responseBody) => {
      if (responseBody.status === 200) {
        self.setState({
          myTeamList: responseBody,
          myClassesCount: responseBody.count
        })
      } else {
        self.setState({
          loading: false
        })
      }
    }).catch(err => { })

  }

  /**function for get All Teams */
  getAllTeams = async (offset = 0, search = '', sortBy = '', track = '') => {
    let self = this;
    self.setState({
      loading: true,
      teamList: [],
      track:track?track:this.state.curruntTrack
    },()=>{
       getFetch('team/?name=' + search + '&sort_by=' + sortBy + '&track=' + this.state.track + '&limit=' + this.state.perPage + '&offset=' + offset).then((responseBody) => {
        if (responseBody.status === 200) {
          self.setState({
            curruntTrack: this.state.track,
            teamList: responseBody,
            loading: false,
            teamsCount: responseBody.count
          })
        } else {
          self.setState({
            loading: false
          })
        }
      }).catch(err => { })
    })
   
  }

  getInitialState = () => {
    return {
      value: 'select'
    }
  }
  change = (event) => {
    this.setState({ value: event.target.value });
    this.getAllTeams(0, this.state.serachVal, event.target.value);
  }
  onPageChangeAll = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage)
    this.getAllTeams(offset);
  }
  onPageChangeMy = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage)
    this.getMyTeams(offset);
  }
  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.getAllTeams(0, event.target.value);
  }
  render() {
    const { curruntUserType } = this.state;
    return (
      <DashboardTemplate title="Team Information" pageId="team_info">
        <div className="dashboard-grid">
          <section className="dasboard-mid mt-2">
            {curruntUserType !== 'admin' ? <div>
              <h4>My Teams</h4>
              <hr />
              <Card teamList={this.state.myTeamList.data} myTeam={true} callBack={(e) => this.getMyTeams()} />
              <Pagination perPage={this.state.perPage} count={this.state.myClassesCount} handlePageClick={this.onPageChangeMy} /> <hr /></div> : ''
            }
            <div className="search-sec my-5 row justify-content-around align-items-center">
              <div className="search col-md-4">
                <input
                  type="text"
                  name="serachVal"
                  value={this.state.serachVal}
                  onChange={(e) => this.formHandler(e)}
                  placeholder="Search"
                  className="form-control border-grey w-100"
                  required
                />
              </div>
              <div className="col-md-2">
                <div className="position-relative">
                  <select className="form-control" onChange={(e) => this.change(e)} value={this.state.sortBy}>
                    <option>sort by</option>
                    <option value="created_on">sort by datetime asc</option>
                    <option value="-created_on">sort by datetime desc</option>
                    <option value="name">sort by name A-Z</option>
                    <option value="-name">sort by name Z-A</option>
                  </select>
                  <div className="select-icon-absolute position-absolute">
                    <i className="fa fa-caret-down"></i>
                  </div>
                </div>
              </div>
              <div className="create_btn col-md-3">
                {curruntUserType === 'participant' ?
                  <Link to="/dashboard/team/">
                    <button className="btn btn-md btn-primary btn-block w-100">Create Team</button>
                  </Link>
                  : ''
                }
              </div>
            </div>
            <div>
              <div className="ui pointing secondary menu">
                <a href="/#" className={`item ${this.state.curruntTrack === '' ? 'active' : ''}`} onClick={(e) => this.getAllTeams()}>All Teams</a>
                {this.state.tracks.map(track => (
                  <a href="/#" className={`item ${this.state.curruntTrack === track.slug ? 'active' : ''}`} onClick={(e) => this.getAllTeams(0, '', '', track.slug)}>{track.track_name}</a>
                ))}
              </div>
              <div className="card-body padding-40">
                <div className="tab-content">
                  <Card teamList={this.state.teamList.data} myTeam={false} callBack={(e) => this.getAllTeams()} />
               <Pagination perPage={this.state.perPage} count={this.state.teamsCount} handlePageClick={this.onPageChangeAll} />
                </div>
              </div>
            </div>

          </section>
        </div>
      </DashboardTemplate>
    );
  }
}
