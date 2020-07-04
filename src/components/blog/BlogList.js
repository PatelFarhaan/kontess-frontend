import React from 'react';
import {blog_listing} from '../../imagepath';
import {Link} from 'react-router-dom';
import Pagination from '../pagination/pagination';


const numbers = [1];

{/* ==========YOU CAN ADD MORE BLOG HERE const numbers = [1,2,3,4];=================== */}


const blogItems = numbers.map((number) => (
  <div className="blog_col">
    <div className="blog_pic">
      <Link to="">
        <img src={blog_listing} />
      </Link>
    </div>
    <ul className="posted">
      <li>
        POSTED BY
        <Link to="" className="blue_color">
          <b> PAUL SCRIVENS</b>
        </Link>
      </li>
      <li>02 JANUARY 2015</li>
      <li>
        <Link to="">DESIGN, BRANDING</Link>
      </li>
    </ul>
    <h3>
      <Link to="">This is a Standard Post with a preview Image</Link>
    </h3>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s. Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is
      simply dummy text of the printing and typesetting industry. Lorem Ipsum
      has been the industry's standard dummy text ever since the 1500s. Lorem
      Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the standard dummy text.
    </p>
    <ul className="share_icons">
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
    </ul>
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