import React, { useState, useRef, ReactNode } from "react";
import { selectType } from "../util/customTypes";
import Circle from "../elements/circle";

import CanvasContext from "./canvasContext";
const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [selectedObject, setSelectedObject] = useState<selectType>(null);

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        circles,
        setCircles,
        selectedObject,
        setSelectedObject,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;
