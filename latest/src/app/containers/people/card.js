
import React from 'react';
import { capitalize } from '../../../utils/commonFunctions';
import * as session from '../../../utils/session';
import Modal from 'react-modal';
import TeamInfo from '../team-info';
import { profileLogo, Loading } from '../../globals/contants';
import { Link } from 'react-router-dom';

export default class Card extends React.Component {
  constructor(props) {
    let user_id = session.getSessionUserId();
    super(props);
    this.state = {
      currentId: user_id,
      modalIsOpen: false,
      inviteUser: ''
    };
  }

  // Open modal to invite participants to team
  inviteToTeam = async userID => {
    this.setState({
      modalIsOpen: false,
      inviteUser: userID
    });
  };

  // close the modal
  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  }
  render() {
    return (
      <div>
        {this.props.data ? this.props.data.length ? this.props.data.map((user, i) => (
            <div className="people card shadow-none my-2 border-0" key={i}>
              <div className="card-body">
                <div className="row justify-content-between align-items-center">
                  <div className="col-md-1 text-center">
                    <Link to={'/dashboard/profile/' + user.id}><div className="inviteImg"><img src={user.user_image ? user.user_image : profileLogo} /></div></Link>
                  </div>
                  <div className="col-md-3">
                    <h5><Link to={'/dashboard/profile/' + user.id}>{capitalize(user.full_name ? user.full_name : user.username)}</Link> </h5>
                    <p className="skills">
                      {user.skill.map(skill => (
                        <span className="badge  badge-info">{skill.label}</span>
                      ))}
                    </p>
                  </div>
                  <div className="col-md-3">
                    <p className="line-limit">{user.biography}</p>
                  </div>
                  <div className="col-md-2">
                    <h5 className="text-muted text-center">{capitalize(user.role)}</h5>
                  </div>
                  <div className="col-md-3 text-right pr-5">
                    {this.state.currentId !== user.id ? <Link to={"/dashboard/my_team?UID=" + user.id} className="mr-1 btn btn-md btn-primary px-4 rounded-0">Message</Link> : ''}
                  </div>
                </div>
              </div>
            </div> 
        )) : <h5 className="text-center padding15">No {this.props.type} found!</h5> : <Loading />
        }
      </div>
    );
  }
}
