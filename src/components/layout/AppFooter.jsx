import React, { useEffect, useState } from "react";

function AppFooter() {
  const [version, setVersion] = useState("");

  useEffect(() => {
    fetch("/VERSION")
      .then(res => res.ok ? res.text() : "")
      .then(text => setVersion(text.trim()))
      .catch(() => setVersion(""));
  }, []);

  return (
    <footer className="bg-gradient-to-r from-purple-400/70 via-teal-500/60 to-sky-500/70 backdrop-blur-md text-white p-4">
      <div className="flex justify-center items-center space-x-6">
        <p>PicKasa - Tu hogar, tu elección</p>
        <p>{version && `v${version}`}</p>
        <p>
          By{" "}
          <a
            href="https://carlosgrande.me/about-me-carlos-grande/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-200 transition"
          >
            charlstown
          </a>
        </p>
      </div>
    </footer>
  );
}

export default AppFooter;
