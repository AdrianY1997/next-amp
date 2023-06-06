"use client";

import banner1 from "@/public/img/home-banner-1.png";
import banner2 from "@/public/img/home-banner-2.png";
import banner3 from "@/public/img/home-banner-3.png";

import FaIcon from "@/component/faIcon";
import Image from "next/image";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const HomeCarousel = () => {
  const [banner, setBanner] = useState(banner1);
  const [bannerIndex, setBannerIndex] = useState(1);

  const toggleBanner = (n) => {
    const images = document.querySelectorAll(".home-carousel-image");
    let index = document.querySelector(".home-carousel-image:not(.hidden)");

    images.forEach((e, i) => e.classList.add("hidden"));

    index = parseInt(index.getAttribute("data-index")) - 1 + n;
    if (index < 0) index = 2;
    if (index > 2) index = 0;
    images[index].classList.remove("hidden");
  };

  return (
    <>
      <div className="relative max-w-[1800px] mx-auto">
        <Image
          alt="feature 1"
          priority
          className="animate-fade-out home-carousel-image"
          src={banner1}
          data-index={1}
        />
        <Image
          alt="feature 2"
          priority
          className="animate-fade-out home-carousel-image hidden"
          src={banner2}
          data-index={2}
        />
        <Image
          alt="feature 3"
          priority
          className="animate-fade-out home-carousel-image hidden"
          src={banner3}
          data-index={3}
        />
        <div className="container absolute w-full left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
          <span
            onClick={(e) => {
              toggleBanner(-1);
            }}
            className="w-10 h-10 flex justify-center items-center absolute top-1/2 -translate-y-1/2 cursor-pointer p-4 rounded-full bg-white shadow-md shadow-gray"
          >
            <FaIcon icon={faArrowLeft} size={"10px"} />
          </span>
          <span
            onClick={(e) => {
              toggleBanner(1);
            }}
            className="w-10 h-10 flex justify-center items-center absolute top-1/2 -translate-y-1/2 cursor-pointer right-0 p-4 rounded-full bg-white shadow-md shadow-gray"
          >
            <FaIcon icon={faArrowRight} size={"10px"} />
          </span>
        </div>
      </div>
    </>
  );
};

export default HomeCarousel;
