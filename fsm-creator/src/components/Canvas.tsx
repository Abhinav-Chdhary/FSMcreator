import { useEffect, useRef, useState } from "react";
import { handleDoubleClick } from "../util/handleDoubleClick";
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

      // Clean up event listeners on component unmount
      return () => {
        canvas.removeEventListener("dblclick", boundHandleDoubleClick);
      };
    } else {
      console.warn("Canvas element not found in the DOM.");
    }
  }, [circles]);

  return <canvas ref={canvasRef} width={800} height={600} />;
}
