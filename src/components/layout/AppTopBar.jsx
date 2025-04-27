import React from "react";
import Logo from "../common/Logo.jsx";

function AppTopBar() {
  return (
    <div className="w-full h-14 bg-gradient-to-r from-purple-400/70 via-teal-500/60 to-sky-500/70 backdrop-blur-md flex items-center px-4 shadow">
      <a href="/">
        <Logo className="w-10 h-10 text-white cursor-pointer" />
      </a>
      <div className="m-auto">
        <span className="text-white text-xl font-bold">Pikasa</span>
        <span className="m-auto text-white text-sm ml-2 italic">Tu hogar, tu elección</span>
      </div>
    </div>
  );
}

export default AppTopBar;