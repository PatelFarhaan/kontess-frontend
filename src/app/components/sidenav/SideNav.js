import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import kontessLogoImg from 'assets/images/logo.png';
import dashboardIcon from 'assets/icons/dashboard.svg';
import eventIcon from 'assets/icons/activity.svg';

export default class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPageId: props.currentPageId
        };
        this.pages = [
            {
                name: 'Dashboard',
                iconPath: dashboardIcon,
                pageId: 'dashboard-nav',
                isActive: props.currentPageId === 'dashboard-nav'
            },
            {
                name: 'Event',
                iconPath: eventIcon,
                pageId: 'event-nav',
                isActive: props.currentPageId === 'event-nav'
            }
        ];
    }

    getButtons() {
        const buttons = this.pages.map((page) => 
            (
                <button
                    className={"sidenav-button" + (page.isActive ? " sidenav-button-active" : "")}
                    id={page.pageId}
                    onClick={(event) => { this.switchPage(event, page.pageId); }}
                >
                    <span className="icon-text-wrapper">
                        <img className="icon-img" src={page.iconPath} alt="" />
                        <p>{page.name}</p>
                    </span>
                </button>
            )
        );
        return (
            <div>
                {buttons}
            </div>
        );
    }

    switchPage(event, targetPageId) {
        // TODO: implement page switching
        event.preventDefault();
    }

    render() {
        return (
            <nav className="sidenav">
                <img id="logo" src={kontessLogoImg} alt="Kontess Logo" />
                <h3>Main Menu</h3>
                {(() => this.getButtons())()}
            </nav>
        );
    }
}

SideNav.propTypes = {
    currentPageId: PropTypes.string
};
