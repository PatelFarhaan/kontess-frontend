import React from 'react';
import './style.scss';

import SideNav from '../../components/sidenav/SideNav';
import TopNav from '../../components/topnav/TopNav';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <SideNav currentPageId="dashboard-nav"/>
                <div>
                    <TopNav />
                    {this.props.children /* which will be <ToDoBody /> */}
                </div>
            </div>
        );
    }
}
