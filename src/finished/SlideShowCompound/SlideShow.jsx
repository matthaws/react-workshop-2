import React, { Component } from "react";
import PropTypes from "prop-types";

class SlideShow extends Component {
  state = {
    currentSlide: this.props.currentSlide
  };

  static Viewport = Viewport;
  static ProgressBar = ProgressBar;

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

    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        slide,
        handleClick: this.handleClick,
        slides,
        currentSlide
      })
    );
    return <section className="slide-show">{children}</section>;
  }
}
export default SlideShow;
