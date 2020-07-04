import React from 'react';
import { Link } from "react-router-dom";

const ContactForm = () => {
  return (
    <form>
      <div className="feild_inputs contact_input">
        <input type="text" name placeholder="Name" />
        <input type="text" name placeholder="Email" />
      </div>
      <div className="feild_inputs contact_input">
        <input type="text" name placeholder="Subject" />
        <input type="text" name placeholder="Phone" />
      </div>
      <div className="form_feild">
        <textarea defaultValue={""} />
      </div>
      <div className="blog_btn txt_center">
        <Link to="" className="default_btn">
          submit
        </Link>
      </div>
    </form>
  );
};

export default ContactForm;