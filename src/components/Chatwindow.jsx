import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Messageinput from "./Messageinput";
import { v4 as uuidv4 } from "uuid";

const Chatwindow = () => {
  const [sessionId, setSessionId] = useState(uuidv4());
  const [messages, setMessages] = useState([]);
  const localkey = import.meta.env.LOCAL_KEY;
  const saveSession = (id, msgs) => {
    const sessions = JSON.parse(localStorage.getItem(localkey)) || {};
    sessions[id] = msgs;
    localStorage.setItem(localkey, JSON.stringify(sessions));
  };

  const startNewSession = () => {
    if (messages.length > 0) {
      saveSession(sessionId, messages);
    }
    setSessionId(uuidv4());
    setMessages([]);
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 fixed top-0 left-0 bottom-0 z-40">
        <Sidebar onNewChat={startNewSession} />
      </div>
      <div className="flex flex-col flex-1 ml-64">
        <div className="h-16 fixed top-0 left-64 right-0 z-50 bg-white border-b border-gray-200 shadow-sm flex items-center px-4">
          <Header />
        </div>
        <div className="flex-1 pt-16 overflow-y-auto p-4">
          <Messageinput
            sessionId={sessionId}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatwindow;
