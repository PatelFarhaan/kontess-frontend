import React from "react";

import "./style.scss";

export default function DemoSection(props) {
  return (
    <div className="demo-section">
      <div className="title">Ready to get started?</div>
      <a href="mailto:info@kontess.com">
        <button className="green-button">Request a Demo</button>
      </a>
    </div>
  );
}
