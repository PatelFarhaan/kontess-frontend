import React from "react";
import {blog_listing} from "../../imagepath";
import {Link} from "react-router-dom";

const BlogSingle = () => {
  return (
      <div>
        <h4>
          <a href>THIS IS A STANDARD POST WITH A PREVIEW IMAGE</a>
        </h4>
        <ul className="posted">
          <li>
            POSTED BY
            <Link to="#" className="blue_color">
              <b> PAUL SCRIVENS</b>
            </Link>
          </li>
          <li>02 JANUARY 2015</li>
          <li>
            <a href>DESIGN, BRANDING</a>
          </li>
        </ul>
        <div className="blog_pic">
          <img src={blog_listing} />
        </div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the standard dummy text.
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the standard dummy text.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the standard dummy text.
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the standard dummy text.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the standard dummy text.
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the standard dummy text.
        </p>
      </div>
  );
};

export default BlogSingle;
