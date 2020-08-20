import React from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
// import kontessLogoImg from "assets/images/logo_name_blue.png";

import * as session from "../../../utils/session";
import { confirmAlert } from "react-confirm-alert";
import firebase from "../../../firebase";
const pages = [
  {
    name: "Dashboard",
    iconPath: "fas fa-home",
    pageId: "home",
    authorized: ["admin", "participant", "judge"],
  },
  {
    name: "Teams",
    iconPath: "far fa-user",
    pageId: "team_info",
    authorized: ["admin", "participant", "judge"],
  },
  {
    name: "Manage Tracks",
    iconPath: "fas fa-link",
    pageId: "tracks",
    authorized: ["admin"],
  },
  {
    name: "Events",
    iconPath: "far fa-calendar-times",
    pageId: "events",
    authorized: ["admin", "participant", "judge"],
  },
  {
    name: "Judge/Coach Signup Requests",
    iconPath: "fas fa-user-plus",
    pageId: "pending-requests",
    authorized: ["admin"],
  },
  // {
  //   name: "Team Coach Approval",
  //   iconPath: 'fas fa-chalkboard-teacher',
  //   pageId: "pending-teams-approval",
  //   authorized: ['admin', 'judge']
  // },
  {
    name: "Manage People",
    iconPath: "far fa-id-badge",
    pageId: "people",
    authorized: ["admin"],
  },
  {
    name: "People",
    iconPath: "far fa-id-badge",
    pageId: "people",
    authorized: ["participant", "judge"],
  },
  {
    name: "Messages",
    iconPath: "far fa-comment-alt",
    pageId: "my_team",
    authorized: ["admin", "participant", "judge"],
  },
  {
    name: "Task",
    iconPath: "fas fa-tasks",
    pageId: "task",
    authorized: ["admin", "participant", "judge"],
  },
  {
    name: "Settings",
    iconPath: "fas fa-cog",
    pageId: "settings",
    authorized: ["admin", "participant", "judge"],
  },
];
let count = 0;
class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadMsg: 0,
    };
  }
  getButtons() {
    const buttons = pages.map((page) =>
      page.authorized && page.authorized.indexOf(this.state.UserType) != -1 ? (
        <li
          key={page.pageId}
          className={page.pageId === this.props.currentPageId ? "active" : ""}
          onClick={(event) => {
            this.switchPage(event, page.pageId);
          }}
        >
          <Link to="/" aria-expanded="true">
            <div className="car-categories-img d-inline-block sidebar-img">
              <i className={page.iconPath}></i>
            </div>
            <span>{page.name}</span>
            {page.pageId === "my_team" && this.state.unreadMsg ? (
              <div className="badge badge-danger badge-custom float-right text-white">
                {this.state.unreadMsg}
              </div>
            ) : (
              ""
            )}
          </Link>
        </li>
      ) : (
        ""
      )
    );
    return (
      <ul className="metismenu" id="menu">
        {" "}
        {buttons}
      </ul>
    );
  }
  componentWillMount = async () => {
    let sessionToken = await session.getSessionToken();
    if (!sessionToken) {
      this.confirmLogout();
      return false;
    }
    let UserType = await session.getUserType();
    this.setState({
      UserType: UserType,
    });
  };
  componentDidMount = async () => {
    this.activateMsgListener();
    const messagesRef = firebase.ref("chat/");
    let self = this;
    let userId = await session.getSessionUserId();
    messagesRef.on("child_changed", function (snapshot) {
      count = 0;
      if (
        snapshot.key.indexOf("_" + userId + "_") != -1 ||
        snapshot.key.indexOf("_team_") != -1
      ) {
        self.activateMsgListener();
      }
    });
  };

  componentWillUnmount = async () => {
    const messagesRef = firebase.ref("chat/");
    messagesRef.off();
  };

  activateMsgListener = async () => {
    const messagesRef = firebase.ref("chat/");
    let userId = await session.getSessionUserId();
    let self = this;
    count = 0;
    messagesRef.orderByKey().on("child_added", function (snapshot) {
      if (
        snapshot.key.indexOf("_team_") == -1 &&
        snapshot.key.indexOf("_" + userId + "_") != -1
      ) {
        self.getUnreadMsg(snapshot.key);
      } else if (snapshot.key.indexOf("_team_") != -1) {
        self.getUnreadMsgTeam(snapshot.key);
      }
    });
  };

  //function for get Unread Msg for team from firebase
  getUnreadMsgTeam = async (token) => {
    let userId = await session.getSessionUserId();
    const messagesRef = firebase.ref("chat/" + token);
    messagesRef.on("child_added", (snapshot) => {
      if (
        snapshot.val().seenBy.indexOf("_" + userId + "_") == -1 &&
        snapshot.val().team_token.indexOf("_" + userId + "_") !== -1
      ) {
        count++;
      }
    });
    this.setState(
      {
        unreadMsg: count,
      },
      () => {
        this.props.setMsgCount(this.state.unreadMsg);
      }
    );
  };

  //function for get Unread Msg from firebase
  getUnreadMsg = async (token) => {
    let userId = await session.getSessionUserId();
    const messagesRef = firebase.ref("chat/" + token);
    messagesRef
      .orderByChild("seen")
      .equalTo(false)
      .on("child_added", (snapshot) => {
        if (snapshot.val().userId != userId) {
          count++;
        }
      });
    this.setState(
      {
        unreadMsg: count,
      },
      () => {
        this.props.setMsgCount(this.state.unreadMsg);
      }
    );
  };
  switchPage(event, targetPageId) {
    // TODO: implement page switching
    this.props.history.push("/dashboard/");
    let self = this;
    setTimeout(function () {
      self.props.history.push("/dashboard/" + targetPageId);
    }, 1);
    event.preventDefault();
  }
  logout = () => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to log out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.confirmLogout(),
        },
        {
          label: "No",
        },
      ],
    });
  };
  confirmLogout = () => {
    session.clearSession();
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="sidebar-menu light-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <a>
              {/* <img className="logo" src={kontessLogoImg} alt="Kontess Logo" /> */}
            </a>
          </div>
        </div>
        <div className="main-menu">
          <div className="menu-inner" id="sidebar_menu">
            <nav>
              <h6 className="menu-header text-muted pb-3 mt-2 text-center">
                Main Menu
              </h6>
              {(() => this.getButtons())()}
              <ul className="metismenu">
                <li
                  onClick={(event) => {
                    this.logout();
                  }}
                >
                  <a aria-expanded="true">
                    <div className="car-categories-img d-inline-block sidebar-img">
                      <i className="fas fa-sign-out-alt"></i>
                    </div>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  currentPageId: PropTypes.string,
};

export default withRouter(SideNav);
