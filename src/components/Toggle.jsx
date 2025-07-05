import React, { useEffect, useState } from "react";

const Toggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
      />
      <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative transition">
        <div
          className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transform transition-transform ${
            isDark ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </div>
      <span className="ml-2 text-sm text-gray-800 dark:text-gray-200">
        {isDark ? "Dark" : "Light"}
      </span>
    </label>
  );
};

export default Toggle;
