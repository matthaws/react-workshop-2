import React, { Component } from "react";

const withMouseWatch = WrappedComponent => {
  return class extends Component {
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
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  };
};

export default withMouseWatch;
