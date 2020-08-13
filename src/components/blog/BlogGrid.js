import React from 'react';
import { Link } from "react-router-dom";

const BlogGrid = () =>{
    return(
        <section className="blog_section_bottom">
            <div className="container">
                <div className="blog_card_wrap">
                    <div className="section_heding">
                        <h2>Check out our</h2>
                        <h3>Latest Blog Posts</h3>
                    </div>
                    <div className="blog_card_row">
                      <div className="blog_card_col hidden">
                        <p>17 JULY 2020</p>
                        <h4>How to improve participant experience while social distancing</h4>
                        <Link to="/blog-details">
                            Read more
                            <i className="fa fa-long-arrow-right" aria-hidden="true" />
                        </Link>
                        </div>
                        <div className="blog_card_col active">
                        <p>17 JULY 2020</p>
                        <h4>How to improve participant experience while social distancing</h4>
                        <Link to="/blog-details">
                            Read more
                            <i className="fa fa-long-arrow-right" aria-hidden="true" />
                        </Link>
                        </div>
                        <div className="blog_card_col hidden">
                        <p>17 JULY 2020</p>
                        <h4>How to improve participant experience while social distancing</h4>
                        <Link to="/blog-details">
                            Read more
                            <i className="fa fa-long-arrow-right" aria-hidden="true" />
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default BlogGrid;