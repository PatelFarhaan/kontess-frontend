import React, { useEffect } from "react";
import PagesBanner from "../pages_banner/PagesBanner";
import MainHeader from "../header/header";
import {Link} from "react-router-dom";
import {limited_offer,mobile_lock} from "../../imagepath";
import Footer from "../footer/footer";

const Pricing = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return(
        <>
            <MainHeader innerHeader="inner_header"></MainHeader>
            <PagesBanner
            className="blog_banner"
            title="Pricing"
            parentDir="Home"
            currentDir="Pricing"
            ></PagesBanner>
            <section className="home_table">
                <div className="container">
                    <div className="pricing_tbl_heading">
                        <h2 className="pri_head">
                            Management<span> fee per </span> contest
                        </h2>
                    </div>
                    <div className="table_wrap table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Number of Participants</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1-10</td>
                                    <td>Free</td>
                                </tr>
                                <tr>
                                    <td>11-50</td>
                                    <td>$500</td>
                                </tr>
                                <tr>
                                    <td>51-100</td>
                                    <td>$1000 </td>
                                </tr>
                                <tr>
                                    <td>101-300 </td>
                                    <td>$1500</td>
                                </tr>
                                <tr>
                                    <td>301+</td>
                                    <td>$2000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {/* <div className="alert alert-info limited_offer alert-dismissible">
                <Link to="#" className="close" data-dismiss="alert" aria-label="close">
                    ×
                </Link>
                <div className="container">
                    <div className="limited_row">
                    <div className="limited_lft">
                        <img src={limited_offer} alt='' />
                    </div>
                    <div className="limited_rgt">
                        <p>
                        Get up to <span> 20% off </span> for your own dedicated platform Offer
                        limited to the first <span>10 </span> customers.
                        </p>
                    </div>
                    </div>
                </div>
            </div> */}
            <section className="register provide">
                <div className="container">
                    <div className="register_wrap">
                    <div className="register_text">
                        <h2 className="pri_head">
                        We will also <span>provide </span>:
                        </h2>
                        <ul className="blue_list">
                        <li>Subdomain name of your choice </li>
                        <li>Customized registration and invitation link </li>
                        <li> Dedicated admin account with your own credentials</li>
                        <li>Customizations to fit your brand</li>
                        <li>Customer service for you and for all participants </li>
                        </ul>
                        <Link to="/contact" className="default_btn">
                        Contact us
                        </Link>
                    </div>
                    <div className="register_img">
                        <img src={mobile_lock} alt=''/>
                    </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    );
}

export default Pricing;