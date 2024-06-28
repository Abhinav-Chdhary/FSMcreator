import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Circle from "../classes/circle";
import { selectType } from "../util/customTypes";

interface CanvasState {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  circles: Circle[];
  selectedObject: selectType;
  setCircles: (circles: Circle[] | ((circles: Circle[]) => Circle[])) => void;
  setSelectedObject: (selectedObject: selectType) => void;
}

const useCanvasStore = create<CanvasState>()(
  devtools((set) => ({
    canvasRef: { current: null },
    circles: [],
    selectedObject: null,
    setCircles: (circles) =>
      set((state) => ({
        circles:
          typeof circles === "function" ? circles(state.circles) : circles,
      })),
    setSelectedObject: (selectedObject: selectType) => set({ selectedObject }),
  }))
);

export default useCanvasStore;
