import React, { useEffect } from "react";
import BlogList from "./BlogList";
import Sidebar from "../sidebar/sidebar";
import MainHeader from "../header/header";
import PagesBanner from "../pages_banner/PagesBanner";
import Footer from "../footer/footer";
import Pagination from "../pagination/pagination";
const Blog = props => {
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])
  return (
    <>
      <MainHeader innerHeader="inner_header" {...props}></MainHeader>
      <PagesBanner
        className="blog_banner"
        title="Blogs"
        parentDir="Home"
        currentDir="Blogs"
      ></PagesBanner>
      <section>
        <div className="container">
          <div className="blog_wrapper">
            <div className="blog_listing">
              <BlogList></BlogList>
              <Pagination></Pagination>
            </div>
            <Sidebar></Sidebar>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default Blog;
