import React from 'react';
import { Link } from "react-router-dom";

const BlogGrid = () =>{
    return(
        <section className="blog_section_bottom">
            <div className="container">
                <div className="blog_card_wrap">
                    <div className="section_heding">
                        <h2>To check our </h2>
                        <h3>Latest Blog</h3>
                    </div>
                    <div className="blog_card_row">
                        <div className="blog_card_col">
                        <p>June 5,2020</p>
                        <h4>An all-in-one solution for your awards.</h4>
                        <Link to="/">
                            View all
                            <i className="fa fa-long-arrow-right" aria-hidden="true" />
                        </Link>
                        </div>
                        <div className="blog_card_col active">
                        <p>June 5,2020</p>
                        <h4>An all-in-one solution for your awards.</h4>
                        <Link to="/">
                            View all
                            <i className="fa fa-long-arrow-right" aria-hidden="true" />
                        </Link>
                        </div>
                        <div className="blog_card_col">
                        <p>June 5,2020</p>
                        <h4>An all-in-one solution for your awards.</h4>
                        <Link to="/">
                            View all
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