import React from "react";
import Logo from "../common/Logo.jsx";

function AppTopBar() {
  return (
    <div className="w-full h-14 bg-gradient-to-r from-purple-400/70 via-teal-500/60 to-sky-500/70 backdrop-blur-md flex items-center px-4 shadow">
      <a className="flex items-center gap-3 m-auto" href="/">
        <Logo className="w-10 h-10 text-white cursor-pointer" />
        <span className="text-white text-xl font-bold">PicKasa</span>
      </a>
    </div>
  );
}

export default AppTopBar;
