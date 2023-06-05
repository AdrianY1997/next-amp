"use client";

import { useEffect } from "react";

let instance;

const componentDivMount = () => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.innerHTML = `
        function resizeMain() {
          const main = document.querySelector("main");
          const headerHeight = document.querySelector("header").clientHeight;
          const footerHeight = document.querySelector("footer").clientHeight;
  
          const height = headerHeight + footerHeight;
  
          main.style.setProperty("min-height", "calc(100vh - " + height + "px");
        }
        resizeMain();
        window.addEventListener("resize", resizeMain);
        (() => { resizeMain() })()
      `;
  instance.appendChild(script);
};

const FixMainHeight = () => {
  useEffect(() => {
    componentDivMount();
  });

  return <div ref={(el) => (instance = el)}></div>;
};

export default FixMainHeight;
