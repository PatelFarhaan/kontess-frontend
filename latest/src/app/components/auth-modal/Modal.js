
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
