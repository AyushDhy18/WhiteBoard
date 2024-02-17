import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import {
  FaPen,
  FaEraser,
  FaRegSave,
  FaUndoAlt,
  FaUpload,
} from "react-icons/fa";
import { GrClear } from "react-icons/gr";

const Board = () => {
  const canvasRef = useRef();
  const [color, setColor] = useState("#000000");
  const [brushRadius, setBrushRadius] = useState(5);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleBrushRadiusChange = (e) => {
    setBrushRadius(e.target.value);
  };

  const handleSave = () => {
    const drawing = canvasRef.current.getSaveData();
    localStorage.setItem("Saved_Drawing", drawing);
    console.log("Drawing saved to localStorage:", drawing);
  };

  const handleLoad = () => {
    const SavedDrawing = localStorage.getItem("Saved_Drawing");
    if (SavedDrawing) {
      canvasRef.current.loadSaveData(SavedDrawing);
    } else {
      alert("NO Drawing Saved to Load !!");
    }
  };

  const handleUndo = () => {
    canvasRef.current.undo();
  };

  const handleClear = () => {
    canvasRef.current.clear();
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>Adjust size</h3>
        <input
          type="range"
          min="1"
          max="400"
          onChange={handleBrushRadiusChange}
        />

        <h5 style={{}}>{brushRadius}</h5>
      </div>

      <div
        style={{
          display: "flex",

          alignItems: "center",
          zIndex: "10",
        }}
      >
        {/* Menu Bar  */}
        <div className="menuBar">
          <input type="color" onChange={handleColorChange} />

          <button
            onClick={(e) => {
              setColor("#FFFFFF");
            }}
            style={{ color: `rgb(254 225 70)` }}
          >
            <FaEraser />
          </button>

          <button
            onClick={(e) => {
              setColor("#000000");
            }}
            style={{ color: `rgb(87 83 78)` }}
          >
            <FaPen />
          </button>

          <button onClick={handleSave} style={{ color: `blue` }}>
            <FaRegSave />
          </button>
          <button onClick={handleLoad} style={{ color: `rgb(180 83 9)` }}>
            <FaUpload />
          </button>
          <button onClick={handleUndo} style={{ color: `orange` }}>
            <FaUndoAlt />
          </button>
          <button onClick={handleClear} style={{ color: `red` }}>
            <GrClear />
          </button>
        </div>
        {/* ^ Menu Bar ^ */}

        <CanvasDraw
          ref={canvasRef}
          hideGrid
          lazyRadius={1}
          brushColor={color}
          brushRadius={brushRadius}
          loadTimeOffset={0}
          canvasWidth={window.innerWidth}
          canvasHeight={window.innerHeight}
        ></CanvasDraw>
      </div>
    </div>
  );
};
export default Board;
