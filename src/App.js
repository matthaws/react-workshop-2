import React, { Component } from "react";
import RenderPropsDemo from "./components/renderProps/finished/renderProps.jsx";
import CompoundDemo from "./components/compoundComponents/compoundDemo.jsx";
import ContextDemo from "./components/contextAPI/contextDemo";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="App">
        <RenderPropsDemo />
      </main>
    );
  }
}

export default App;
