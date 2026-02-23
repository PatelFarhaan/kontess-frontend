import React from "react";
import { commonErrorMsg, deleteEventkMsg } from "../../../utils/Message";
import * as routes from "../../../../src/app/globals/endpoints";
//import { single, double } from "../../globals/contants";
import { toast } from "react-toastify";
import { postFetch, postDelete, postFetchZoom } from "../../../utils/fetchRequests";
import { confirmAlert } from "react-confirm-alert";

import moment from "moment";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
export default class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      title: "",
      description: "",
      schedule_date: moment(new Date()).format("YYYY-MM-DD, h:mm:ss a"),
      date: new Date(),
      location: "",
      attendees: [],
      error: "",
      zoom_consent: null,
      return_url: "/dashboard/events",
      edit: false,
      responseFromZoom: {},
      start_url: "",
      ModalId: props.ModalId ? props.ModalId: "EVENTID",
      join_url: "",
    };
    this.submit = this.submit.bind(this);
  }

  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value, validation: "" });
  };

  componentDidMount(){
    let zoom_var = this.props.zoom_consent
    let ModalId = this.props.ModalId ? this.props.ModalId: "EVENTID"
    if (zoom_var){
      this.setState({
        zoom_consent:zoom_var,
        ModalId:ModalId,
      })
    }
    this.closeModal()
    // this.props.getAllEvents()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event) {
      this.setState(
        {
          title: nextProps.event.title,
          description: nextProps.event.description,
          start_url: nextProps.event.start_url,
          join_url: nextProps.event.join_url,
          schedule_date: moment(
            nextProps.event.schedule_date,
            "YYYY-MM-DD hh:mm A"
          ),
          date: moment(nextProps.event.schedule_date, "YYYY-MM-DD hh:mm A"),
          location: nextProps.event.location,
          id: nextProps.event.id ? nextProps.event.id : null ,
          attendees:nextProps.event.attendees
        }
        , () => {
        }
        // () => {
        //   if (document.getElementById("judges")){
        //     document.getElementById("judges").checked =
        //     nextProps.event.attendees === "both" ||
        //     nextProps.event.attendees === "judges"
        //       ? true
        //       : false;
        //     document.getElementById("participants").checked =
        //       nextProps.event.attendees === "both" ||
        //       nextProps.event.attendees === "participants"
        //         ? true
        //         : false;
        //   }
        // }
      );
     
    }
     else {
      if (nextProps.Create_date) {
        this.setState({
          date: nextProps.Create_date,
          schedule_date: nextProps.Create_date,
        });
      }
      this.setState({ id: null });
    }
  }
  selectDate = (value) => {
    value = new Date(value);
    let date = moment(value).format();
    this.setState({ schedule_date: date, date: value });
  };

  submit = (event) => {
    // var url = window.location.search;
    // url = url.replace("?", "");
    // let querystring = url.substring(5, url.length);
    let self = this;
    self.setState({ error: "" });
    event.preventDefault();
    // self.setAttendees();
    const {
      title,
      description,
      schedule_date,
      location,
      attendees,
    } = self.state;
    // const data = { title, description, schedule_date, location, attendees };
    let eventData = {
      "title":title,
      "description":description,
      "schedule_date":schedule_date,
      "location":location,
      "attendees":attendees
    };
    // const zoomData = {
    //   title,
    //   schedule_date,
    //   querystring,
    //   description,
    //   attendees,
    // };
    const zoomDataNew = {
      "topic": title,
      "duration": 60,
      "start_time": schedule_date
  }
    var validation = `${
      !title.trim()
        ? "Please enter event title"
        : !description.trim()
        ? "Please enter event description"
        : !schedule_date
        ? "Please select event date"
        : moment(schedule_date).isBefore(moment(new Date()))
        ? "Please select a future time"
        : !attendees
        ? "Please select event attendees"
        : true
    }`;
    if (validation === "true") {
      self.setState({
        loading: true,
      });

      let apiUrl = "event/";
      if (self.state.id) {
        apiUrl = "event/" + self.state.id + "/edit/";
      }
      // let apiUrlZoom = "";

      const zoom_consent = localStorage.getItem("Zoom")
      if ((self.state.zoom_consent === "true" || zoom_consent === "true") && !self.state.id){
        postFetchZoom(routes.zoomLambdaURL, zoomDataNew)
        .then(function (response) {

          console.info("response", response)
          console.info("response.data", response.data)
          let responseBodyZoom = response.data
          eventData["meeting_id"] = responseBodyZoom.id
          eventData["join_url"] = responseBodyZoom.join_url
          eventData["start_url"] = responseBodyZoom.start_url

          postFetch("event/", eventData)
          .then(function (response) {
            if (response && response.msg) {
              toast.success(response.msg);
              //self.closeModal();
              self.resetState();
              self.props.getAllEvents();
              self.resetEvent();
            } else {
              toast.error(commonErrorMsg);
            }
          })
          .catch((err) => {
            toast.error(commonErrorMsg);
          });

          // console.log("MAIN BODY RESPONSE FROM ZOOM", responseBodyZoom);
          self.setState({ responseFromZoom: responseBodyZoom });
          // console.log(
          //   "JOIN URL:",responseBodyZoom.join_url, "\n",
          //   "START URL",responseBodyZoom.start_url
          // );
          self.resetState();
          self.props.getAllEvents();
          self.resetEvent();
          return responseBodyZoom;
          })
          .catch(function (error) {
            console.log(error);
          });
      }else{
        postFetch(apiUrl, eventData)
        .then(function (response) {
          if (response && response.msg) {
            toast.success(response.msg);
            //self.closeModal();
            self.resetState();
            self.props.getAllEvents();
            self.resetEvent();
          } else {
            toast.error(commonErrorMsg);
          }
        })
        .catch((err) => {
          toast.error(commonErrorMsg);
        });
      }



    } else {
      self.setState({ error: validation });
    }
  };

  setAttendees = (e) => {
    let is_checked = e.target.checked
    let attendees_name = e.target.id
    let current_state = this.state.attendees
    if(is_checked === true){
      if (current_state !== attendees_name && current_state.length >0){
        this.setState({attendees: "both" });
      }else{
        this.setState({attendees: attendees_name });
      }
    }else{
      if (current_state === attendees_name && current_state.length >0){
        this.setState({attendees: "" });
      }else if(current_state !== attendees_name &&  current_state.length >0){
        if(attendees_name === "participants"){
          this.setState({attendees: "judges" });
        }else{
          this.setState({attendees: "participants" });
        }
      }
    }
    /*
    console.log('is_checked', is_checked)
    console.log('event', e)
    console.log('current_state', current_state)
    console.log('attendees_name', attendees_name)
    let checkedAttendees = document.querySelectorAll(
      ".attendees:checked"
    );
    if (checkedAttendees.length === single) {
      let value = checkedAttendees[0].value;
      this.setState({ attendees: value });
    } else if (checkedAttendees.length === double) {
      this.setState({ attendees: "both" });
    } else {
      this.setState({ attendees: "" });
    }
    */
  };

  resetState = async () => {
    this.setState({
      id: null,
      loading: false,
      title: "",
      description: "",
      schedule_date: moment(new Date()).format("YYYY-MM-DD hh:mm A"),
      date: new Date(),
      time: "",
      location: "",
      attendees: [],
      error: "",
      return_url: "/dashboard/events",
    });
    let x = document.getElementById("newEventForm");
    if (x){
      x.reset();
    }
    this.closeModal();
  };

  closeModal = async () => {
    var ModalId = "#"+this.state.ModalId
    console.log("Closing ModalId",ModalId)
    if (ModalId.length>1){
      window.$(ModalId).modal("hide");
    }
  };

  openModal = async () => {
    var ModalId = "#"+this.state.ModalId
    if (ModalId.length>1){
      window.$(ModalId).modal("show");
    }
  };
  resetEvent = async () => {
    if(this.props.resetEvent){
      this.props.resetEvent();
      this.closeModal();
    }
  };
  deleteEvent = () => {
    confirmAlert({
      title: "Confirm",
      message: deleteEventkMsg,
      buttons: [
        {
          label: "Yes",
          onClick: () => this.confirmDelete(),
        },
        {
          label: "No",
        },
      ],
    });
  };
  confirmDelete = async () => {
    let self = this;
    await postDelete(`event/` + self.state.id + `/`)
      .then((resp) => {
        if (resp.msg) {
          toast.success(resp.msg);
          //self.closeModal();
          self.resetState();
          self.props.getAllEvents();
          self.resetEvent();
        } else {
          toast.error(commonErrorMsg);
        }
      })
      .catch((err) => {});
  };

  render() {
    let zoom_consent = localStorage.getItem("Zoom")==="true" || this.state.zoom_consent === "true"
    return (
    <div>
      <div className="modal fade" id={this.state.ModalId}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {this.state.id ? "Update" : "Add New" } {zoom_consent==true?" Zoom ":""}Event
              </h5>
              <button type="button" className="close" id="close-new-event" onClick={this.resetState} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {/*this.state.error ? (
              <div className="modal-header">
                <h5 className="modal-title">{this.state.error}</h5>
              </div>
            ) : (
              ""
            )*/}
            <form onSubmit={this.submit} id="newEventForm">
              <div className="modal-body">
                <div className="new-task-form">
                  <div className="form-group">
                    <label className="control-label">Event Name</label>
                    <input
                      type="text"
                      className="form-control mx-1 bg-light"
                      placeholder="name *"
                      name="title"
                      value={this.state.title}
                      onChange={this.formHandler}
                      maxLength="50"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Select Date & Time</label>

                    <div className="col-md-12">
                      <DateTimePicker
                        variant="inline"
                        disablePast
                        value={this.state.date}
                        onChange={this.selectDate}
                      />
                    </div>
                  </div>
                  {zoom_consent == true ? (
                    ""
                  ) : (
                    <div className="form-group">
                      <label className="control-label">Location</label>
                      <input
                        type="text"
                        className="form-control mx-1 bg-light"
                        name="location"
                        value={this.state.location}
                        onChange={this.formHandler}
                        required
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <label className="control-label">Event Details</label>
                    <textarea
                      rows="6"
                      cols="7"
                      className="form-control mx-1 bg-light"
                      placeholder="description *"
                      name="description"
                      value={this.state.description}
                      maxLength="500"
                      onChange={this.formHandler}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label className="control-label d-block">Attendees</label>
                    <div className="custom-control custom-checkbox primary-checkbox custom-control-inline">
                      <input
                        type="checkbox"
                        value="judges"
                        name="attendees"
                        onClick={this.setAttendees}
                        checked={this.state.attendees==="both" || this.state.attendees==="judges"?true:false}
                        className="custom-control-input attendees"
                        id="judges"
                      />
                      <label className="custom-control-label c2 ml-2" htmlFor="judges">
                        Judge/Coach{" "}
                      </label>
                    </div>
                    <div className="custom-control custom-checkbox primary-checkbox custom-control-inline">
                      <input
                        type="checkbox"
                        value="participants"
                        onClick={this.setAttendees}
                        checked={this.state.attendees==="both" || this.state.attendees==="participants"?true:false}
                        className="custom-control-input attendees"
                        id="participants"
                        name="attendees"
                      />
                      <label
                        className="custom-control-label c2 ml-2"
                        htmlFor="participants"
                      >
                        Participant{" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <p className="red">{this.state.error}</p>
                {this.state.id ? (
                  <button
                    type="button"
                    onClick={() => this.deleteEvent()}
                    className="btn btn-danger"
                  >
                    Delete{" "}
                  </button>
                ) : (
                  ""
                )}
                <button type="submit" className="btn btn-primary">
                  Save changes{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </MuiPickersUtilsProvider>
      </div>
    </div>
    );
  }
}
