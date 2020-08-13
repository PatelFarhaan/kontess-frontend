import React from 'react';
import { Link } from "react-router-dom";

const PagesBanner = (props) => {
    console.log(props);
    return (
      <section className={`sol_banner  ${props.className}`}>
        <div className="solution_content blog_content">
          <h1>{props.title}</h1>
          <ul className="cstm_bredcum">
            <li>
              <Link to="/">{props.parentDir}</Link>
            </li>
            <li>
              <Link to="/">{props.currentDir}</Link>
            </li>
          </ul>
        </div>
      </section>
    );
}

export default PagesBanner;