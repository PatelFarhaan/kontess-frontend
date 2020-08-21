import React, { useState } from "react";
import LandingTopNav from "../../components/landing-components/NavigationBar";
import cx from "classnames";
import "react-day-picker/lib/style.css";
import "./Landing2.scss";

export default function Landing2(props) {
  const [status1, setStatus1] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [status3, setStatus3] = useState(false);
  const [status4, setStatus4] = useState(false);

  // function update(setStatus,status){
  // 	return(setStatus(!status))
  // }

  return (
    <div className="Landing2">
      <LandingTopNav currentPage="Solutions" />

      <div className="landing-2-wrapper">
        <img src={require("./Landing2_front.jpg")} />
        <br />

        <h1> What you can do on the platform </h1>

        <div className="info">
          <button
            className={cx("info__toggle", {
              "info__toggle--active": status1
            })}
            onClick={() => setStatus1(!status1)}
          >
            <span className="info__toggle-text">Registration phase </span>
            <div className="rotate90">
              <svg
                className={cx("icon", { "icon--expanded": status1 })}
                viewBox="6 0 12 24"
              >
                <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
              </svg>
            </div>
          </button>

          {status1 ? (
            <p>
              Set the date when the registration will finish
              <br />
              Set requirments for potential participants
              <br />
              See live analytics of the registration stats
              <br />
              See list of registrants and their information
              <br />
              Approve the registration of judges and other administrators
              <br />
              Manually remove participants from competition if necessary
              <br />
            </p>
          ) : null}

          <button
            className={cx("info__toggle", {
              "info__toggle--active": status2
            })}
            onClick={() => setStatus2(!status2)}
          >
            <span className="info__toggle-text">
              Ongoing phase(After registration)
            </span>
            <div className="rotate90">
              <svg
                className={cx("icon", { "icon--expanded": status2 })}
                viewBox="6 0 12 24"
              >
                <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
              </svg>
            </div>
          </button>

          {status2 ? (
            <p>
              Create tasks and deadlines for participants
              <br />
              Create events and workshops
              <br />
              Upload files to participants and download files from participants
              <br />
              Directly send message to any participant or team
              <br />
              Assign members to teams
              <br />
              Create and assign new roles to any person
              <br />
              Publish quick announcement to everyone or to people with specific
              roles
              <br />
              Create grading criteria or rubric
              <br />
              Assign judges for grading, or assign grades yourself
              <br />
              Review final results and make cuts if necessary
              <br />
              Release scores and feedback to participants
              <br />
              Add new rounds of competition <br />
            </p>
          ) : null}

          <button
            className={cx("info__toggle", {
              "info__toggle--active": status3
            })}
            onClick={() => setStatus3(!status3)}
          >
            <span className="info__toggle-text">Concluding phase</span>
            <div className="rotate90">
              <svg
                className={cx("icon", { "icon--expanded": status3 })}
                viewBox="6 0 12 24"
              >
                <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
              </svg>
            </div>
          </button>

          {status3 ? (
            <p>
              The platform will be available one week after the end date you
              specified when creating the competition. <br />
              After that, the competition will be archived and can only be
              accessed by the administrators.
              <br />
              Files and data are stored in our server for one year before
              getting deleted
              <br />
              During this time you can download the files to your computer
              <br />
            </p>
          ) : null}

          <button
            className={cx("info__toggle", {
              "info__toggle--active": status4
            })}
            onClick={() => setStatus4(!status4)}
          >
            <span className="info__toggle-text2">What participants can do</span>
            <div className="rotate90">
              <svg
                className={cx("icon", { "icon--expanded": status4 })}
                viewBox="6 0 12 24"
              >
                <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
              </svg>
            </div>
          </button>

          {status4 ? (
            <p>
              Creating team <br />
              Join team and invite members to join team
              <br />
              Chat and connect with anyone <br />
              Collaborative workspace within team <br />
              Keep track of events, to-do list, and deadlines
              <br />
              Upload and download files
              <br />
              View results and feedback
              <br />
            </p>
          ) : null}

          {status4 ? (
            <div className="info_align-center">
              <button className="blue-button">See Prices</button>
              <br />
              <button className="green-button">Request a demo</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
