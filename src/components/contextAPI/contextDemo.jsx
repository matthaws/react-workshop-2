import React from "react";
import SlideShow from "./SlideShow/SlideShow";
import "./context.css";

const ContextDemo = () => {
  return (
    <section>
      <SlideShow>
        <SlideShow.ProgressBar />
        <div className="cool-styles">
          <SlideShow.Viewport />
          <SlideShow.ProgressBar />
        </div>
      </SlideShow>
    </section>
  );
};

export default ContextDemo;
