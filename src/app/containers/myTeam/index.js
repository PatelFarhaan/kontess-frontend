/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React, { Children } from "react";
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import { getFetch } from "../../../utils/fetchRequests";
import { profileLogo, kontessLogo, Loading } from '../../globals/contants';
import firebase from '../../../firebase';
import moment from 'moment';
import Moment from 'react-moment';
import queryString from 'query-string';
import { animateScroll } from "react-scroll";
import * as session from "../../../utils/session";
import { Link } from 'react-router-dom';
let count = 0;
export default class MyTeam extends React.Component {
  constructor(props) {
    super(props);
    var d = new Date(),
      time = d.getHours() + ':' + (d.getMinutes() + 1);
    this.state = {
      userName: '',
      messages: [],
      list: [],
      time: time,
      userImg: '',
      userId: '',
      participants: '',
      myTeamList: '',
      chatWith: '',
      chatToken: ''
    };
  }

  componentWillMount = async () => {
    let self = this;
    await self.getAllUsers("admin");
    await self.getAllUsers('judge');
    await self.getAllUsers('participant');
    this.getMyTeams();
    let user = await JSON.parse(localStorage.getItem('user'))
    let img = user.user_image;
    if (user.username) {
      this.setState({
        'userName': user.username,
        'userImg': img,
        'userFullName': user.full_name,
        userType: user.role,
        userId: user.id
      }, () => {
        self.getUnreadMsgCount();
        let queryParams = queryString.parse(self.props.location.search);
        queryParams = JSON.parse(JSON.stringify(queryParams));
        let UID = queryParams.UID;
        if (UID) {
          self.getUserInfo(UID);
        }
      });
    }
  }

  componentDidMount = async () => {
    let self = this;
    let userId = await session.getSessionUserId();
    const messagesRef = firebase.ref('chat/');
    messagesRef.on("child_changed", function (snapshot) {
      if (snapshot.key.indexOf('_team_') == -1 && snapshot.key.indexOf('_' + userId + '_') != -1) {
        self.getUnreadMsg(snapshot.key);
      } else if (snapshot.key.indexOf('_team_') != -1) {
        self.getUnreadMsgTeam(snapshot.key);
      }
    });
  }

  componentWillUnmount = async () => {
    const messagesRef = firebase.ref('chat/');
    messagesRef.off();
  }

  getUnreadMsgCount = async () => {
    let userId = this.state.userId;
    const messagesRef = firebase.ref('chat/');
    let self = this;

    messagesRef.orderByKey().on('child_added', snapshot => {
      if (snapshot.key.indexOf('_team_') == -1 && snapshot.key.indexOf('_' + userId + '_') != -1) {
        self.getUnreadMsg(snapshot.key);
      } else if (snapshot.key.indexOf('_team_') != -1) {
        self.getUnreadMsgTeam(snapshot.key);
      }
    });

  }

  getUnreadMsgTeam = async (token) => {
    let userId = this.state.userId;
    count = 0;
    const messagesRef = firebase.ref('chat/' + token)
    messagesRef.on('child_added', snapshot => {
      if (snapshot.val().seenBy.indexOf('_' + userId + '_') == -1) {
        count++;
      }
    });
    this.setState({
      [token]: count != 0 ? count : null
    })
  }

  getUnreadMsg = async (token) => {
    let userId = this.state.userId;
    count = 0;
    const messagesRef = firebase.ref('chat/' + token)
    messagesRef.orderByChild("seen").equalTo(false).on('child_added', snapshot => {
      if (snapshot.val().userId != userId) {
        count++;
      }
    });
    this.setState({
      [token]: count != 0 ? count : null
    })
  }

  getUserInfo = async (userId) => {
    let self = this;
    await getFetch(`user/` + userId).then((resp) => {
      if (resp.data) {
        self.setState({
          chatWith: resp.data
        }, () => {
          this.activateMsgListener(resp.data, 'user');
        })
      }
    }).catch(err => {
      self.setState({
        loading: false
      })
    })
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  // get the list of users (admin/judge/participants)
  getAllUsers = async (type, offset = 0, search = 0) => {
    let data = {};
    let self = this;
    self.setState({
      loading: true,
    })
    await getFetch(`user/?role=${type}&limit=100&offset=${offset}&name=${search ? search : ''}`).then((resp) => {
      self.setState({
        loading: false
      })
      if (resp.data) {
        data[type] = resp.data;
        data[type].count = resp.count;
        self.setState(data);
      } else {
      }
    }).catch(err => {
      self.setState({
        loading: false
      })
    })
  }

  /**function for get My Teams */
  getMyTeams = async (offset = 0) => {
    let self = this;
    await getFetch('team/myteam/?limit=100&offset=0').then((responseBody) => {
      if (responseBody.status === 200) {
        self.setState({
          myTeamList: responseBody
        })
      } else {
        self.setState({
          loading: false,

        })
      }
    }).catch(err => { })

  }

  handleSend() {
    if (this.state.message && this.state.chatWith) {
      var newItem = {
        userId: this.state.userId,
        full_name: this.state.userFullName,
        message: this.state.message,
        timeStamp: new Date().getTime(),
        userImg: this.state.userImg,
        seen: false,
        team_token: this.state.team_token,
        seenBy: '_' + this.state.userId + '_'
      }
      firebase.ref('chat/' + this.state.chatToken).push(newItem);
      this.setState({ message: '' });
    }
  }

  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }

  getMessages(obj, type) {
    this.setState({
      chatWith: obj,
      messages: []
    }, () => {
      this.activateMsgListener(obj, type);
    })
  }

  activateMsgListener = (obj, type) => {

    let token;
    let team_token = '_';
    if (type != 'team') {
      token = '_' + (obj.id < this.state.userId ? obj.id : this.state.userId) + '_kontess_' + (obj.id < this.state.userId ? this.state.userId : obj.id) + '_';
    } else {
      token = '_kontess_team_' + (obj.id) + '_';
      obj.partipants.map((partipant) =>
        team_token = team_token + partipant.user.id + '_'
      );
    }
    let messagesRef = firebase.ref('chat/' + token)
    messagesRef.off();
    this.setState({
      chatToken: token,
      team_token: team_token
    })

    messagesRef = firebase.ref('chat/' + token)
      .orderByChild('timeStamp')
      .limitToLast(500);
    messagesRef.on('child_added', snapshot => {
      const message = { text: snapshot.val(), id: snapshot.key };
      this.setState(prevState => ({
        messages: [message, ...prevState.messages],
      }), () => {
        if (snapshot.val().userId != this.state.userId) {
          this.markAsUnreadMsg(token, snapshot.key);
        }
        this.scrollToBottom();
      });
    });
  }

  markAsUnreadMsg = async (token, key) => {
    const messagesRef = firebase.ref('chat/' + token + '/' + key)
    messagesRef.update({ seen: true });
    let seenBy;
    messagesRef.on('value', function (snap) { seenBy = snap.val().seenBy });
    if (seenBy.indexOf('_' + this.state.userId + '_') === -1) {
      seenBy = seenBy + this.state.userId + '_'
      messagesRef.update({ seenBy: seenBy });
    }
    this.getUnreadMsgCount();
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "chatContainer"
    });
  }

  checkUrl = (text) => {
    let data = false
    if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(text)) {
      data = true
    }
    return data;
  }

  validateUrl = (url) => {
    const validFirstBits = ["ftp://", "http://", "https://", "www."];
    const firstBitIsValid = validFirstBits.some(bit => url.indexOf(bit) === 0);
    if (!firstBitIsValid) {
      url = 'https://' + url;
    }
    return url;
  }

  render() {
    let { userImg, participant, userId, chatWith, myTeamList, judge, admin } = this.state;
    return (
      <DashboardTemplate title="Messages" pageId="my_team" >
        <div className="dashboard-grid">
          <div className="chat-container clearfix">
            <div className="row">
              <div className="col-md-9">
                <div className="chat bg-white">
                  {chatWith ? <div className="chat-header border-bottom p-3">
                    <div className="chat-about d-flex align-items-center">
                      <div className="img-user mr-3">
                        <img src={chatWith.logo ? chatWith.logo : chatWith.user_image ? chatWith.user_image : kontessLogo} alt="avatar" onError={(event) => event.target.setAttribute("src", profileLogo)} />
                      </div>
                      <h4>{chatWith.full_name ? chatWith.full_name : chatWith.name}</h4>
                    </div>
                  </div> : ''}
                  <div className="chat-history py-4 px-5" id="chatContainer">
                    {chatWith ?
                      <ul>
                        {this.state.messages.length ? this.state.messages.slice(0).reverse().map((message, index) =>
                          <li key={message.id} className="clearfix">
                            <div className={`message-data p-3 mb-4 ${message.text.userId === userId ? 'align-right in-right' : 'in-left'}`}>
                              {this.state.messages.slice(0).reverse()[index - 1] && this.state.messages.slice(0).reverse()[index - 1].text.userId === message.text.userId ? '' : <div className={`d-flex pb-3 ${message.text.userId === userId ? ' justify-content-end' : ''}`} >
                                <div className="img-user">
                                  <img src={message.text.userId === userId ? userImg ? userImg : profileLogo : chatWith.user_image ? chatWith.user_image : message.text.userImg ? message.text.userImg : profileLogo} alt="avatar" onError={(event) => event.target.setAttribute("src", profileLogo)} />
                                </div>
                                <div className="about ml-3">
                                  <span className="message-data-time"><Moment from={moment().format('YYYY-MM-DD HH:mm:ss')}>{message.text.timeStamp}</Moment></span> &nbsp; &nbsp;
                              <div className="name text-left">{message.text.full_name}</div>

                                </div>
                              </div>}
                              <div className="message">
                                {this.checkUrl(message.text.message) ? <a href={this.validateUrl(message.text.message)} target="_blank">{message.text.message}</a> : message.text.message}
                              </div>
                            </div>

                          </li>
                        ) : <h5 className="text-center">No messages found!!</h5>}
                      </ul> :
                      <div className="start-chat d-flex flex-column align-items-center justify-content-center">
                        <div className="message-view w-50">
                          <h4>Let's start chat..</h4>
                          Select any user or team and start conversation
                            </div>
                      </div>}
                  </div>
                  <div className="chat-message p-3">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text border-0"><i className="fas fa-plus-circle"></i></span>
                      </div>
                      <input type="text" className="form-control bg-gray border-left" placeholder="Message" value={this.state.message}
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)} />
                      <div className="input-group-append">
                        <button className="input-group-text border-0" onClick={this.handleSend.bind(this)}>Send</button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              <div className="col-md-3">
                <div className="people-list bg-white py-3 px-4">
                  <div className="list-group">
                    <div className="clearfix border-bottom pb-2 mb-3">
                      <div className="float-left"><h5 className="chat-user-list mb-0 border-bottom-0">My teams</h5></div>
                    </div>

                    <ul className="dflex mb-2 justify-content-center list chatUsersList flex-column">
                      {myTeamList.data ? myTeamList.data.map(team => (
                        <li className={`mb-2 ${this.state.chatWith.id === team.id ? 'active' : ''}`} onClick={(e) => this.getMessages(team, 'team')}>
                          <span className="img-user">
                            <img src={team.logo ? team.logo : kontessLogo} alt="" className="img-fluid" onError={(event) => event.target.setAttribute("src", kontessLogo)} />
                          </span>
                          <span className="chat-user-name pl-3">{team.name}</span>
                          <span className="badge badge-danger badge-custom float-right text-white mt-2">{this.state['_kontess_team_' + (team.id) + '_']}</span>
                        </li>
                      )) : <Loading />}
                    </ul>
                  </div>
                  {this.state.userType !== 'admin' ?
                    <div className="list-group">
                      <div className="clearfix border-bottom pb-2 mb-3">
                        <div className="float-left"><h5 className="chat-user-list mb-0 border-bottom-0">Admins</h5></div>
                      </div>
                      <ul className="dflex mb-2 justify-content-center list chatUsersList flex-column">
                        {admin ? admin.map(user => (
                          user.id != userId ?
                            <li className={`mb-2 ${this.state.chatWith.id === user.id ? 'active' : ''}`} onClick={(e) => this.getMessages(user, 'participant')}>
                              <span className="img-user">
                                <img src={user.user_image ? user.user_image : profileLogo} alt="" className="img-fluid" onError={(event) => event.target.setAttribute("src", profileLogo)} />
                              </span>
                              <span className="chat-user-name pl-3">{user.full_name}</span>
                              <span className="badge badge-danger badge-custom float-right text-white mt-2">{this.state['_' + (user.id < userId ? user.id : userId) + '_kontess_' + (user.id < userId ? userId : user.id) + '_']}</span>
                            </li> : ''
                        )) : <Loading />}
                      </ul>
                    </div> : ''}
                  <div className="list-group">
                    <div className="clearfix border-bottom pb-2 mb-3">
                      <div className="float-left"><h5 className="chat-user-list mb-0 border-bottom-0">Judges</h5></div>
                    </div>
                    <ul className="dflex mb-2 justify-content-center list chatUsersList flex-column">
                      {judge ? judge.map(user => (
                        user.id != userId ?
                          <li className={`mb-2 ${this.state.chatWith.id === user.id ? 'active' : ''}`} onClick={(e) => this.getMessages(user, 'participant')}>
                            <span className="img-user">
                              <img src={user.user_image ? user.user_image : profileLogo} alt="" className="img-fluid" onError={(event) => event.target.setAttribute("src", profileLogo)} />
                            </span>
                            <span className="chat-user-name pl-3">{user.full_name}</span>
                            <span className="badge badge-danger badge-custom float-right text-white mt-2">{this.state['_' + (user.id < userId ? user.id : userId) + '_kontess_' + (user.id < userId ? userId : user.id) + '_']}</span>
                          </li> : ''
                      )) : <Loading />}
                    </ul>
                  </div>
                  <div className="list-group">
                    <div className="clearfix border-bottom pb-2 mb-3">
                      <div className="float-left"><h5 className="chat-user-list mb-0 border-bottom-0">Other Participants</h5></div>
                    </div>
                    <ul className="dflex mb-2 justify-content-center list chatUsersList flex-column">
                      {participant ? participant.map(user => (
                        user.id != userId ?
                          <li className={`mb-2 ${this.state.chatWith.id === user.id ? 'active' : ''}`} onClick={(e) => this.getMessages(user, 'participant')}>
                            <span className="img-user">
                              <img src={user.user_image ? user.user_image : profileLogo} alt="" className="img-fluid" onError={(event) => event.target.setAttribute("src", profileLogo)} />
                            </span>
                            <span className="chat-user-name pl-3">{user.full_name}</span>
                            <span className="badge badge-danger badge-custom float-right text-white mt-2">{this.state['_' + (user.id < userId ? user.id : userId) + '_kontess_' + (user.id < userId ? userId : user.id) + '_']}</span>
                          </li> : ''
                      )) : <Loading />}
                    </ul>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </DashboardTemplate >
    );
  }
}
