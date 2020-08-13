import React from 'react';
import { Link } from "react-router-dom";

const Footer = () =>{
    return (
      <footer>
        <div className="footer_main">
          <div className="container">
            <div className="footer_wrap">
              <div className="footer_menus">
                <ul>
                  <li>
                    <Link to="/" className="bdr_rgt">
                      home
                    </Link>
                  </li>
                  <li>
                    <Link to="/solutions" className="bdr_rgt">
                      solutions
                    </Link>
                  </li>
                  <li>
                    <Link to="/explore" className="bdr_rgt">
                      explore
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="bdr_rgt">
                      about
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="bdr_rgt">
                      blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="bdr_rgt">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">contact</Link>
                  </li>
                </ul>
                <p>Kontess @ 2020. All Rights Reserved</p>
              </div>
              <div className="footer_serach">
                <h4>STAY CONNECTED</h4>
                <div className="form-group">
                  <input
                    className="form-control search_feild"
                    type="text"
                    placeholder="Your Email"
                    aria-label="Search"
                  />
                  <Link to="/" className="search_btn">
                    Subscribe
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
     
    );
}

export default Footer;