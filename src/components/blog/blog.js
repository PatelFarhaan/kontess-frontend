import React, { useEffect } from "react";
import BlogList from "./BlogList";
import Sidebar from "../sidebar/sidebar";
import MainHeader from "../header/header";
import { Helmet } from "react-helmet";
import PagesBanner from "../pages_banner/PagesBanner";
import Footer from "../footer/footer";
import Pagination from "../pagination/pagination";
const Blog = props => {
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])
  return (
    <>
    <Helmet htmlAttributes>
        <html lang="en" />
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <title>The Kontess Blog: for Contest People</title>
        <meta name="description" content="Looking for information on how to host a contest online, 
        get your participants engaged, or scale your existing competition? Well you’ve come to the 
        right place! Welcome to the Kontess Blog, your knowledge base on all things related to contest 
        and competition management and participant experiences. " />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
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
