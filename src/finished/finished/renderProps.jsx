import React from "react";
import MouseWatch from "./withMouseWatch";
import cat from "../../../assets/cat-13.png";

const RenderPropsDemo = () => {
  return <MouseWatch render={(x, y) => <ShowPosition x={x} y={y} />} />;
};

export default RenderPropsDemo;

const ShowPosition = ({ x, y }) => (
  <p style={{ position: "fixed", top: 0, left: 0 }}>
    x: {x}, y: {y}
  </p>
);

const MousePosition = ({ x, y }) => (
  <img
    style={{ position: "absolute", top: y - 100, left: x, height: "100px" }}
    src={cat}
  />
);
