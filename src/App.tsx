import React, {useState} from 'react';
import { Canvas } from "./components/Canvas";

function App() {
  const [lineWidth, setLineWidth] = useState<number>(5);
  const [strokeColor, setStrokeColor] = useState<string>("black");
  const [canvasBackground, setCanvasBackground] = useState<string>("white");


  return (
    <div className=" border h-40 w-96 ">
      <Canvas lineWidth={lineWidth} strokeColor={strokeColor} backgroundColor={canvasBackground }/>
    </div>
  );
}

export default App;
