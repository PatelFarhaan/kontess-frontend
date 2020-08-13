import React from "react";
import {Link} from "react-router-dom";

const Pagination = () => {
    return (
      <ul className="pagination cstm_pagination">
        <li className="page-item">
          <Link className="page-link" to="#">
            Previous
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to="#">
            1
          </Link>
        </li>
        {/*<li className="page-item">
          <Link className="page-link" to="">
            2
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to="">
            3
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to="">
            4
          </Link>
        </li>*/}
        <li className="page-item">
          <Link className="page-link" to="#">
            Next
          </Link>
        </li>
      </ul>
    );
}

export default Pagination;