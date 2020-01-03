/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import ButtonGroup from "../buttongroup/ButtonGroup";
class Modal extends React.Component {
  render() {
    return (
      <div className="modal-background">
        <div className="modal-wrapper">
          <div className="auth-modal">{this.props.children}</div>
          <ButtonGroup
            className="menu-bar"
            modeHandler={this.props.modeHandler}
          />
        </div>
      </div>
    );
  }
}

export default Modal;
