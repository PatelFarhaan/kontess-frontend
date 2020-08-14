import openSocket from "socket.io-client";
import * as session from "../../utils/session";

// const socket = openSocket("http://localhost:4001");
const socket = "??";

export default {
  init: () => {
    socket.on("connect", () => {
      const userInfo = {
        id: session.getUserType() + session.getSessionUserId()
      };
      socket.emit("init", JSON.stringify(userInfo));
    });
  },

  susbcribe: cb => {
    socket.on("receiveMessage", incomingMsgJSON => {
      const incomingMsg = JSON.parse(incomingMsgJSON);
      cb(incomingMsg);
    });
  },

  sendMessage: (message, cb) => {
    const chatMessage = {
      text: message,
      from: session.getUserType() + session.getSessionUserId()
    };
    socket.emit("sendMessage", JSON.stringify(chatMessage));
    cb(message);
  }
};
