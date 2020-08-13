import React from 'react';
import { Link } from "react-router-dom";
import {logo} from '../../imagepath.js';


const Logo = () =>{
    return (
      <Link to="/" className="logo">
        <img src={logo} alt="logo" />
      </Link>
    );
}

export default Logo;