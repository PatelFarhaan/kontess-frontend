import React, { useEffect } from "react";
import Footer from "../footer/footer";
import PagesBanner from "../pages_banner/PagesBanner";
import MainHeader from "../header/header";
import { about_side1, about_side2, contact_banner } from "../../imagepath";

const About = props => {
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])
  return (
    <>
      <MainHeader innerHeader="inner_header" {...props}></MainHeader>
      <PagesBanner
        className="about_banner"
        title="About Us"
        parentDir="Home"
        currentDir="About Us"
      ></PagesBanner>
      <section className="contest about_contest">
        <div className="container">
          <div className="contest_wrap">
            <div className="contest_head text-center">
              <h2 className="pri_head ">
                <span>Brief </span> history
              </h2>
              <p>
                In 2019, we participated in a competition hosted by our college
                and was unsatisfied. When we told the organizers that we wanted
                to help improve the way competition runs, we discovered
                first-hand what happens behind the scene. We knew there was a
                better way, and came up with the platform that can cover what
                the organizers need in a competition. Since then, we dedicated
                ourselves to serving all kinds of academic and professional
                competitions.
                 {/*========you can change Text from here===========*/}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="intro">
        <div className="container">
          <div className="intro_row">
            <div className="intro_lft">
              <img src={contact_banner} />
               {/*========you can change Image from here===========*/}
            </div>
            <div className="intro_rgt">
              <h2 className="pri_head ">
                Who <span>We Are </span>
              </h2>
              
              <p>
                The Kontess team is composed of people from a number of different backgrounds and walks of life, 
                but we are united by our common goal, improving your contest experience. 
              </p>
               {/*========you can change Text from here===========*/}
            </div>
          </div>
        </div>
      </section>
      <section className="about_section">
        <div className="container">
          <h2 className="pri_head ">
            Our <span>Vision </span>
          </h2>
          <div className="about_row">
            <div className="about_rgt">
              <p>
                In today's competitive world, contest is a great method to
                fairly select the best from the best. Sadly, the way these
                contests are hosted is very inefficient, tedious, and brings
                little satisfaction to participants, which can hurt the
                reputation of the organizers. We dedicate ourselves to helping
                these organizers run their competitions more efficiently, help
                them save money and time.
                 {/*========you can change Text from here===========*/}
              </p>
            </div>
            <div className="about_lft">
              <img src={about_side2} />
                {/*========you can change Image from here===========*/}
            </div>
          </div>
          <div className="about_row reverse">
            <div className="about_rgt">
              <p>
                Rivalry makes good friends. We also help participants feel like
                they are being respected and treated fairly during the contest.
                Our platform offers full transparency between organizers and
                participants, so they can get their questions answered, connect
                with key people, and make new friends in the process. We help
                make the contest they participate in the best place to apply
                their knowledge and skills, and get the best learning experience
                they can get. Satisfied participants are key to the organizers'
                reputation, and by offering the best experience to participants,
                we benefit the organizers as well.
                 {/*========you can change Text from here===========*/}
              </p>
              <p>
                We are the pioneers in revolutionizing the way a contest is
                hosted. Kontess is the perfect place for your contests
                 {/*========you can change Text from here===========*/}
              </p>
            </div>
            <div className="about_lft">
              <img src={about_side1} />
              {/*========you can change image from here===========*/}
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default About;
