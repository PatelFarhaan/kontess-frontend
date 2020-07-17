import React, { useEffect } from "react";
import ContestGrid from "./ContestGrid";
import BlogGrid from "../blog/BlogGrid";
import Footer from "../footer/footer";
import PagesBanner from "../pages_banner/PagesBanner";
import MainHeader from "../header/header";
import { Helmet } from "react-helmet";
import TaskList from "../solutions/TaskList";
import { Link } from "react-router-dom";
import {
  building_icn,
  reward_icon,
  trophy_icn,
  search_icn,
  group_icn,
  chat_icn,
  download_icn,
  check_icn,
  work_icn,
  mobile_app,
  mobile_lock,
  contract
} from "../../imagepath";

const Solution = props => {
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])
  const handleRequestDemo = () => {
    window.open('https://calendly.com/kontess');
  }
  let contestData = [
    {
      iconclass: "fa fa-clock-o",
      title: "Spend 30% less time on management",
     
    },
    {
      iconclass: "fa fa-usd",
      title: "Save hundreds with all-in-one tool",
      
    },
    {
      iconclass: "fa fa-thumbs-o-up",
      title: "Increase participants’ satisfaction by 50%",
      
    }
    // {
    //   image: people_icn,
    //   title: "Swift Commincation",
    //   content:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    // },
    // {
    //   image: work_icn,
    //   title: "Workshop, Events or Deadlines",
    //   content:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    // },
    // {
    //   image: work_icn,
    //   title: "Matching and Connection",
    //   content:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    // }
  ];

  let taskList = [
    {
      icon: group_icn,
      title: "Create a team and profile"
    },
    {
      icon: search_icn,
      title: "Search for other teammates"
    },
    {
      icon: chat_icn,
      title: "In-app chat to connect with anyone"
    },
    {
      icon: building_icn,
      title: "Collaborative workspace within team"
    },
    {
      icon: check_icn,
      title: "Keep track of events, to-do lists, and deadlines"
    },
    {
      icon: download_icn,
      title: "Upload and download files with shared drive"
    },
    {
      icon: trophy_icn,
      title: "View results and feedback"
    }
  ];

  return (
    <>
    <Helmet htmlAttributes>
        <html lang="en" />
        <meta charset="utf-8" />
        <link rel="icon" href="/public/favicon.ico" />
        <title>Contest Solutions | Kontess</title>
        <meta name="description" content="We are pioneers in the contest management space with our 
        participant-centric software solution. We are all about saving you money and time, while 
        allowing you to offer your participants the best experience possible. Easily accept submissions 
        from participants, give participants the ability to organize remotely, and automate your judging 
        with our online contest management software. Stop wondering how you are going to host your contest 
        online, Kontess is the perfect place for your contests!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
      <MainHeader innerHeader="inner_header" {...props}></MainHeader>
      <PagesBanner
        className=""
        title="Solutions"
        parentDir="Home"
        currentDir="Solutions"
      ></PagesBanner>
      <section className="contest">
        <div className="container">
          <div className="contest_wrap">
            <div className="contest_head text-center">
              <h2 className="pri_head ">
                <span>The Contest</span> Management Platform
              </h2>
              <p>
               We are all about saving you money and time, 
               while allowing you to offer your participants the best experience possible.
              </p>
            </div>
            <div className="contest_bttm">
              <ContestGrid data={contestData}></ContestGrid>
            </div>
          </div>
        </div>
      </section>
      <section className="register">
        <div className="container">
          <div className="register_wrap">
            <div className="register_text">
              <h2 className="pri_head">
                <span>Registration </span>Phase
              </h2>
              <ul className="blue_list">
                <li>Increase participation with a dedicated contest profile</li>
                <li>
                  Easily manage deadlines and requirements for registration
                </li>
                <li>
                  Quickly view live analytics of registrants and their profiles
                </li>
                <li>Recruit judges/mentors and evaluate their applications</li>
              </ul>
            </div>
            <div className="register_img">
              <img src={mobile_lock} alt />
            </div>
          </div>
          <div className="register_wrap mob_col_rev">
            <div className="register_img">
              <img src={mobile_app} alt />
            </div>
            <div className="register_text">
              <h2 className="pri_head">
                <span>Contest</span> Phase
              </h2>
              <ul className="blue_list">
                <li>
                  Create & manage tasks, events, workshops, and deadlines for
                  participants
                </li>
                <li>Keep track of participants' submissions and progress</li>
                <li>Share announcements and directly message participants</li>
                <li>Address questions and concerns quickly with in-app chat</li>
                <li>
                  Reduce judging bias with randomized judge assignments and with
                  established grading rubrics
                </li>
              </ul>
            </div>
          </div>
          <div className="register_wrap">
            <div className="register_text">
              <h2 className="pri_head">
                <span>Concluding </span>Phase
              </h2>
              <ul className="blue_list">
                <li>
                  Review final results and analyze participants' performances
                </li>
                <li>
                  Release scores and feedback to participants with one click
                </li>
                <li>Export raw data and results for internal review</li>
                <li>
                  Continually improve contest experience with feedback from
                  participants{" "}
                </li>
              </ul>
            </div>
            <div className="register_img wdth_inc">
              <img src={contract} alt />
            </div>
          </div>
        </div>
      </section>
      <section className="participate">
        <div className="container">
          <h2 className="pri_head text-center">
            <span>What participants</span> can do
          </h2>
          <div className="task_wrap">
            {taskList.map((val, i) => {
              if (i <= 3) {
                return <TaskList data={val} key={i}></TaskList>;
              }
            })}
          </div>
          <div className="task_wrap task_btm_row">
            {taskList.map((val, i) => {
              if (i > 3) {
                return <TaskList data={val} key={i}></TaskList>;
              }
            })}
          </div>

          <div className="cstm_btn_wrap">
            <Link to="/pricing" className=" blue_grad_btn">
              View Pricing
            </Link>
            
             <Link to="#" className="green_grad_btn" onClick={handleRequestDemo}>
                Request a Demo
             </Link>
          </div>
        </div>
      </section>
      <BlogGrid></BlogGrid>
      <Footer></Footer>
    </>
  );
};

export default Solution;
