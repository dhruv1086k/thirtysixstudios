import { useState } from "react";
import Canvas from "./Canvas";
import data from "./data";

export default function App() {
  const [showCanvas, setShowCanvas] = useState(true);
  return (
    <>
      <div>
        {showCanvas &&
          data[0].map((imageData, index) => <Canvas details={imageData} />)}
      </div>
    </>
  );
}
