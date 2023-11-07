const imageInput = document.getElementById("imageInput");
const filterButton = document.getElementById("filterButton");
const brightnessButton = document.getElementById("brightnessButton");
const contrastButton = document.getElementById("contrastButton");
const saturationButton = document.getElementById("saturationButton");
const cropButton = document.getElementById("cropButton");
const canvas = new fabric.Canvas("canvas", { preserveObjectStacking: true });
const downloadButton = document.getElementById("downloadButton");

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  fabric.Image.fromURL(URL.createObjectURL(file), (img) => {
    canvas.clear();
    canvas.add(img);
    canvas.renderAll();
  });
});

filterButton.addEventListener("click", () => {
  // Apply filter or image manipulation here
  // Example: Grayscale filter
  const filter = new fabric.Image.filters.Grayscale();
  canvas.getActiveObject().filters.push(filter);
  canvas.getActiveObject().applyFilters();
  canvas.renderAll();
});

brightnessButton.addEventListener("click", () => {
  const brightnessValue = parseFloat(
    prompt("Enter brightness value (e.g., 1.2 for 20% brighter):")
  );
  if (!isNaN(brightnessValue)) {
    canvas
      .getActiveObject()
      .filters.push(
        new fabric.Image.filters.Brightness({ brightness: brightnessValue })
      );
    canvas.getActiveObject().applyFilters();
    canvas.renderAll();
  }
});

contrastButton.addEventListener("click", () => {
  const contrastValue = parseFloat(
    prompt("Enter contrast value (e.g., 1.2 for 20% more contrast):")
  );
  if (!isNaN(contrastValue)) {
    canvas
      .getActiveObject()
      .filters.push(
        new fabric.Image.filters.Contrast({ contrast: contrastValue })
      );
    canvas.getActiveObject().applyFilters();
    canvas.renderAll();
  }
});

saturationButton.addEventListener("click", () => {
  const saturationValue = parseFloat(
    prompt("Enter saturation value (e.g., 1.2 for 20% more saturation):")
  );
  if (!isNaN(saturationValue)) {
    canvas
      .getActiveObject()
      .filters.push(
        new fabric.Image.filters.Saturation({ saturation: saturationValue })
      );
    canvas.getActiveObject().applyFilters();
    canvas.renderAll();
  }
});

cropButton.addEventListener("click", () => {
  canvas.discardActiveObject();
  canvas.requestRenderAll();
  const rect = new fabric.Rect({
    width: 200,
    height: 200,
    fill: "rgba(0,0,0,0)",
    stroke: "black",
    strokeWidth: 2,
  });
  canvas.add(rect);
  canvas.setActiveObject(rect);
});

downloadButton.addEventListener("click", () => {
  downloadButton.href = canvas.toDataURL({ format: "jpeg" });
});
