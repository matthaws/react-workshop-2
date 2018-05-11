import React, { Component } from "react";
import PropTypes from "prop-types";

class MouseWatch extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  };

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
    return <div>{this.props.render(x, y)}</div>;
  }
}

export default MouseWatch;
