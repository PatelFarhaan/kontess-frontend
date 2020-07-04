import React,{useState} from "react";
import Logo from "../header/logo";
import { phone } from "../../imagepath";
import { Link } from "react-router-dom";

const MainHeader = props => {
  const [isToggle,setToggle] = useState(false)
  console.log("propssss", props);
  let activeHeader = props.location ? props.location.pathname : "";
  console.log("activeHeader", activeHeader);

  return (
    <header className={props.innerHeader}>
      <div className="container cstm_container">
        <div className="header_wrap">
          <div className="header_lft">
            <Logo></Logo>
            <div className={`menu_wrap ${isToggle ? 'menu_open' : ''}`} >
              <ul className="header_menu">
                <li className={activeHeader === "/" ? "active" : ""}>
                  <Link to="/">home</Link>
                </li>
                <li className={activeHeader === "/solutions" ? "active" : ""}>
                  <Link to="/solutions">solutions</Link>
                </li>
                <li className={activeHeader === "/explore" ? "active" : ""}>
                  <Link to="/explore">explore</Link>
                </li>
                <li className={activeHeader === "/about" ? "active" : ""}>
                  <Link to="/about">about</Link>
                </li>
                <li className={activeHeader === "/blog" ? "active" : ""}>
                  {" "}
                  <Link to="/blog">blog</Link>
                </li>
                <li
                  className={
                    activeHeader === "/pricing"
                      ? "desk_none active"
                      : "desk_none"
                  }
                >
                  <Link to="/pricing" className="header_btn tansp_btn">
                    Pricing
                    <span>
                      <i className="fa fa-usd" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
                <li
                  className={
                    activeHeader === "/contact"
                      ? "desk_none active"
                      : "desk_none"
                  }
                >
                  <Link to="/contact" className="header_btn blue_grad_btn">
                    Contact Us
                    <span>
                      <img src={phone} alt="" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="header_rgt mob_none">
            <Link to="/pricing" className="header_btn tansp_btn ">
              Pricing
              <span>
                <i className="fa fa-usd" aria-hidden="true" />
              </span>
            </Link>
            <Link to="/contact" className="header_btn blue_grad_btn ">
              Contact Us
              <span>
                <img src={phone} alt="" />
              </span>
            </Link>
          </div>
          <div className="desk_none mob_none">
            <button type="button" className="mob_toggle_btn" onClick={()=>setToggle(!isToggle)}>
              <i className="fa fa-bars" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
