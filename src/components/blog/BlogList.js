import React from 'react';
import {blog_listing} from '../../imagepath';
import {Link} from 'react-router-dom';
import Pagination from '../pagination/pagination';


const numbers = [1];

{/* ==========YOU CAN ADD MORE BLOG HERE const numbers = [1,2,3,4];=================== */}


const blogItems = numbers.map((number) => (
  <div className="blog_col">
    <div className="blog_pic">
        <img src={blog_listing} />
    </div>
    <ul className="posted">
      <li>
        POSTED BY
        <a href="https://www.linkedin.com/in/kevin-phong-wong-9a0239123/" class="blue_color"> KEVIN WONG</a>
      </li>
      <li>17 JULY 2020</li>
      <li>
        <Link to="/blog-details">WHY KONTESS, PARTICIPANT EXPERIENCE</Link>
      </li>
    </ul>
    <h3>
      <Link to="/blog-details">How to improve participant experience while social distancing
</Link>
    </h3>
    <p>
      Nowadays, departments across universities organize competitions among students as a 
      chance for them to apply what they learn in class to real life situations and strive to 
      be the best among their peers. At the end of the competition, winners are publicly announced 
      as a way of showcasing the achievements students can potentially...
    </p>
    {/*<ul className="share_icons">
      <li>
        <Link to="">
          <i className="fa fa-heart-o" aria-hidden="true" /> Likes
        </Link>
      </li>
      <li>
        <Link to="">
          <i className="fa fa-share-alt" aria-hidden="true" /> Shares
        </Link>
      </li>
    </ul>*/}
    <Link to="/blog-details" className="default_btn">
      Read More
    </Link>
  </div>
));


const BlogList = () => {
    return (
          blogItems
    );
}

export default BlogList;