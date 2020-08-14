
import React from "react";
import ParticipantDataService from "../../services/ParticipantDataService";



class TeamRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      essay: ""
    };

    this.formHandler = this.formHandler.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCreate(event) {
    ParticipantDataService.joinTeamRequest(this.props.teamId, this.state.essay)
      .then(result => {
        this.props.callback();
      })
      .catch(err => {
        if (err) {
          this.setState({ error: err.data });
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
        <label> Reason</label>
        <textarea
          maxLength="500"
          type="text"
          name="essay"
          value={this.state.essay}
          onChange={this.formHandler}
          placeholder="Why you want to join this team"
          required
        />
        <div className="characterLength">{this.state.essay.length}/500</div>
        <p className="red">{this.state.error}</p>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default TeamRequestForm;
