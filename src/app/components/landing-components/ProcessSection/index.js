import React from "react";
import walkingGuyImage from "assets/images/walkingGuy.png";

import "./style.scss";

export default class ProcessSection extends React.PureComponent {
  render() {
    return (
      <div className="process-section">
        <div className="container">
          <div className="left">
            <div className="problem-header">The Process</div>
            <img src={walkingGuyImage} alt={"Walking Guy"} />
          </div>
          <div className="right">
            <div className="card first-card">
              <span className="step-number">1</span>
              <div className="title">Platform Creation</div>
              <div className="description">
                Tell us what you need, and we’ll work with you to create a
                customized platform to fit your competitions needs.
              </div>
            </div>
            <div className="blue-card">
              <span className="step-number white">2</span>
              <div className="title">Run Your Competition</div>
              <div className="description">
                During the competition, Kontess will provide you with dedicated
                customer service to help make your competition run as smoothly
                as possible and help your participants feel satisfied.
              </div>
            </div>
            <div className="card third-card">
              <span className="step-number">3</span>
              <div className="title">Analytics, Results, Data</div>
              <div className="description">
                After your competitions over, you can export and save all data
                and statistics of the competition. We also retain your
                customization and statistics to help serve you better in your
                next competition.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
