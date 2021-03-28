import React from "react";
import "../App.css";
import Nav from "../components/chat/nav/Nav";
import ChatBody from "../components/chat/chatBody/ChatBody";

function ChatMessenger() {
  return (
    <div className="__main">
      <Nav />
      <ChatBody />
    </div>
  );
}

export default ChatMessenger;