import { useEffect, useRef, useState } from "react";
import { handleDoubleClick } from "../util/handleDoubleClick";
import { handleClickDrag } from "../util/handleClickDrag";
import "./Canvas.css";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      if (!ctx) {
        console.error("Failed to get 2D context from canvas element.");
        return;
      }

      // Add double click event listener for drawing circles
      const boundHandleDoubleClick = (event: MouseEvent) =>
        handleDoubleClick(event, canvas, ctx, circles, setCircles);
      canvas.addEventListener("dblclick", boundHandleDoubleClick);

      // Add click and drag event listeners for drawing arrows
      const cleanUpHandleClickDrag = handleClickDrag(canvas, ctx, circles);

      // Clean up event listeners on component unmount
      return () => {
        canvas.removeEventListener("dblclick", boundHandleDoubleClick);
        cleanUpHandleClickDrag();
      };
    } else {
      console.warn("Canvas element not found in the DOM.");
    }
  }, [circles]);

  const width = window.innerWidth;
  const height = window.innerHeight - 100;

  return <canvas width={width} height={height} ref={canvasRef} />;
}
