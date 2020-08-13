import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./routes/routes";
import 'font-awesome/css/font-awesome.min.css';
import '../src/common/css/slick.css';
import '../src/common/css/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/common/css/style.css';


ReactDOM.render(
  <div className="page_wrapper wdth100">
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  </div>,
  document.querySelector("#root")
);