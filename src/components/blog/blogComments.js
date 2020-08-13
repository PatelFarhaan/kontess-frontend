import React from "react";
import {Link} from "react-router-dom";
import {avtar} from "../../imagepath";

const numbers = [1,2];
const comments = numbers.map(() => (
    <div className="blog_review_comment">
        <div className="blog_comnt_inner">
          <img src={avtar} />
          <div className="blog_review_detail">
            <Link to="#" className="review_heading">
              BocaHickory.Com
            </Link>
            <span className="cmment_date">
              <i className="fa fa-clock-o" />
              March 5, 2019 - 8:55 am
            </span>
            <p>
              I want to to thank you for this wonderful read!!
              <br />I definitely loved every little bit of it. I’ve got you
              bookmarked to look at new
              <br />
              things you post…
            </p>
            <span className="reply">
              <Link to="#"> Reply</Link>
            </span>
          </div>
        </div>
        <div className="blog_comnt_inner comment_reply">
          <img src={avtar} />
          <div className="blog_review_detail">
            <Link to="#" className="review_heading">
              BocaHickory.Com
            </Link>
            <span className="cmment_date">
              <i className="fa fa-clock-o" />
              March 5, 2019 - 8:55 am
            </span>
            <p>
              I want to to thank you for this wonderful read!!
              <br />I definitely loved every little bit of it. I’ve got you
              bookmarked to look at new
              <br />
              things you post…
            </p>
            <span className="reply">
              <Link to="#"> Reply</Link>
            </span>
          </div>
        </div>
      </div>
))

const BlogComments = () => {
    return comments;
}

export default BlogComments;