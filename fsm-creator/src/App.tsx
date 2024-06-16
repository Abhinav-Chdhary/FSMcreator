import Canvas from "./components/Canvas";
import "./App.css"

export default function App() {
  return (
    <div className="canvasContainer">
      <h1 style={{userSelect:"none"}}>Finite State Machine Designer </h1>
      <Canvas />
    </div>
  );
}
