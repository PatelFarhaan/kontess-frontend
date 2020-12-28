
import React from "react";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import { commonErrorMsg, AnnouncementValidation, AnnouncementTypeValidation } from "../../../utils/Message";
import { toast } from 'react-toastify';
import { getFetch, postFetch } from "../../../utils/fetchRequests";
import Card from "./Card";
import { announcement_type } from "../../globals/contants";
import AnnouncementCard from '../UserDashBoard/Card';
import UpcomingEvents from './upcoming-events';
import ManageRegistration from '../people/manageRegistration';
import { Link } from "react-router-dom";
import $ from 'jquery';
import { animateScroll } from "react-scroll";

export default class AdminDashboard extends React.Component {
  constructor(props) {
    let submission_card = {
      title: "Submission Status",
      data: {},
    }
    super(props);
    this.state = {
      submission_card: submission_card,
      userData: {},
      loading: false,
      announcement: {
        description: '',
        announcement_type: "every_one"
      },
      showAnnouncementOption: false
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentWillMount = async () => {
    await this.getTotalUsers();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // Change announcement discription
  changeValue = (ev) => {
    this.setAnnouncement("description", ev.target.value);
  }

  // show announcement options list
  showAnnouncementOptions = () => {
    this.setState({ showAnnouncementOption: !this.state.showAnnouncementOption });
  }

  // select the type of announcement
  selectAnnouncementOptions = (value) => {
    this.setAnnouncement("announcement_type", value);
    this.showAnnouncementOptions();
  }

  // set announcement in state
  setAnnouncement = (key, value) => {
    let data = {
      "announcement": {
        description: this.state.announcement.description,
        announcement_type: this.state.announcement.announcement_type
      }
    };
    data.announcement[key] = value;
    this.setState(data);
  }

  // save announcement
  submitAnnouncement = async (event) => {
    event.preventDefault();
    let self = this;
    let data = {
      description: self.state.announcement.description,
      announcement_type: self.state.announcement.announcement_type
    }
    let validation = `${!data.description.trim() ? AnnouncementValidation : !data.announcement_type ? AnnouncementTypeValidation : true}`;
    if (validation === 'true') {
      self.setState({
        loading: true
      });
      let url = 'announcement/'
      if (this.state.editAnnouncement) {
        url = `announcement/${this.state.idTOUpdate}/update/`
      }
      await postFetch(url, data).then((resp) => {
        self.setState({
          loading: false,
          announcement: {
            description: '',
            announcement_type: 'every_one',
          },
          editAnnouncement: false,
          refreshList: true
        }, () => {
          self.setState({
            refreshList: false
          })
        })
        toast.success(resp.msg);
      }).catch(err => {
        toast.error(err, {toastId: err});
      })
    } else {
      self.setState({
        loading: false,
      });
      toast.error(validation, {toastId: validation});
    }
  }

  // get user stats
  getTotalUsers = async () => {
    let self = this;
    self.setState({
      loading: true
    })
    await getFetch('user/listing/').then((resp) => {
      self.setState({
        loading: false
      })
      if (resp.data) {
        self.setState({ userData: resp.data }, () => {
          $('.count').each(function () {
            $(this).prop('Counter', 0).animate({
              Counter: $(this).text()
            }, {
              duration: 1000,
              easing: 'swing',
              step: function (now) {
                $(this).text(Math.ceil(now));
              }
            });
          });
        })
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

  // get the number
  getNumber = (value) => {
    return value ? value : 0;
  }

  editAnnouncement = async (id) => {
    this.scrollToBottom();
    let self = this;
    await getFetch(`announcement/` + id)
      .then(resp => {
        if (resp.status === 200) {
          self.setState({
            announcement: resp.data.announcement,
            editAnnouncement: true,
            idTOUpdate: id
          });
        }
      })
      .catch(err => { });

  }
  cancelUpdate = () => {
    this.setState({
      announcement: {
        description: '',
        announcement_type: 'every_one'
      },
      editAnnouncement: false,
    })
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "mainContainer"
    });
  }

  handleClickOutside(event) {
    if(!this.state.showAnnouncementOption)
      return;
    const target_class = $(event.target).attr('class');
    if(target_class && !target_class.includes('annoucement-option') && !target_class.includes('select-arrow') && !target_class.includes('fa fa-caret-down'))
      this.setState({ showAnnouncementOption: false });
  }

  render() {
    let { userData, editAnnouncement, refreshList } = this.state;
    return (
      <DashboardTemplate title="Administration DashBoard" pageId="home" loading={this.state.loading}>
        <div >
          <div className="dashboard-grid">
            <section className="dasboard-mid mt-2">
              <div className="row">
                <div className="col-lg-4">
                  <div className="row align-items-center mb-3">
                    <div className="col-md-12"><h6 className="mt-3 mb-1">Registration Status</h6></div>
                  </div>
                  <div className="card">
                    <div className="card-body p-3">
                      <h6 className="count font-family-open mb-4 d-inline-block">{this.getNumber(userData.judges_count + userData.organizer_count + userData.participant_count)}</h6> People Signed Up
                      <i data-toggle="modal" data-target="#manageRegistration" className="fas fa-cog float-right fa-lg"></i>
                      <ul className="mt-2 mb-4">
                        <li>
                          <h6 className="text-muted">
                            <strong className="count">{this.getNumber(userData.participant_count)}</strong><small> Participant{userData.participant_count > 1 ? 's' : ''}</small>
                          </h6>
                        </li>
                        <li className="ml-4">
                          <h6 className="text-muted">
                            <strong className="count">{this.getNumber(userData.participant_join_today)} </strong> <small>new today</small>
                          </h6>
                        </li>
                      </ul>
                      <ul className="mt-2 mb-4">
                        <li>
                          <h6 className="text-muted">
                            <strong className="count">{this.getNumber(userData.judges_count)} </strong> <small> Judge application{userData.judges_count > 1 ? 's' : ''}</small>
                          </h6>
                        </li>
                        <li className="ml-4">
                          <h6 className="text-muted">
                            <strong className="count">{this.getNumber(userData.judge_join_today)} </strong> <small> new today</small>
                          </h6>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <Card title={this.state.submission_card.title} />
                </div>
                <UpcomingEvents />
              </div>
              <br />
              <h5 >Past Announcements</h5>
              <hr />
              <AnnouncementCard title='Announcements' editAnnouncement={this.editAnnouncement} refreshList={refreshList}></AnnouncementCard>
              <hr />
              <div className="card">
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col-lg-12 mb-3">
                      <div className="card bg-gray">
                        <div className="card-header pl-2 p-3">
                          <h5 className="card_title mb-0">{editAnnouncement ? 'update' : 'Make an'} announcement</h5>
                        </div>
                        <div className="card-body p-0">
                          <form onSubmit={this.submitAnnouncement}>
                            <textarea className="form-control" cols="5" rows="7" placeholder="Type here announcement *" name='announcement'
                              value={this.state["announcement"].description}
                              onChange={this.changeValue}
                              required></textarea>

                            <div cl className="select-post dropdown float-right">

                              <button type="submit" className="btn btn-primary" >{editAnnouncement ? 'Update' : 'Post'}</button>
                              <div className="select-arrow" onClick={this.showAnnouncementOptions} ><i className="fa fa-caret-down" ></i>
                              </div>
                              {this.state.showAnnouncementOption ? <div className="dropdown-content" style={{minWidth: '201px'}}>
                                {announcement_type ? announcement_type.map((item, index) =>
                                  <a value={item.value} className={`${this.state.announcement.announcement_type === item.value ? "active annoucement-option" : 'annoucement-option'}`} key={index} onClick={(ev) => this.selectAnnouncementOptions(item.value)} href="/#">{item.description}</a>
                                ) : ''}
                              </div> : ''}
                            </div>
                            {editAnnouncement ? <button onClick={() => this.cancelUpdate()} className="select-post btn btn-danger float-right mt-1" >Cancel</button> : ''}
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="card bg-gray mb-3">
                        <div className="card-header pl-2 p-3">
                          <h5 className="card_title mb-0">
                            <a className="text-dark" data-toggle="modal" data-target="#newevent" id="close-new-event" href="/#">Add new event</a>
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="card bg-gray mb-3">
                        <div className="card-header pl-2 p-3">
                          <h5 className="card_title mb-0">
                            <Link className="text-dark" to={'/dashboard/create-task'} style={{ textDecoration: 'none' }} >
                              Create a task
                                            </Link>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div >
        <ManageRegistration />
      </DashboardTemplate >
    );
  }
}
