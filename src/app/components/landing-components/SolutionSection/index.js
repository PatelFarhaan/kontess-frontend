import React from "react";

import "./style.scss";
import facePalmImage from "assets/images/kontessSolution.png";

export default class SolutionSection extends React.PureComponent {
  render() {
    return (
      <div className="solution-section">
        <div className="container">
          <div className="left">
            <img src={facePalmImage} alt={"Kontess is the Solution"} />
          </div>
          <div className="right">
            <div className="problem-header">A Comprehensive Solution</div>
            <div className="description-text">
              Our all-in-one platform saves organizers more than 50% of the time
              they normally spend managing competition. Organizers no longer
              have to switch around softwares because our platform has
              everything they need.
            </div>
            <br />
            <br />
            <div className="description-text">
              Participants are also in for a great learning experience. They
              will have the best satisfaction with an interactive platform
              dedicated to participants, with chat tools, collaborative teams,
              and mentorship
            </div>
          </div>
        </div>
      </div>
    );
  }
}
