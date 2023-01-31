import React from "react";

export default function Box(props) {
  

  let className;
  if(props.victory){
    className = "win-box";
  }else if(props.locked){
    className = "box locked";
  }else if(!props.locked){
    className = "box";
  }
 

  return (
    <>
      <div
        className={className}
        
        onClick={()=>props.clickHandler(props.id)}
      >{props.value}</div>
    </>
  );
}
