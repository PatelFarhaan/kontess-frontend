import React from "react";
import { blog_listing } from "../../imagepath";
import { Link } from "react-router-dom";

const numbers = [1];

{/*======YOU CAN ADD MORE POPULAR POST FORM HERE LIKE const numbers = [1, 2, 3, 4]; */}

const PopularPosts = () => {
  return(
    <>
      {
        numbers.map(() => (
          <div className="popular_post">
              <div className="popular_pic">
                <Link to="/blog-details">
                  <img src={blog_listing} />
                </Link>
              </div>
              <div className="popular_contnt">
                <h5>
                  <Link to="/blog-details">How to improve participant experience..</Link>
                </h5>
                <ul className="name_date">
                  <li>KEVIN WONG </li>
                  <li>17 JULY</li>
                </ul>
              </div>
          </div>
        ))
      }
    </>
  );
};

export default PopularPosts;
