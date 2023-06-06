"use client";

import WebFooter from "@/component/static/web/footer/footer";
import WebHeader from "@/component/static/web/header/header";
import { useEffect, useState } from "react";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

const WebLayout = ({ children }) => {
  const [minHeight, setMinHeight] = useState("0");

  useEffect(() => {
    const headerHeight = document.querySelector("header").clientHeight;
    const footerHeight = document.querySelector("footer").clientHeight;

    setMinHeight(headerHeight + footerHeight);
  });

  return (
    <>
      <header>
        <WebHeader />
      </header>
      <main style={{ minHeight: `calc(100vh - ${minHeight}px)` }}>
        {children}
      </main>
      <footer>
        <WebFooter />
      </footer>
    </>
  );
};

export default WebLayout;
