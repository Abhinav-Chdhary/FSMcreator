import {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { handleDoubleClick } from "../util/handleDoubleClick";
import { handleClickOnCanvas } from "../util/handleClick";
import { selectType } from "../util/customTypes";
import { handleKeyDown } from "../util/handleDelete";
import { redraw } from "../util/redraw";
import { handleClickDrag } from "../util/handleDrag";
import { handleShiftDrag } from "../util/handleShiftDrag";
import Circle from "../classes/circle";
import Link from "../classes/link";
import "./Canvas.css";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [selectedObject, setSelectedObject] = useState<selectType>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      if (!ctx) {
        console.error("Failed to get 2D context from canvas element.");
        return;
      }

      const boundHandleDoubleClick = (event: MouseEvent) =>
        handleDoubleClick(
          event,
          ctx,
          canvas,
          circles,
          setCircles,
          selectedObject,
          setSelectedObject
        );
      canvas.addEventListener("dblclick", boundHandleDoubleClick);

      const boundHandleClick = (event: MouseEvent) =>
        handleClickOnCanvas(
          event,
          ctx,
          canvas,
          circles,
          links,
          selectedObject,
          setSelectedObject,
          inputValue,
          setInputValue
        );
      canvas.addEventListener("click", boundHandleClick);

      const boundHandleKeyDown = (event: KeyboardEvent) =>
        handleKeyDown(event, selectedObject, setCircles);
      window.addEventListener("keydown", boundHandleKeyDown);

      const boundHandleShiftDown = (event: KeyboardEvent) =>
        handleShiftDrag(
          ctx,
          canvas,
          event,
          circles,
          links,
          setLinks,
          selectedObject
        );
      window.addEventListener("keydown", boundHandleShiftDown);

      const cleanUpHandleClickDrag = handleClickDrag(
        ctx,
        canvas,
        selectedObject,
        circles,
        links
      );

      redraw(ctx, circles, links, canvas, selectedObject);

      return () => {
        canvas.removeEventListener("dblclick", boundHandleDoubleClick);
        canvas.removeEventListener("click", boundHandleClick);
        window.removeEventListener("keydown", boundHandleKeyDown);
        window.removeEventListener("keydown", boundHandleShiftDown);
        cleanUpHandleClickDrag();
      };
    } else {
      console.warn("Canvas element not found in the DOM.");
    }
  }, [circles, links, selectedObject]);

  useEffect(() => {
    if (selectedObject && selectedObject instanceof Circle) {
      selectedObject.textContent = inputValue;
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        redraw(ctx, circles, links, canvas, selectedObject);
      }
    }
  }, [inputValue]);

  return (
    <>
      <input
        type='text'
        id='textEditor'
        style={{ position: "fixed", opacity: "0" }}
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <canvas ref={canvasRef} width={800} height={600} />
    </>
  );
}
