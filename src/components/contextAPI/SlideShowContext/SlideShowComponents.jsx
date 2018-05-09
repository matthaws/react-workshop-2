import React from "react";
import SlideShowContext from "./SlideShowContext";

export const Viewport = () => (
  <SlideShowContext.Consumer>
    {({ slide }) => <section className="viewport">{slide.text}</section>}
  </SlideShowContext.Consumer>
);

export const ProgressBar = ({ slides, handleClick, currentSlide }) => {
  return (
    <SlideShowContext.Consumer>
      {({ slides, handleClick, currentSlide }) => {
        const progressItems = slides.map((slide, idx) => {
          const className = currentSlide === idx ? "active slide" : "slide";
          return (
            <li onClick={handleClick(idx)} className={className}>
              {slide.text}
            </li>
          );
        });
        debugger;
        return <ul className="progress-bar">{progressItems}</ul>;
      }}
    </SlideShowContext.Consumer>
  );
};
