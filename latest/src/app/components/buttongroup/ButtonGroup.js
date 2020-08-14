
import React from "react";
class ButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
    this.onButtonChange = this.onButtonChange.bind(this);
  }

  onButtonChange(e) {
    this.setState({ selected: parseInt(e.target.id) });
    this.props.modeHandler(e.currentTarget.textContent);
  }

  render() {
    return (
      <div className={`btn-group ` + this.props.className}>
        <button
          id={0}
          className={this.state.selected === 0 && "selected"}
          onClick={this.onButtonChange}
        >
          Participant
        </button>
        <button
          id={1}
          className={this.state.selected === 1 && "selected"}
          onClick={this.onButtonChange}
        >
          Judge
        </button>
        <button
          id={2}
          className={this.state.selected === 2 && "selected"}
          onClick={this.onButtonChange}
        >
          Organizer
        </button>
      </div>
    );
  }
}

export default ButtonGroup;
