import React from "react";

import "./style.scss";
import facePalmImage from "assets/images/facepalm.png";

export default class ProblemSection extends React.PureComponent {
  render() {
    return (
      <div className="problem-section">
        <div className="container">
          <div className="left">
            <div className="problem-header">The Problem</div>
            <div className="description-text">
              Running a competition is difficult and time-consuming. The
              technologies that exist today are expensive, inefficient, and only
              solve the problems partially.
            </div>
            <br />
            <br />
            <div className="description-text">
              Many poorly executed competitions cause participants confusion and
              dissatisfaction.
            </div>
          </div>
          <div className="right">
            <img
              src={facePalmImage}
              alt={"Problems are frustrating for organizers"}
            />
          </div>
        </div>
      </div>
    );
  }
}
