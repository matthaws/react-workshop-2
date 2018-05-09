import React, { Component } from "react";
import compose from "lodash/fp/compose";
import withLoader from "./withLoader.jsx";
import withLogger from "./withLogger.jsx";

const withButton = customOnClick => {
  return class Button extends Component {
    render() {
      return (
        <button onClick={customOnClick} className="button">
          {this.props.children}
        </button>
      );
    }
  };
};

export default HOCDemo;
