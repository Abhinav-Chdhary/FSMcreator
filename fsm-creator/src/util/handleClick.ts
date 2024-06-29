import Circle from "../classes/circle";
import Link from "../classes/link";
import { selectType } from "./customTypes";
import { redraw } from "./redraw";

export function handleClickOnCanvas(
  event: MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  circles: Circle[],
  links: Link[],
  selectedObject: selectType,
  setSelectedObject: React.Dispatch<React.SetStateAction<selectType>>,
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  let deselect: boolean = true;

  circles.forEach((circle) => {
    if (circle.isCircle(x, y)) {
      deselect = false;
      setSelectedObject(circle);
      redraw(ctx, circles, links, canvas, circle);
      const inputBox = document.getElementById("textEditor") as HTMLInputElement;
      if (inputBox) {
        setInputValue(circle.textContent);
        inputBox.style.top = `${y}px`;
        inputBox.style.left = `${x}px`;
        inputBox.focus();
      }
    }
  });

  if (deselect) {
    setSelectedObject(null);
  }
}
