import React from "react";
import { Link } from "react-router-dom";
import Testimonials from "../testimonials/testimonials";
import BlogGrid from "../blog/BlogGrid";
import MainHeader from "../header/header";
import Footer from "../footer/footer";
import {
  banner_img1,
  banner_img2,
  play_btn,
  reward,
  wood,
  pico,
  carlosn,
  reward_icon,
  nvc
} from "../../imagepath";
 
const App = props => {
  const handleRequestDemo = () => {
    window.open('https://calendly.com/kontess');
  }
  return (

    <div>
      <MainHeader {...props}></MainHeader>
      <section className="home_banner">
        <div className="container">
          <div className="banner_content">
            <div className="banner_text">
              <h1>
                <span>Changing</span> the way contests <span>run</span>
              </h1>
              <h4>
                Running a contest is hard. We can help make it simple, save you
                time, while offering the best experience for your participants.
              </h4>
              {/*  <a href="javascript:void(0);" class="cstm_btn">Learn More</span></a> */}
              <div className="serchbox_row">
                {/* <input type="search" placeholder="Enter Email Id" /> */}
                {/* <button type="button">Request a demo</button> */}
                <Link to="#"  onClick={handleRequestDemo}>
                Request a Demo
             </Link>
              </div>
            </div>
            <div className="banner_img">
              <span className="banner_img_top">
                <img src={banner_img1} alt />
              </span>
              <span className="banner_img_btm">
                <img src={banner_img2} alt />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="home_vid">
        <div className="container">
          <div className="home_vid_wrap">
            <div className="home_vid_lft">
              {/* <h4 className="contest_text">
              The Contest Management Platform
              </h4> */}
               <h2 class="pri_head ">The Contest <span>Management Platform</span></h2>
              <p>
                {/* <span className="drop_cap">We </span> */}
                Contest organizers have to manage participants, judges,
                 and sponsors, all while ensuring a smooth experience for all parties. Positive contest 
                 experiences increase participant retention, attract top judges, and improve an organization’s 
                 reputation. That’s why we developed the Contest Management Platform. 
                Kontess makes it easy for participants to organize remotely and simplifies
                 contest management for administrators. 
              </p>
              <Link to="/solutions" className="cstm_btn">
                Learn More
              </Link>
            </div>
            <div className="home_vid_rgt">
              <div className="home_vid_box">
                <button
                  type="button"
                  className="play_btn"
                  onclick="enableAutoplay()"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  <img src={play_btn} alt />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home_offer">
        <div className="container">
          <div className="section_heding">
            {/* <h2>How we can</h2>
            <h3>Help</h3> */}
            <h2 class="pri_head font_weight">How we can <span>Help</span></h2>
          </div>
          <div className="offer_card_wrap">
            <div className="offer_card">
              <span className=" yellow_shape">
                <img src={reward} alt />
              </span>
              <h4>All-in-one Solution</h4>
              <p>Reduce the number of tools needed to effectively manage your contest</p>
            </div>
            <div className="offer_card">
              <span className=" blue_shape">
                <img src={reward} alt />
              </span>
              <h4>Management</h4>
              <p>Save time by automating and managing your contest’s events and deadlines</p>
            </div>
            <div className="offer_card">
              <span className=" green_shape">
                <img src={reward} alt />
              </span>
              <h4>COMMUNICATION</h4>
              <p>Easily message participants and allow them to chat with others in-app</p>
            </div>
            <div className="offer_card">
              <span className=" red_shape">
                <img src={reward} alt />
              </span>
              <h4>Judging</h4>
              <p>Automate judging assignments to reduce bias and easily share feedback with participants</p>
            </div>
            <div className="offer_card">
              <span className=" purple_shape">
                <img src={reward} alt />
              </span>
              <h4>Feedback</h4>
              <p>Continually improve your contest by collecting feedback from participants and judges</p>
            </div>
            <div className="offer_card">
              <span className=" orange_shape">
                <img src={reward} alt />
              </span>
              <h4>Analytics</h4>
              <p>View live data on participants and their submissions to monitor engagement </p>
            </div>
          </div>
        </div>
      </section>
      <Testimonials></Testimonials>
      {/*=======HERE IS THE TESTIMONIAL CODE
                    AND 
      ACTUAL CODE IN TESTIMONIAL COMPONENT=================*/}
      <section className="awards_section">
        <div className="container">
          <div className="awards_wrap">
            <div className="section_heding">
              <h2>Serving Competitions  </h2>
              <h3>Since 2019</h3>
            </div>
            <div className="awards_img_wrap">
              <div className="awards_img_row">
                <div className="awards_img_col nvc">
                  <img src={nvc} />
                </div>
                {/* <div className="awards_img_col">
                  <img src={pico} />
                </div>
                <div className="awards_img_col">
                  <img src={carlosn} />
                </div>
                <div className="awards_img_col">
                  <img src={wood} />
                </div> */}
              </div>
              {/* <div className="awards_img_row">
                <div className="awards_img_col">
                  <img src={wood} />
                </div>
                <div className="awards_img_col">
                  <img src={pico} />
                </div>
                <div className="awards_img_col">
                  <img src={carlosn} />
                </div>
                <div className="awards_img_col">
                  <img src={wood} />
                </div>
                <div className="awards_img_col">
                  <img src={wood} />
                </div>
                <div className="awards_img_col">
                  <img src={wood} />
                </div>
                <div className="awards_img_col">
                  <img src={wood} />
                </div>
                <div className="awards_img_col">
                  <img src={wood} />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section className="our_process_section">
        <div className="container">
          <div className="our_process_wrap">
            <div className="section_heding">
              <h2>This is How we</h2>
              <h3>Streamline Our Process</h3>
            </div>
            <div className="our_process_row">
              <div className="our_process_col">
                <img src={reward_icon} />
                <h3>Set up</h3>
                <p>
                  Tell us what you need, and we’ll work with you to create a
                  customized platform to fit your competitions needs
                </p>
              </div>
              <div className="our_process_col">
                <img src={reward_icon} />
                <h3>Promote</h3>
                <p>
                  Spread the word! Update information about your competition in
                  our platform so public can find out about your competition.
                  That way, not only can you get more participants to join, you
                  can also attract more sponsors
                </p>
              </div>
              <div className="our_process_col">
                <img src={reward_icon} />
                <h3>Manage</h3>
                <p>
                  During the competition, Kontess will provide you with
                  dedicated customer service to help make your competition run
                  as smoothly as possible and help your participants feel
                  satisfied.s
                </p>
              </div>
            </div>
            <div className="our_process_btn">
            
              <Link to="#" className="request_btn" onClick={handleRequestDemo}>
                Request a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
      <BlogGrid></BlogGrid>
      <Footer></Footer>
    </div>
  );
};

export default App;
