export default function Buttons() {
  return (
    <div className='buttonsContainer'>
      Export as:
      <button onClick={(e) => console.log("Export as PNG")}>PNG</button>
      <button onClick={(e) => console.log("Export as SVG")}>SVG</button>
    </div>
  );
}
