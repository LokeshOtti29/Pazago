import { Share } from "lucide-react";
import React from "react";
import Toggle from "./Toggle";

const Header = () => {
  return (
    <div className="flex flex-row w-full justify-between items-center">
      <div className="font-bold">WeatherChatApp</div>
      <div className="flex flex-row items-center  justify-around mx-4">
        <div className="flex flex-row items-center px-2 justify-between">
          <Share className="w-5 h-5 text-gray-600" />
          <span>share</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900">
          <Toggle />
        </div>
        {/* <div className="ml-2">
          <button>Delete</button>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
