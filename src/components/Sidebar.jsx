import React from "react";

const Sidebar = ({ onNewChat }) => {
  return (
    <div className="h-full flex flex-col p-4 bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      <button
        onClick={onNewChat}
        className="px-4 py-2 bg-black text-gray text-sm rounded hover:bg-black"
      >
        + New Chat
      </button>
    </div>
  );
};

export default Sidebar;
