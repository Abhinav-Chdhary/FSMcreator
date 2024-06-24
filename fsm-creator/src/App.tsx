import Canvas from "./components/Canvas";
import "./App.css";
import { CanvasProvider } from "./context/canvasContext";

export default function App() {
  return (
    <div className='canvasContainer'>
      <h1 style={{ userSelect: "none" }}>Finite State Machine Designer </h1>
      <CanvasProvider>
        <Canvas />
      </CanvasProvider>
    </div>
  );
}
