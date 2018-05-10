import React from "react";
import PropTypes from "prop-types";

export const Viewport = ({ slide }) => {
  return <section className="viewport">{slide.text}</section>;
};

Viewport.propTypes = {
  slide: PropTypes.obj.isRequired
};

export const ProgressBar = ({ slides, handleClick, currentSlide }) => {
  const progressItems = slides.map((slide, idx) => {
    const className = currentSlide === idx ? "active slide" : "slide";
    return (
      <li onClick={handleClick(idx)} className={className}>
        {slide.text}
      </li>
    );
  });

  return <ul className="progress-bar">{progressItems}</ul>;
};

ProgressBar.propTypes = {
  slides: PropType.array.isRequired,
  handleClick: PropType.func.isRequired,
  currentSlide: PropType.number.isRequired
};
