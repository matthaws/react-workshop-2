import React, { Component } from "react";

class MouseWatch extends Component {
  state = { x: 0, y: 0 };

  componentDidMount() {
    window.addEventListener("mousemove", this.handleMove);
  }

  handleMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    });
  };

  render() {
    const { x, y } = this.state;
    return this.props.render(x, y);
  }
}

export default MouseWatch;
