import React from'react';
import './style.scss';
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import kontessLogoImg from 'assets/images/logo.png';
import Footer from "../../components/footer/Footer";

import dashboardIcon from "assets/icons/dashboard.svg";
import eventIcon from "assets/icons/activity.svg";
import userIcon from "assets/icons/activity.svg";

toast.configure() 
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

  notify = () => toast("You have no notifications.", {
    draggablePercent: 60,
    closeButton: false,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    position: toast.POSITION.TOP_CENTER
  });

  getButtons() {
    const buttons = pages.map(page => (
      <button
        className={
          "nav-button" + (page.isActive ? " sidenav-button-active" : "")
        }
        id={page.pageId}
        onClick={event => {
          this.switchPage(event, page.pageId);
        }}
      >
        <span className="icon-text-wrapper">
          <img className="icon-img" src={page.iconPath} alt="" />
          <p>{page.name}</p>
        </span>
      </button>
    ));
    return <div>{buttons}</div>;
  }
  switchPage(event, targetPageId) {
    // TODO: implement page switching
    event.preventDefault();
  }
  render() {
    return (
      <div className = "dashboard">
        <div className = {"title-block"}>
          <h1 className = {"title"}>
            {"Team Information"}
          </h1>
          <button 
            className = {"notification"}
            onClick = {this.notify}
          >
            N
          </button>
        </div>
        <div className= 'sidebar'>
          <img src={kontessLogoImg} className= "logo"></img>
          <h6 className = "main-menu">Main Menu</h6>
          {(() => this.getButtons())()}
        </div>
        <Footer/>
      </div>
    );
  }
}
