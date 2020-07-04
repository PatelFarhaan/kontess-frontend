import React, { useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import MainHeader from "../header/header";
import PagesBanner from "../pages_banner/PagesBanner";
import Footer from "../footer/footer";
import CommentForm from "../contact/CommentForm";
import BlogSingle from "./BlogSingle";
import SocailMedia from "../SocialMedia/SocialMedia";
import BlogComments from "../blog/blogComments";
import {Link} from "react-router-dom";

const BlogDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])
    let socialList = [
      {
        link: "#",
        socialClass: "fa-facebook",
        socialName: "Facebook",
      },
      {
        link: "#",
        socialClass: "fa-twitter",
        socialName: "Twitter",
      },
      {
        link: "#",
        socialClass: "fa-google-plus",
        socialName: "Google +",
      },
      {
        link: "#",
        socialClass: "fa-pinterest",
        socialName: "Pinterest",
      },
      {
        link: "#",
        socialClass: "fa-envelope",
        socialName: "Email",
      }
    ];

  return (
    <>
      <MainHeader innerHeader="inner_header"></MainHeader>
      <PagesBanner
        className="blog_banner"
        title="Blogs"
        parentDir="home"
        currentDir="Blogs"
      ></PagesBanner>
      <section>
        <div className="container">
          <div className="blog_wrapper">
            <div className="blog_listing details">
              <div className="blog_col">
                <BlogSingle></BlogSingle>
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
                </div>
                <div className="blog_leave_comment">
                  <div className="comment_title">
                    <h4>LEAVE A COMMENT</h4>
                  </div>
                  <CommentForm></CommentForm>
                </div> */}

                {/*==============YOU CAN ADD COMMENTS HERE WHEN YOU UNCOMMENT THE CODE===========*/}
              </div>
            </div>
            <Sidebar></Sidebar>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default BlogDetails;
