import React from 'react';
import { Link } from "react-router-dom";
import {kontess_logo} from '../../imagepath.js';


const Logo = () =>{
    return (
      <Link to="/" className="logo">
        <img src={kontess_logo} alt="logo" />
      </Link>
    );
}

export default Logo;