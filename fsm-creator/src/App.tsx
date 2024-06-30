import Canvas from "./components/Canvas";
import "./App.css";
import Instructions from "./components/Instructions";

export default function App() {
  return (
    <div className='canvasContainer'>
      <h1>Finite State Machine Designer </h1>
      <Canvas />
      <Instructions />
      <footer>Created by Abhinav in 2024</footer>
    </div>
  );
}
