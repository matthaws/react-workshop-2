import React, { Component } from "react";
import MouseTracker from "./MouseTracker";
import "./renderProps.css";

const error = null;

const RenderPropsDemo = () => (
  <section>
    <EnhancedInput label="Demo Input" error={error}>
      <input type="text" />
    </EnhancedInput>
  </section>
);

export default RenderPropsDemo;

class EnhancedInput extends Component {
  uniqueId() {
    return Math.random()
      .toString(36)
      .substr(2, 16);
  }

  render() {
    const inputProps = {
      id: this.uniqueId(),
      className: this.props.error ? "input error" : "input"
    };
    return (
      <div>
        <label htmlFor={inputProps.id}>{this.props.label}</label>
        {this.props.children}
        {this.props.error ? <span>{this.props.error}</span> : null}
      </div>
    );
  }
}
