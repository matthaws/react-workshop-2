import React from "react";
import SlideShow from "./SlideShowContext/SlideShow";
import "./context.css";

const ContextDemo = () => {
  return (
    <section>
      <SlideShow>
        <div className="style-div">
          <SlideShow.ProgressBar />
        </div>
        <div className="style-div">
          <SlideShow.Viewport />
          <SlideShow.ProgressBar />
        </div>
      </SlideShow>
    </section>
  );
};

export default ContextDemo;
