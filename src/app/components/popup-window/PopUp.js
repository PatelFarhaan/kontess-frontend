/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";

export default class PopUp extends React.Component {
  render() {
    return (
      <div className="popup-bg">
        <div className="popup-window">
          <h2>Create new todo item</h2>
          {/* TODO: add a check when closing this pop-up */}
          <button
            onClick={event => {
              this.toggleNewTodoPopUp();
              event.preventDefault();
            }}
          >
            Close
          </button>
          <button
            onClick={event => {
              this.updateList("info");
              event.preventDefault();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
