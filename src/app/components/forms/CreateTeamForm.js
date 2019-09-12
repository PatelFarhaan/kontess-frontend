import React from "react";

import teamService from "../../services/TeamService";

import "./style.scss";
import * as session from "../../../utils/session";

class CreateTeamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };

    this.formHandler = this.formHandler.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCreate(event) {
    teamService
      .create(this.state.name, this.state.description)
      .then(response => {
        if (session.getUserType() == "Participant") {
          teamService.joinTeam(response.data.id);
        }
      })
      .then(result => {
        this.props.callback();
      })
      .catch(err => {
        console.log(err);
        if (err) {
          this.setState({ error: err.data.name });
        } else {
          this.setState({
            error: "network error, please try again in a few minutes"
          });
        }
      });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleCreate}>
        <label> Team Name</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.formHandler}
          placeholder="Your Team Name"
          required
        />
        <label> Description</label>
        <textarea
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.formHandler}
          placeholder="Your description"
          required
        />
        <p className="red">{this.state.error}</p>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default CreateTeamForm;
