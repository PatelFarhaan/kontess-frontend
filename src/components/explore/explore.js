import React, { useEffect } from "react";
import Footer from "../footer/footer";
import PagesBanner from "../pages_banner/PagesBanner";
import MainHeader from "../header/header";
import SearchFilter from "../explore/SearchFilter";
import Pagination from "../pagination/pagination";
import ResultsCard from "./ResultsCard";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Explore = props => {
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])
  return (
    <>
    <Helmet htmlAttributes>
        <html lang="en" />
        <meta charset="utf-8" />
        <link rel="icon" href="/public/favicon.ico" />
        <title>Explore Contests | Kontess</title>
        <meta name="description" content="Explore and participate in online competitions for students or 
        professionals. Compete, learn and collaborate with Kontess competitions. All competitions are hosted 
        with Kontess, the online participant-centric contest solution." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
      <MainHeader innerHeader="inner_header" {...props}></MainHeader>
      <PagesBanner
        className="explore_banner"
        title="Explore"
        parentDir="Home"
        currentDir="Explore"
      ></PagesBanner>
      <section class="filter">
        <div class="container">
          <SearchFilter></SearchFilter>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="available_row">
            <p className="avalble">
              1 <span>Result available </span>
              <Link to="/contact"  class="default_btn add_compition">Add your competition</Link>
            </p>
            <div className="sort_col">
              <p>
                Sort <span>By</span>
              </p>
              <select>
                <option>Relevant </option>
                <option>Popularity</option>
                <option>Highest rating </option>
                <option>Recently posted</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <ResultsCard></ResultsCard>
          <div className="pagnation_row">
            <Pagination></Pagination>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default Explore;
