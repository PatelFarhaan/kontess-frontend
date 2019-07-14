import React from 'react';
import './style.scss';

import Body from '../body/Body';
import SideNav from '../../components/sidenav/SideNav';
import TopNav from '../../components/topnav/TopNav';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <SideNav currentPageId="dashboard-nav"/>
                <div>
                    <TopNav />
                    <Body />
                    {/* <Body />  this for Event
                    <Body /> My Team
                    <Body /> ... */}
                </div>
            </div>
        );
    }
}
