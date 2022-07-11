import React, { useEffect, useState } from "react";
import carousel1 from "../assets/carousel-1.gif";
import carousel2 from "../assets/carousel-2.gif";
import carousel3 from "../assets/carousel-3.gif";
import "../App.css";

export const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const carouselArray = [carousel1, carousel2, carousel3];

  useEffect(() => {
    console.log(current);
  }, [current]);

  useEffect(() => {
    const id = setTimeout(
      () => setCurrent((current + 1) % carouselArray.length),
      5000
    );
    return () => {
      clearInterval(id);
    };
  }, [current, carouselArray.length]);

  return (
    <section className="slider">
      {carouselArray.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide-active" : "slide"}
            key={index}
          >
            {index === current && (
              <img src={slide} alt={index} className="image" />
            )}
          </div>
        );
      })}
    </section>
  );
};
