import React from 'react';
import './style.scss'; 

import dropDownMenuIcon from 'assets/icons/dropdown.svg';
import notificationIcon from 'assets/icons/notification.svg';

export default class TopNav extends React.Component {
    render() {
        return (
            <nav className="topnav">
                <p id="page-title">{"Title"}</p>
                <button id="notification-button">
                    <span className="icon-text-wrapper">
                        <img src={notificationIcon} alt="notification" />
                    </span>
                </button>
                <button id="user-name-avatar">
                    <span className="icon-text-wrapper">
                        <img id="avatar" src={""} alt="" />
                        <p>{"User Name"}</p>
                        <img className="icon-img" src={dropDownMenuIcon} alt="" />
                    </span>
                </button>
            </nav>
        );
    }
}