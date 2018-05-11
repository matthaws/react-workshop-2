import React from "react";
import PropTypes from "prop-types";

export const Viewport = ({ slide }) => {
  return <section className="viewport">{slide.text}</section>;
};

Viewport.propTypes = {
  slide: PropTypes.object.isRequired
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
  slides: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  currentSlide: PropTypes.number.isRequired
};
