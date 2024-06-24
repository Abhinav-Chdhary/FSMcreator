import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import Circle from "../elements/circle";
import { selectType } from "../util/customTypes";

interface CanvasContextType {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;
  circles: Circle[];
  setCircles: React.Dispatch<React.SetStateAction<Circle[]>>;
  selectedObject: selectType;
  setSelectedObject: React.Dispatch<React.SetStateAction<selectType>>;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [selectedObject, setSelectedObject] = useState<selectType>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        setCtx(context);
      }
    }
  }, []);

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        ctx,
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

export { CanvasContext, CanvasProvider };
