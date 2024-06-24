import Circle from "../elements/circle";
import { selectType } from "./customTypes";

export function handleShiftDrag(
    ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  event: KeyboardEvent,
  selectedObject: selectType
) {
    let isDragging = false;
    c1: Circle;
    c2: Circle;
    const handleMouseDown = (event:MouseEvent)=>{
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX-rect.left;
        const y = event.clientY-rect.top;
        if(selectedObject instanceof Circle && selectedObject.isCircle(x, y)){
            isDragging = true;
        }
    }
  if (event.shiftKey) {
    console.log("Shift pressed", selectedObject);
  }
  
}
