import React from "react";
import SlideShow from "./SlideShow/SlideShow";
import "./compound.css";

const CompoundDemo = () => (
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

export default CompoundDemo;
