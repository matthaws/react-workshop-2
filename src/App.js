import React, { Component } from "react";
import RenderPropsDemo from "./components/renderProps/renderProps.jsx";
import CompoundDemo from "./components/compoundComponents/compoundDemo.jsx";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="App">
        <CompoundDemo />
      </main>
    );
  }
}

export default App;
