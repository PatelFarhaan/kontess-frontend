/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import { commonErrorMsg, deleteEventkMsg } from "../../../utils/Message";
import { single, double } from "../../globals/contants";
import { toast } from "react-toastify";
import { postFetch, postDelete } from "../../../utils/fetchRequests";
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
      return_url: "/dashboard/events",
      edit: false,
    };
  }

  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value, validation: "" });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.event) {
      this.setState(
        {
          title: nextProps.event.title,
          description: nextProps.event.description,
          schedule_date: moment(
            nextProps.event.schedule_date,
            "YYYY-MM-DD HH:mm A"
          ),
          date: moment(nextProps.event.schedule_date, "YYYY-MM-DD HH:mm A"),
          location: nextProps.event.location,
          id: nextProps.event.id ? nextProps.event.id : null,
        },
        () => {
          document.getElementById("judges").checked =
            nextProps.event.attendees === "both" ||
            nextProps.event.attendees === "judges"
              ? true
              : false;
          document.getElementById("participants").checked =
            nextProps.event.attendees === "both" ||
            nextProps.event.attendees === "participants"
              ? true
              : false;
        }
      );
    } else {
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
    let date = moment(value).format("YYYY-MM-DD, h:mm:ss a");
    this.setState({ schedule_date: date, date: value });
  };

  submit = async (event) => {
    let self = this;
    self.setState({ error: "" });
    event.preventDefault();
    await self.setAttendees();
    const {
      title,
      description,
      schedule_date,
      location,
      attendees,
    } = self.state;
    const data = { title, description, schedule_date, location, attendees };
    console.log(data);
    var validation = `${
      !title
        ? "Please enter event title"
        : !description
        ? "Please enter event description"
        : !schedule_date
        ? "Please select event date"
        : !location
        ? "Please enter event location"
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
      await postFetch(apiUrl, data)
        .then(function (response) {
          if (response && response.msg) {
            toast.success(response.msg);
            self.closeModal();
            self.props.getAllEvents();
          } else {
            toast.error(commonErrorMsg);
          }
        })
        .catch((err) => {
          toast.error(commonErrorMsg);
        });
    } else {
      self.setState({ error: validation });
    }
  };

  setAttendees = async () => {
    let checkedAttendees = await document.querySelectorAll(
      ".attendees:checked"
    );
    if (checkedAttendees.length === single) {
      let value = await checkedAttendees[0].value;
      this.setState({ attendees: value });
    } else if (checkedAttendees.length === double) {
      this.setState({ attendees: "both" });
    } else {
      this.setState({ attendees: "" });
    }
  };

  resetState = async () => {
    this.setState({
      loading: false,
      title: "",
      description: "",
      schedule_date: "",
      time: "",
      location: "",
      attendees: [],
      error: "",
      return_url: "/dashboard/events",
    });
    await document.getElementById("newEventForm").reset();
    await this.closeModal();
  };

  closeModal = async () => {
    await document.getElementById("close-new-event").click();
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
          this.closeModal();
          self.props.getAllEvents();
        } else {
          toast.error(commonErrorMsg);
        }
      })
      .catch((err) => {});
  };

  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {this.state.id ? "Update" : "Add new"} event
              </h5>
              <button type="button" className="close" onClick={this.resetState}>
                <span>&times;</span>
              </button>
            </div>
            {this.state.error ? (
              <div className="modal-header">
                <h5 className="modal-title">{this.state.error}</h5>
              </div>
            ) : (
              ""
            )}
            <form onSubmit={this.submit} id="newEventForm">
              <div className="modal-body">
                <div className="new-task-form">
                  <div className="form-group">
                    <label className="control-label">Event Name</label>
                    <input
                      type="text"
                      className="form-control mx-1 bg-light"
                      name="title"
                      value={this.state.title}
                      onChange={this.formHandler}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="control-label">Date</label>

                    <div className="col-md-12">
                      <DateTimePicker
                        variant="inline"
                        disablePast
                        value={this.state.date}
                        onChange={this.selectDate}
                      />
                    </div>
                  </div>
                  {localStorage.getItem("Zoom") ? (
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
                    <label className="control-label">Event detail</label>
                    <textarea
                      rows="6"
                      cols="7"
                      className="form-control mx-1 bg-light"
                      placeholder="description"
                      name="description"
                      value={this.state.description}
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
                        className="custom-control-input attendees"
                        id="judges"
                      />
                      <label
                        className="custom-control-label c2 ml-2"
                        for="judges"
                      >
                        Judges{" "}
                      </label>
                    </div>
                    <div className="custom-control custom-checkbox primary-checkbox custom-control-inline">
                      <input
                        type="checkbox"
                        value="participants"
                        className="custom-control-input attendees"
                        id="participants"
                        name="attendees"
                      />
                      <label
                        className="custom-control-label c2 ml-2"
                        for="participants"
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
    );
  }
}
