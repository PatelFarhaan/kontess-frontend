import React, { useEffect } from "react";
import Footer from "../footer/footer";
import PagesBanner from "../pages_banner/PagesBanner";
import MainHeader from "../header/header";
import { Helmet } from "react-helmet";
import { about_side1, about_side2, contact_banner } from "../../imagepath";

const About = props => {
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])
  return (
    <>
    <Helmet htmlAttributes>
        <html lang="en" />
        <meta charset="utf-8" />
        <link rel="icon" href="/public/favicon.ico" />
        <title>About Us | Kontess</title>
        <meta name="description" content="We are dedicated to helping organizers improve these processes, 
        provide positive experiences to all parties, and continue to host these events even in the 
        unprecedented socially distanced world, while saving them time and money. We are more than just submission 
        management software.Kontess, the Contest Experience Platform, is the perfect place for your contests!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
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
                and were unsatisfied. When we told the organizers that we wanted 
                to help improve the way our competition was run, we discovered firsthand 
                what happens behind the scenes. We knew there was a better way to manage 
                a competitive event. Kontess, the platform that saves organizers time and 
                money while improving the participant experience, is dedicated to serving 
                all kinds of academic and professional competitions and providing positive, 
                competitive experiences!
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
                The Kontess team is composed of people from a number of different backgrounds 
                and walks of life, but we are united by our common goal, improving your contest 
                experience. We are pioneers in revolutionizing the way a contest is hosted. 
                Kontess, the Contest Experience Platform, is the perfect place for your contests! 
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
                In today's competitive world, contests are a great way to highlight top talent 
                and foster innovation. Unfortunately, the way these contests are held can be 
                inefficient, tedious, bring little satisfaction to participants, and not fit 
                within the constraints of social distancing. We are dedicated to helping organizers 
                improve these processes, provide positive experiences to all parties, and continue to host 
                these events even in the unprecedented socially distanced world, while saving them time and money. 
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
                Don’t forget, rivalry makes good friends! We help participants feel connected to their colleagues and 
                respected throughout the contest. With the use of in-app chat and video conferencing integrations, our 
                platform offers full transparency between organizers and participants, so they can get their questions 
                answered, connect with key people, and make new friends in the process. With Kontess, you can make a contest 
                where participants can easily apply their knowledge and skills, and get the best learning experience no matter 
                where they are physically located. Satisfied participants are key to your reputation as an organizer and key for 
                attracting new sponsors, so let us help you create a great contest experience.
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
