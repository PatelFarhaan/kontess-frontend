import React from "react";
import {dummy1} from "../../imagepath";
import {Link} from "react-router-dom";

const numbers = [1];  

{/*==============YOU CAN ADD MORE CARDS FROM (ARRAYS) HERE 
  const numbers = [1,2,3,4,5,6];  
===============*/ }

const resultsCard = numbers.map(() => (
  <div className="colllege_col">
    <div className="col_row">
      <img className="col_image" src={dummy1} alt='' />
      <p className="accept_close">Closed</p>
    </div>
    <div className="college_content">
      <div className="wrap_contnt">
        <div className="top_row">
          <p>
            <i className="fa fa-map-marker" aria-hidden="true" /> Irvine, CA
          </p>
          {/* <ul className="star_row">
            <li>
              <i className="fa fa-star" aria-hidden="true" />
            </li>
            <li>
              <i className="fa fa-star" aria-hidden="true" />
            </li>
            <li>
              <i className="fa fa-star" aria-hidden="true" />
            </li>
            <li>
              <i className="fa fa-star" aria-hidden="true" />
            </li>
            <li>
              <i className="fa fa-star" aria-hidden="true" />
            </li>
            <li>5.0 (2)</li>
          </ul> */}


          {/*===========YOU CAN SHOW RATING FROM HERE, YOU HAVE TO UNCOMMENT THE ABOVE CODE*/}
          
        </div>
        <h3><Link to="/explore-details">University of California Irvine </Link></h3>
        <h4>New Venture Competition</h4>
        <div className="top_row">
          <p className="type_business">Business</p>
          <p>Nov 2019 - May 2020 </p>
        </div>
        <p>
        Calling All Creators, Inventors, and Aspiring Entrepreneurs!
         The UCI New Venture Competition offers you the opportunity to form a team...
         <Link to="/explore-details">Read More</Link>
        </p>
      </div>
      <div className="btns_grp">
        <button type="button" className="default_btn">
          Login
        </button>
        <button type="button" className="default_btn sign_btn">
          Sign Up
        </button>
      </div>
    </div>
  </div>
));

const ResultsCard = () => {
    return resultsCard;
}

export default ResultsCard;