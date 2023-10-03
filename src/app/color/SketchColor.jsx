import { useState } from "react";
import { Sketch } from "@uiw/react-color";

export default function SketchColor({getColor, startColor}) {
  const [hex, setHex] = useState(startColor || "#d0021b");
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      {/* <h1>{hex}</h1> */}
      <Sketch
        color={hex}
        onChange={(color) => {
          setHex(color.hex);
          getColor(color.hex);
        }}
      />
    </div>
  );
}
