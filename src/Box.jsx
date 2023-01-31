import React from "react";

export default function Box(props) {
  

  const color = { backgroundColor: props.on ? "white" : "black" };

  return (
    <>
      <div
        className="box"
        style={color}
        onClick={props.clickHandler}
      ></div>
    </>
  );
}
