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
