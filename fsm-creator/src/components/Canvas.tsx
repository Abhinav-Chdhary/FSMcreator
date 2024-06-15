import { useEffect, useRef } from "react";
import { handleDoubleClick } from "../util/handleDoubleClick";
import "./Canvas.css";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!ctx) {
        console.error("Failed to get 2D context from canvas element.");
        return;
      }

      const boundHandleDoubleClick = (event: MouseEvent) =>
        handleDoubleClick(event, canvas, ctx);

      canvas.addEventListener("dblclick", boundHandleDoubleClick);

      return () => {
        canvas.removeEventListener("dblclick", boundHandleDoubleClick);
      };
    } else {
      console.warn("Canvas element not found in the DOM.");
    }
  }, []);

  const width = window.innerWidth - 50;
  const height = window.innerHeight - 100;

  return <canvas width={width} height={height} ref={canvasRef} />;
}
