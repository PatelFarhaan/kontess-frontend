

import React from "react";

export default class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: "no timestamp yet"
    };
  }

  render() {
    return (
      <div className="chat-page">
        <div className="table-wrapper">
          <table className="message-table">
            <tbody>
              <tr>
                <td>
                  <div className="recieve-message">Message to</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="send-message">Message from</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="message-field">
          <input placeholder="Type your message..."></input>
          <button>Send</button>
        </div>
      </div>
    );
  }
}
