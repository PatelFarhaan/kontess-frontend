import React from "react";
import { Link } from "react-router-dom";

const SidebarData = ({ className, data }) => {
  return (
    <ul className={className}>
      {data.map((val, i) => (
        <li key={i}>
          <Link to={val.link}>{val.name} </Link>
        </li>
      ))}
    </ul>
  );
};


export default SidebarData;