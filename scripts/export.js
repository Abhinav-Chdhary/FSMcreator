import C2S from "canvas2svg";

const canvas = document.getElementById("canvas");

export function handleExportPNG() {
  const dataUrl = canvas.toDataURL("image/png");
  let link = document.createElement("a");
  link.href = dataUrl;
  link.download = "fsm-image.png";
  link.click();
}

export async function handleExportSVG() {
  const resultBox = document.getElementById("result");
  const ctx = new C2S(canvas.width, canvas.height);
  ctx.drawImage(canvas, 0, 0);
  const svgString = ctx.getSerializedSvg();

  resultBox.style.display = "block";
  resultBox.value = svgString;
}

window.handleExportPNG = handleExportPNG;
window.handleExportSVG = handleExportSVG;
