import React, { useEffect } from "react";
import MainHeader from "../header/header";
import PagesBanner from "../pages_banner/PagesBanner";
import {
  dummy1,
  reward_icon,
  g1,
  g2,
  g3,
  g4,
  g5,
  g6,
  g8,
  g9,
  g10,
  g12,
  sponsor1,
  sponsor2,
  sponsor3
} from "../../imagepath";
import { Link } from "react-router-dom";
import CommentForm from "../contact/CommentForm";
import SocailMedia from "../SocialMedia/SocialMedia";
import BlogComments from "../blog/blogComments";
import Footer from "../footer/footer";
import SponsorsSlider from "../testimonials/SponsorsSlider";

const ExploreDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])
  let socialList = [
    {
      link: "#",
      socialClass: "fa-facebook",
      socialName: "Facebook"
    },
    {
      link: "#",
      socialClass: "fa-twitter",
      socialName: "Twitter"
    },
    {
      link: "#",
      socialClass: "fa-google-plus",
      socialName: "Google +"
    },
    {
      link: "#",
      socialClass: "fa-pinterest",
      socialName: "Pinterest"
    },
    {
      link: "#",
      socialClass: "fa-envelope",
      socialName: "Email"
    }
  ];

  let galleryData = [
    { name: "An old greenhouse", image: g1 },
    { name: "Purple wildflowers", image: g2 },
    { name: "A birdfeeder", image: g3 },
    { name: "Crocus close-up", image: g4 },
    { name: "The garden shop", image: g5 },
    { name: "Spring daffodils", image: g6 },
    { name: "Iris along the path", image: g8 },
    { name: "The garden blueprint", image: g9 },
    { name: "The patio", image: g10 },
    { name: "Winding garden path", image: g12 }
  ];

  return (
    <>
      <MainHeader innerHeader="inner_header"></MainHeader>
      <PagesBanner
        className="blog_banner"
        title="Explore Detail"
        parentDir="Home"
        currentDir="Explore Detail"
      ></PagesBanner>
      <section className="explore_detail">
        <div className="container">
          <div className="explore_detail_row">
            <div className="explore_detail_lft">
              <img src={dummy1} alt="" />
              <p className="accept_close">Closed</p>
            </div>
            <div className="explore_detail_rgt">
              <div className="top_row">
                <div className="wrap_university_name">
                  <h3>
                    <a href="explore_detail.html">University of Irvine</a>
                  </h3>
                  <h4>New Venture Competition</h4>
                </div>
                <div className="btns_grp">
                  <button type="button" className="default_btn">
                    Login
                  </button>
                  <button type="button" className="default_btn sign_btn">
                    Sign Up
                  </button>
                </div>
              </div>
              <div className="top_row">
                <p>
                  <i className="fa fa-map-marker" aria-hidden="true" /> Irvine, CA
                </p>
                {/* <ul className="star_row">
                  <li>
                    <i className="fa fa-star" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fa fa-star" aria-hidden="true" />
                  </li>
                  <li>5.0 (2)</li>
                </ul> */}

                {/*===============you can give rating from here===============*/}
              </div>
              <div className="top_row">
                <p className="type_business">Business</p>
                <p>Nov 2019 - May 2020 </p>
              </div>
            </div>
          </div>
          <p className="explore_comment">
          Calling All Creators, Inventors, and Aspiring Entrepreneurs!
          The UCI New Venture Competition offers you the opportunity to form a team, launch a 
          startup and potentially fund a business idea – all within seven months. The competition is
           open to all UCI students, staff members and researchers as well as community members. 
           Teams compete for $100,000 in cash prizes plus additional professional services!
          Competitors have full control and ownership over what their team creates. 
          We connect you with potential teammates, provide you with the tools to transform your
           idea into a concept, and even match teams with industry mentors to help you develop your 
           concept into a viable business.
          </p>
          {/* <div className="social_feild">
            <span className="single_comment">
              <i className="fa fa-comment-o" />
              12 comments
            </span>
            <div className="post_share">
              <span className="count_number_like">0</span>
              <Link
                to="#"
                className="post_like"
                data-post_id="#"
                title="Like"
                data-like="Like"
                data-unlike="Unlike"
              >
                <i className="fa fa-heart-o" />
              </Link>
            </div>
            <SocailMedia data={socialList}></SocailMedia>
          </div> */}
          {/* <div className="blog_comments">
            <div className="comment_title">
              <h4> COMMENTS</h4>
            </div>
            <BlogComments></BlogComments>
          </div> */}
          {/* <div className="blog_leave_comment">
            <div className="comment_title">
              <h4>LEAVE A COMMENT</h4>
            </div>
            <CommentForm></CommentForm>
          </div> */}

          {/*====YOU CAN SEE COMMENTS FIELD AND COMMENTS WHEN YOU UNCOMMEMT THE ABOVE CODE======*/}
          
        </div>
      </section>
      <section className="awards_section duration">
        <div className="container">
          <h2 className="pri_head ">
            Notable <span> Winners</span>
          </h2>
          <div className="our_process_row ">
            <div className="our_process_col">
              <img src={reward_icon} alt="" />
              <h3>2010</h3>
              <p>Incubation year</p>
            </div>
            <div className="our_process_col">
              <img src={reward_icon} alt="" />
              <h3>$100,000+</h3>
              <p>Total prize money</p>
            </div>
            <div className="our_process_col">
              <img src={reward_icon} alt="" />
              <h3>November to May</h3>
              <p>Duration</p>
            </div>
          </div>
        </div>
      </section>
      <SponsorsSlider></SponsorsSlider>
      <section className="awards_section duration">
        <div className="container">
          <h2 className="pri_head ">
            Winners <span> Name</span>
          </h2>
          <div className="winner_row">
            {[1, 2, 3].map((val, m) => (
              <div className="colllege_col" key={m}>
                <div className="col_row">
                  <a href="explore_detail.html">
                    <img className="col_image" src={dummy1} alt="" />
                  </a>
                </div>
                <div className="college_content">
                  <div className="wrap_contnt">
                    <div className="top_row">
                      <p>
                        <i className="fa fa-map-marker" aria-hidden="true" />{" "}
                        Main City, CA
                      </p>
                      <p>2018</p>
                    </div>
                    <h3>
                      <a href="explore_detail.html">Team name</a>{" "}
                    </h3>
                    <h4>{`${m + 1}st Place`}</h4>
                    <p>
                      In 2020, the team secured a series A funding from XYZ
                      Venture Capital
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <h2 className="pri_head ">
            Our <span> Gallery</span>
          </h2>
          <div className="wrap">
            {galleryData.map((data, k) => (
              <div className="box" key={k}>
                <div className="boxInner">
                  <img src={data.image} alt="" />
                  <div className="titleBox">{data.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer></Footer>
    </>
  );
};

export default ExploreDetails;
