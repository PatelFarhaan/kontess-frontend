import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import kontessLogoImg from 'assets/images/logo.png';

export default class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: props.initialActivePageId
        };
    }

    getButtons() {
        const buttons = this.props.pages.map((page) => {
            return (
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
            );
        });
        return (
            <div>
                {buttons}
            </div>
        );
    }

    switchPage(event, targetPageId) {
        this.setState({currentPage: targetPageId})
        event.preventDefault();
    }

    render() {
        return (
            <nav className="sidenav">
                <img id="logo" src={kontessLogoImg} alt="Kontess Logo" />
                <h3>Main Menu</h3>
                {/* (() => {return this.getButtons();})() */}
            </nav>
        );
    }
}

SideNav.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.shape({
        isActive: PropTypes.bool,
        pageId: PropTypes.string,
        iconPath: PropTypes.string,
        name: PropTypes.string
    })),
    initialActivePageId: PropTypes.string
};
