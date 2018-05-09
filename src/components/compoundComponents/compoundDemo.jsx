import React from "react";
import SlideShow from "./SlideShowCompound/SlideShow";
import "./compound.css";

const CompoundDemo = () => (
  <section>
    <SlideShow>
      <SlideShow.ProgressBar />
      <SlideShow.Viewport />
      <SlideShow.ProgressBar />
    </SlideShow>
  </section>
);

export default CompoundDemo;
