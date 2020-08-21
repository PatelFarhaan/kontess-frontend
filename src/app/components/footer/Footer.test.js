/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import { shallow } from "enzyme";

import Footer from "./Footer";

describe("<Footer />", () => {
  it("should render the copyright notice", () => {
    const renderedComponent = shallow(<Footer />);
    expect(
      renderedComponent.contains(
        <section>This project is licensed under the MIT license.</section>
      )
    ).toBe(true);
  });

  it("should render the credits", () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.text()).toContain("Dinesh Pandiyan");
  });
});
