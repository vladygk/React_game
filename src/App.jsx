import data from "./data.jsx";
import React from "react";
import "./App.scss";
import Box from "./Box.jsx";
export default function App() {
  const [boxes, setBoxes] = React.useState(data);

  function toggle(id) {
    setBoxes((prevBoxes) => {
      return prevBoxes.map((box) => {
        return box.id === id ? { ...box, on: !box.on } : box;
      });
    });
  }

  const boxElements = boxes.map((x) => (
    <Box key={x.id}  on={x.on} clickHandler={()=>toggle(x.id)} />
  ));

  return <div className="box-container">{boxElements}</div>;
}
