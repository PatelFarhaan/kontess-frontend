import React from "react";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import Card from "./Card";
import NewEvent from "./newEvent";
import { commonErrorMsg, noResultFoundMsg } from "../../../utils/Message";
import { toast } from "react-toastify";
import { getFetch } from "../../../utils/fetchRequests";
import Pagination from "../../components/pagination";
import * as session from "../../../utils/session";
import Moment from "react-moment";
import EventCalender from "./eventCalender";

export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      zoomYes: false,
      perPage: 10,
      count: 0,
      eventList: [],
      date: new Date(),
      modalIsOpen: false,
      event: "",
      Create_date: "",
    };
  }
  componentDidMount = () => {
    localStorage.removeItem("Zoom")
    // if (localStorage.getItem("Zoom")) {
    //   document.getElementById("yesForZoom").checked = true;
    // }
  };

  componentWillMount = async () => {
    // Display all participants
    await this.getAllEvents();
    let UserType = await session.getUserType();
    this.setState({
      UserType: UserType,
    });
  };

  // handle pagination
  handlePagination = (data) => {
    let self = this;
    let selected = data.selected;
    let offset = Math.ceil(selected * self.state.perPage);
    self.getAllEvents(offset);
  };

  getAllEvents = async (offset = 0) => {
    let self = this;
    self.setState({
      loading: true,
      eventList: [],
    });
    await getFetch(`event?limit=${self.state.perPage}&offset=${offset}`)
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

  // Change calender date
  onChange = (date) => this.setState({ date });

  //open create task pop up
  openNewTaskPopUp = () => {
    this.setState({ modalIsOpen: true });
  };

  editEvent = (event) => {
    this.setState({ event });
  };
  createEvent = (Create_date) => {
    this.setState({ Create_date });
  };
  handleZoomAuth = (e) => {
    // console.log("checked", e.target.checked)
    if (e.target.checked === true) {
      this.setState({ zoomYes: true, zoomNo: false });
      localStorage.setItem("Zoom", true);
      // window.location.href =
      //   "https://zoom.us/oauth/authorize?response_type=code&client_id=YnD8mpmR7ykK_5KnuWB6A&redirect_uri=http%3A%2F%2F3.128.47.140%2Fkontess%2Fdashboard%2Fevents";
    } else this.setState({ zoomYes: false });
  };
  handleZoomNo = (e) => {
    // console.log("checked", e.target.checked)
    if (e.target.checked === true) {
      this.setState({ zoomNo: true, zoomYes: false});
      document.getElementById("yesForZoom").checked = false;
      localStorage.setItem("Zoom", false);
    } else this.setState({ zoomNo: false });
  };
  render() {

    return (
      <DashboardTemplate title="Events" pageId="events">
        <div className="dashboard-grid">
          <section className="dasboard-mid mt-2">
            <div className="row">
              <div className="col-lg-7 stretched_card mt-4">
                {session.getUserType() === "admin" ? (
                <div className="card addEvent">
                  <div className="card-header d-flex align-items-center">
                    <div className="col-md-8 pull-left">
                      <h4 className="mb-0 text-muted">Add an event</h4>
                    </div>
                    {session.getUserType() === "admin" && (this.state.zoomNo === true || this.state.zoomYes === true) ? (
                      <div className="col-md-4 pull-right">
                        <button
                          onClick={() => this.editEvent("")}
                          className="btn btn-md btn-primary btn-block w-100"
                          id="close-new-event"
                          data-toggle="modal"
                          data-target="#newevent"
                          data-backdrop="static"
                          data-keyboard="false"
                        >
                          New Event
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="card-header form-group">
                    <label className="col-md-8 pull-left control-label d-block">
                      Do you want a Zoom link for your event?
                    </label>
                    <div className="col-md-8 pull-left">
                      <div className="custom-control custom-checkbox primary-checkbox custom-control-inline">
                        <input
                          type="checkbox"
                          value="yesForZoom"
                          className="custom-control-input yesForZoom"
                          id="yesForZoom"
                          name="yesForZoom"
                          onChange={this.handleZoomAuth}
                          checked={(this.state.zoomYes) ? true : false}
                        />
                        <label
                          className="custom-control-label c2 ml-2"
                          for="yesForZoom"
                        >
                          Yes{" "}
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox primary-checkbox custom-control-inline">
                        <input
                          type="checkbox"
                          value="noForZoom"
                          className="custom-control-input attendees"
                          id="noForZoom"
                          name="noForZoom"
                          checked={(this.state.zoomNo) ? true : false}
                          onChange={this.handleZoomNo}
                        />
                        <label
                          className="custom-control-label c2 ml-2"
                          for="noForZoom"
                        >
                          No{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                </div> ) : "" }
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <div className="col-md-8 pull-left">
                      <h4 className="mb-0 text-muted">Upcoming Events</h4>
                    </div>
                  </div>
                  {this.state.eventList.length ? (
                    this.state.eventList.map((item, index) => (
                      <div
                        data-toggle="modal"
                        data-target="#newevent"
                        data-backdrop="static"
                        data-keyboard="false"
                        onClick={() => this.editEvent(item)}
                      >
                        <Card data={item} key={index} userType={session.getUserType()}></Card>
                      </div>
                    ))
                  ) : (
                    <div className="comment-widgets mb-3">
                      <div className="d-flex flex-row comment-row">
                        {noResultFoundMsg}
                      </div>
                    </div>
                  )}
                  <Pagination
                    perPage={this.state.perPage}
                    count={this.state.count}
                    handlePageClick={(ev) => this.handlePagination(ev)}
                  />
                </div>
              </div>
              <div className="offset-lg-1 col-lg-3 stretched_card mt-4">
                <div className="calendar-view">
                  <h4 className="mb-4 text-muted">
                    <Moment format="LL">{new Date()}</Moment>
                  </h4>
                  <EventCalender createEvent={this.createEvent} />
                </div>
              </div>
            </div>
          </section>
        </div>
        {this.state.UserType === "admin" ? (
          <div className="modal fade" id="newevent">
            <NewEvent
              getAllEvents={this.getAllEvents}
              event={this.state.event}
              Create_date={this.state.Create_date}
            ></NewEvent>
          </div>
        ) : (
          ""
        )}
      </DashboardTemplate>
    );
  }
}
