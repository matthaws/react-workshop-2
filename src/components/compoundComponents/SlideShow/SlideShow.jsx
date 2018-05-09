import React, { Component } from "react";
import PropTypes from "prop-types";

class SlideShow extends Component {
  state = {
    currentSlide: this.props.currentSlide
  };

  static defaultProps = {
    currentSlide: 0,
    slides: [{ text: "1" }, { text: "2" }, { text: "3" }, { text: "4" }]
  };

  static propTypes = {
    currentSlide: PropTypes.number.isRequired,
    slides: PropTypes.array
  };

  handleClick = slideNum => () => {
    let newSlide = this.state.slide + 1;
    if (newSlide === this.props.slides.length) {
      newSlide = 0;
    }

    this.setState({ currentSlide: slideNum });
  };

  render() {
    const { currentSlide } = this.state;
    const { slides } = this.props;
    const slide = slides[currentSlide];

    return (
      <section className="slide-show">
        <Viewport slide={slide} />
        <ProgressBar
          handleClick={this.handleClick}
          slides={slides}
          currentSlide={currentSlide}
        />
      </section>
    );
  }
}

export default SlideShow;

const Viewport = ({ slide }) => {
  return <section className="viewport">{slide.text}</section>;
};

const ProgressBar = ({ slides, handleClick, currentSlide }) => {
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
