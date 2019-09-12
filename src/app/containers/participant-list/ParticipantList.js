import React from "react";

import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import ParticipantListTable from "../../components/tables/ParticipantListTable";
import ProfileModal from "../../components/profile-modal/ProfileModal";

import * as session from "../../../utils/session";

import "./style.scss";

export default class ParticipantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileModalIsOpen: false,
      profileId: -1,
      teams: [],
      nextUrl: "",
      previousUrl: "",
      maxPage: 0,
      page: 0
    };

    this.openProfileModal = this.openProfileModal.bind(this);
    this.closeProfileModal = this.closeProfileModal.bind(this);
  }

  openProfileModal(id) {
    this.setState({
      profileModalIsOpen: true,
      profileUserId: id
    });
  }

  closeProfileModal() {
    this.setState({
      profileModalIsOpen: false
    });
  }

  render() {
    return (
      <DashboardTemplate title="Dashboard" pageId="listParticipants">
        <div className="container">
          <div className="header"></div>
          {session.getUserType() == "Organizer" ? (
            <ParticipantListTable openProfileModal={this.openProfileModal} />
          ) : session.getUserType() == "Participant" ? (
            <ParticipantListTable openProfileModal={this.openProfileModal} />
          ) : (
            <> </>
          )}
          {this.state.profileModalIsOpen && (
            <ProfileModal
              role={"Participant"}
              userId={this.state.profileUserId}
              modelIsOpen={this.state.profileModalIsOpen}
              closeModal={this.closeProfileModal}
            />
          )}
        </div>
      </DashboardTemplate>
    );
  }
}
