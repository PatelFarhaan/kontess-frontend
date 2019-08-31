import React from "react";
import "./style.scss";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import kontessLogoImg from "assets/images/logo.png";
import Footer from "../../components/footer/Footer";

import dashboardIcon from "assets/icons/dashboard.svg";
import eventIcon from "assets/icons/activity.svg";
import userIcon from "assets/icons/activity.svg";
import SideNav from "../sidenav/SideNav";
import TopNav from "../topnav/TopNav";

toast.configure();
const pages = [
  {
    name: "Dashboard",
    iconPath: dashboardIcon,
    pageId: "dashboard-nav"
  },
  {
    name: "Event",
    iconPath: eventIcon,
    pageId: "event-nav"
  },
  {
    name: "Users",
    iconPath: userIcon,
    pageId: "users-nav"
  }
];
export default class DashboardTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageId: props.currentPageId
    };
    this.notify = this.notify.bind(this);
  }

  notify = () =>
    toast("You have no notifications.", {
      draggablePercent: 60,
      closeButton: false,
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      position: toast.POSITION.TOP_CENTER
    });

  render() {
    return (
      <div className="dashboard">
        <TopNav />
        <div className="content">
          <div className="main-content">{this.props.children}</div>
          <Footer />
        </div>
        <SideNav currentPageId={this.props.pageId} userName={this.props.user} />
      </div>
    );
  }
}
