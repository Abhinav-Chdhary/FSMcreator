function handleExportPNG() {
  const canvas = document.getElementById("canvas");
  const dataUrl = canvas.toDataURL("image/png");
  let link = document.createElement("a");
  link.href = dataUrl;
  link.download = "fsm-image.png";
  link.click();
}
