import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../components/home/app";
import About from "../components/about/about";
import Explore from "../components/explore/explore";
import Blog from "../components/blog/blog";
import BlogDetails from "../components/blog/BlogDetails";
import Solution from "../components/solutions/solution";
import Contact from "../components/contact/contact";
import Pricing from "../components/pricing/pricing";
import ExploreDetails from "../components/explore/ExploreDetails";

let history = createBrowserHistory();

const PageRoutes = () => {
  return (
    <Router history={history}>
      <switch>
        <Route path="/" exact component={App}></Route>
        <Route path="/solutions" exact component={Solution}></Route>
        <Route path="/explore" exact component={Explore}></Route>
        <Route path="/about" exact component={About}></Route>
        <Route path="/blog" exact component={Blog}></Route>
        <Route path="/contact" exact component={Contact}></Route>
        <Route path="/blog-details" exact component={BlogDetails}></Route>
        <Route path="/pricing" exact component={Pricing}></Route>
        <Route path="/explore-details" exact component={ExploreDetails}></Route>
      </switch>
    </Router>
  );
};

export default PageRoutes;
