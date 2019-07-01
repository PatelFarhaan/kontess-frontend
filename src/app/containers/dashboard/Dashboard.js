import React from 'react';
import './style.scss';

import kontessLogoImg from 'assets/images/logo.png';
import dashboardIcon from 'assets/icons/dashboard.svg';
import activityIcon from 'assets/icons/activity.svg';
import myTeamIcon from 'assets/icons/myteam.svg';
import teamInfoIcon from 'assets/icons/teaminfo.svg';
import settingsIcon from 'assets/icons/settings.svg';
import dropDownMenuIcon from 'assets/icons/dropdown.svg';
import notificationIcon from 'assets/icons/notification.svg';

function Dashboard(props) {
    return (
    <div className="todo-container">
        <h1>TO-DO List</h1>
        <div className="todo-content">
            <section>
                <div className="todo-item-title">
                    <h2>Working in Progress</h2>
                    <button>Add...</button>
                </div>
                <div className="todo-item-list">
                    <div className="todo-item">
                        <p>Kontess</p>
                    </div>
                    <div className="todo-item">
                        <p>Hello, world</p>
                    </div>
                    <div className="todo-item">
                        <p>JavaScript</p>
                    </div>
                    <div className="todo-item">
                        <p>Python</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="todo-item-title">
                    <h2>Complete</h2>
                </div>
                <div className="todo-item-list">
                <div className="todo-item">
                        <p>Kontess</p>
                    </div>
                    <div className="todo-item">
                        <p>Hello, world</p>
                    </div>
                    <div className="todo-item">
                        <p>JavaScript</p>
                    </div>
                    <div className="todo-item">
                        <p>Python</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
    );
}

const TARGET_PAGES = {  // maybe this is a stupid design
    'Dashboard': {
        content: <Dashboard />,
        id: 'sidenav-dashboard'
    },
    'Activity': {
        content: null,
        id: 'sidenav-activity'
    },
    'My Team': {
        content: null,
        id: 'sidenav-my-team'
    },
    'Team Info': {
        content: null,
        id: 'sidenav-team-info'
    },
    'Settings': {
        content: null,
        id: 'sidenav-settings'
    },
};

export default class Skeleton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: {  // maybe props can contain currentPage instead of using this hardcode one
                name: 'Dashboard',
                content: TARGET_PAGES.Dashboard.content  // TODO: should be real <Dashboard />
            },
            currentUser: {  // TODO: this is placeholder, maybe get this info from local storage
                id: 123456,
                name: 'Foo Bar',
                avatar: 'http://i.stack.imgur.com/Dj7eP.jpg'
            },
            notifications: [],
            hasUnreadMsg: false
        };
    }

    switchPage(event, targetPageName) {
        if (targetPageName !== this.state.currentPage.name) {
            this.setState({currentPage: {name: targetPageName, content: TARGET_PAGES[targetPageName].content}});
            console.log(document.querySelector('.skeleton').innerHTML);
            document.getElementById(TARGET_PAGES[this.state.currentPage.name].id).classList.remove('sidenav-button-active');
            document.getElementById(TARGET_PAGES[targetPageName].id).classList.add('sidenav-button-active');
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
                        id={TARGET_PAGES.Dashboard.id}
                        onClick={(event) => {this.switchPage(event, 'Dashboard');}}
                    >
                        <span className="icon-text-wrapper">
                            <img className="icon-img" src={dashboardIcon} alt=""/>
                            <p>Dashboard</p>
                        </span>
                    </button>
                    <button
                        className="sidenav-button"
                        id={TARGET_PAGES.Activity.id}
                        onClick={(event) => {this.switchPage(event, 'Activity');}}
                    >
                        <span className="icon-text-wrapper">
                            <img className="icon-img" src={activityIcon} alt=""/>
                            <p>Activity</p>
                        </span>
                    </button>
                    <button
                        className="sidenav-button"
                        id={TARGET_PAGES['My Team'].id}
                        onClick={(event) => {this.switchPage(event, 'My Team');}}
                    >
                        <span className="icon-text-wrapper">
                            <img className="icon-img" src={myTeamIcon} alt=""/>
                            <p>My Team</p>
                        </span>
                    </button>
                    <button
                        className="sidenav-button"
                        id={TARGET_PAGES['Team Info'].id}
                        onClick={(event) => {this.switchPage(event, 'Team Info');}}
                    >
                        <span className="icon-text-wrapper">
                            <img className="icon-img" src={teamInfoIcon} alt=""/>
                            <p>Team Info</p>
                        </span>
                    </button>
                    <button
                        className="sidenav-button"
                        id={TARGET_PAGES.Settings.id}
                        onClick={(event) => {this.switchPage(event, 'Settings');}}
                    >
                        <span className="icon-text-wrapper">
                            <img className="icon-img" src={settingsIcon} alt=""/>
                            <p>Settings</p>
                        </span>
                        </button>
                </div>
            </nav>
            <div>
                {/* TODO: add menu for notificaions and user menu */}
                <nav className="topnav">
                    <p id="page-title">{this.state.currentPage.name}</p>
                    <button id="notification-button">
                        <span className="icon-text-wrapper">
                            <img src={notificationIcon} alt="notification"/>
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
                    {this.state.currentPage.content}
                </main>
            </div>
        </div>
        );
    }
}
