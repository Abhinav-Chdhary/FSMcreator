import React, {
  createContext,
} from "react";
import Circle from "../elements/circle";
import { selectType } from "../util/customTypes";

interface CanvasContextType {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  circles: Circle[];
  setCircles: React.Dispatch<React.SetStateAction<Circle[]>>;
  selectedObject: selectType;
  setSelectedObject: React.Dispatch<React.SetStateAction<selectType>>;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export default CanvasContext;
