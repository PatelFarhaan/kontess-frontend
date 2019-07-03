import React from 'react';
import './style.scss';

import Dashboard from '../../components/dashboard/Dashboard';
import Activity from '../../components/activity/Activity';

import kontessLogoImg from 'assets/images/logo.png';
import dashboardIcon from 'assets/icons/dashboard.svg';
import activityIcon from 'assets/icons/activity.svg';
import myTeamIcon from 'assets/icons/myteam.svg';
import teamInfoIcon from 'assets/icons/teaminfo.svg';
import settingsIcon from 'assets/icons/settings.svg';
import dropDownMenuIcon from 'assets/icons/dropdown.svg';
import notificationIcon from 'assets/icons/notification.svg';

export default class Skeleton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {  // TODO: this is placeholder, maybe get this info from local storage
                id: 123456,
                name: 'Foo Bar',
                avatar: 'http://i.stack.imgur.com/Dj7eP.jpg'
            },
            notifications: [],
            hasUnreadMsg: false,
            pages: {
                'nav-dashboard-page': {name: 'Dashboard', content: <Dashboard />},
                'nav-activity-page': {name: 'Activity', content: <Activity />},
                'nav-my-team-page': {name: 'My Team', content: null},
                'nav-team-info-page': {name: 'Team Info', content: null},
                'nav-settings-page': {name: 'Settings', content: null}
            },
            currentPageId: 'nav-dashboard-page'
        };
    }

    switchPage(event, targetPageId) {
        if (targetPageId !== this.state.currentPageId) {
            document.getElementById(this.state.currentPageId).classList.remove('sidenav-button-active');
            this.setState({currentPageId: targetPageId});
            document.getElementById(targetPageId).classList.add('sidenav-button-active');
        }
        event.preventDefault();
    }

    updateNotification() {
        // TODO: making notification updated (long polling?)
    }

    render() {
        return (
            <div className="skeleton">
                <nav className="sidenav">
                    <img id="logo" src={kontessLogoImg} alt="Kontess Logo" />
                    <h3>Main Menu</h3>
                    <div>
                        <button
                            className="sidenav-button sidenav-button-active"
                            id="nav-dashboard-page"
                            onClick={(event) => { this.switchPage(event, 'nav-dashboard-page'); }}
                        >
                            <span className="icon-text-wrapper">
                                <img className="icon-img" src={dashboardIcon} alt="" />
                                <p>Dashboard</p>
                            </span>
                        </button>
                        <button
                            className="sidenav-button"
                            id="nav-activity-page"
                            onClick={(event) => { this.switchPage(event, 'nav-activity-page'); }}
                        >
                            <span className="icon-text-wrapper">
                                <img className="icon-img" src={activityIcon} alt="" />
                                <p>Activity</p>
                            </span>
                        </button>
                        <button
                            className="sidenav-button"
                            id="nav-my-team-page"
                            onClick={(event) => { this.switchPage(event, 'nav-my-team-page'); }}
                        >
                            <span className="icon-text-wrapper">
                                <img className="icon-img" src={myTeamIcon} alt="" />
                                <p>My Team</p>
                            </span>
                        </button>
                        <button
                            className="sidenav-button"
                            id="nav-team-info-page"
                            onClick={(event) => { this.switchPage(event, 'nav-team-info-page'); }}
                        >
                            <span className="icon-text-wrapper">
                                <img className="icon-img" src={teamInfoIcon} alt="" />
                                <p>Team Info</p>
                            </span>
                        </button>
                        <button
                            className="sidenav-button"
                            id="nav-settings-page"
                            onClick={(event) => { this.switchPage(event, 'nav-settings-page'); }}
                        >
                            <span className="icon-text-wrapper">
                                <img className="icon-img" src={settingsIcon} alt="" />
                                <p>Settings</p>
                            </span>
                        </button>
                    </div>
                </nav>
                <div>
                    {/* TODO: add menu for notificaions and user menu */}
                    <nav className="topnav">
                        <p id="page-title">{this.state.pages[this.state.currentPageId].name}</p>
                        <button id="notification-button">
                            <span className="icon-text-wrapper">
                                <img src={notificationIcon} alt="notification" />
                            </span>
                        </button>
                        <button id="user-name-avatar">
                            <span className="icon-text-wrapper">
                                <img id="avatar" src={this.state.currentUser.avatar} alt="" />
                                <p>{this.state.currentUser.name}</p>
                                <img className="icon-img" src={dropDownMenuIcon} alt="" />
                            </span>
                        </button>
                    </nav>
                    <main id="main-content">
                        {this.state.pages[this.state.currentPageId].content}
                    </main>
                </div>
            </div>
        );
    }
}
