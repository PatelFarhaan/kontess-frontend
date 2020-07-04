import React from "react";
import { Link } from "react-router-dom";

const CommentForm = () => {
  return (
        <form className="leave_comment_form">
            <div className="form_feild">
                <textarea
                id="comment"
                name="comment"
                cols={45}
                rows={8}
                placeholder="Your Comment"
                aria-required="true"
                defaultValue={""}
                />
            </div>
            <div className="feild_inputs">
                <input type="text" placeholder="Name*" />
                <input type="text" placeholder="Email*" />
                <input type="text" placeholder="Website" />
            </div>
            <div className="ship-address-form-checkbox-btn blog_chkbox">
                <input type="checkbox" id="test3" />
                <label htmlFor="test3">
                Save my name, email, and website in this browser for the next time I
                comment.
                </label>
            </div>
            <div className="blog_btn">
                <Link to="#" className="default_btn">
                submit
                </Link>
            </div>
        </form>

  );
};

export default CommentForm;
