import React from "react";
import {Link} from "react-router-dom";

const SocailMedia = ({data}) => {
    return (
      <div className="post_social">
        {data.map((val, i) => (
          <Link to={val.link} key={i}>
            <i className={`fa ${val.socialClass}`} aria-hidden="true" />
            <span className="tool_tip">{val.socialName}</span>
          </Link>
        ))}
      </div>
    );
}

export default SocailMedia;