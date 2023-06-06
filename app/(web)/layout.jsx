"use client";

import WebFooter from "@/component/static/web/footer/footer";
import WebHeader from "@/component/static/web/header/header";
import { useEffect } from "react";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

const WebLayout = ({ children }) => {
  useEffect(() => {
    const headerHeight = document.querySelector("header").clientHeight;
    const footerHeight = document.querySelector("footer").clientHeight;
  });

  return (
    <>
      <header>
        <WebHeader />
      </header>
      <main>{children}</main>
      <footer>
        <WebFooter />
      </footer>
    </>
  );
};

export default WebLayout;
