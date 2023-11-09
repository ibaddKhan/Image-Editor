const fileInput = document.querySelector(".file-input");
const selectBtn = document.querySelector(".select");
const preview = document.querySelector(".preview img");
const container = document.querySelector(".container");
const filter = document.querySelectorAll(".options button");
const RotateBtn = document.querySelectorAll(".rotate button");
const filterName = document.querySelector(".filter-info .name");
const filterNum = document.querySelector(".value");
const filterSlider = document.querySelector(".slider .range");
const reset = document.querySelector(".controls .reset");
const image = document.querySelector(".image-d");
const saveImgBtn = document.querySelector(".download");
let selectedFilter = document.querySelector(".options .active");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;
rotate = 0;
flipH = 1;
flipY = 1;

const loadImg = () => {
  let file = fileInput.files[0];
  if (!file) {
    return;
  }
  console.log(file);
  preview.src = URL.createObjectURL(file);
  preview.addEventListener("load", () => {
    container.classList.remove("disable");
  });
};
preview.addEventListener("dragover", (e) => {
  e.preventDefault();
});
preview.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    fileInput.files = e.dataTransfer.files;
    loadImg();
  }
});

preview.addEventListener("click", () => {
  fileInput.click();
});
const applyFilters = () => {
  preview.style.transform = `rotate(${rotate}deg) scaleX(${flipH}) scaleY(${flipY})`;
  preview.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `;
};

filter.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    option.classList.add("active");
    selectedFilter = option;
    filterName.innerText = option.innerText;
    if (option.id === "Brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterNum.innerText = `${brightness}%`;
    } else if (option.id === "Saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterNum.innerText = `${saturation}%`;
    } else if (option.id === "Inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterNum.innerText = `${inversion}%`;
    } else {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterNum.innerText = `${grayscale}%`;
    }
  });
});
const updateFilter = () => {
  filterNum.innerText = `${filterSlider.value}%`;
  if (selectedFilter.id === "Brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "Saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "Inversion") {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }

  applyFilters();
};
reset.addEventListener("click", () => {
  brightness = "100";
  saturation = "100";
  inversion = "0";
  grayscale = "0";
  rotate = 0;
  flipH = 1;
  flipY = 1;
  switch (selectedFilter.id) {
    case "Brightness":
      filterSlider.value = brightness;
      filterNum.innerHTML = brightness + "%";
      break;
    case "Saturation":
      filterSlider.value = saturation;
      filterNum.innerHTML = saturation + "%";
      break;
    case "Inversion":
      filterSlider.value = inversion;

      filterNum.innerHTML = inversion + "%";
      break;
    case "Grayscale":
      filterSlider.value = grayscale;
      filterNum.innerHTML = grayscale + "%";
      break;

    default:
      break;
  }
  applyFilters();
});

RotateBtn.forEach((item) => {
  item.addEventListener("click", () => {
    // console.log(item);
    switch (item.id) {
      case "left":
        rotate -= 90;
        console.log(rotate);
        // console.log("left");
        break;
      case "right":
        // console.log("right");
        rotate += 90;
        break;
      case "vertical":
        // console.log("Vertical");
        flipY = flipY === 1 ? -1 : 1;
        break;
      case "horizontal":
        // console.log("horizontal");
        flipH = flipH === 1 ? -1 : 1;
        break;

      default:
        break;
    }
    applyFilters();
  });
});

const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = preview.naturalWidth;
  canvas.height = preview.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipH, flipY);
  ctx.drawImage(
    preview,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  const dataURL = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.download = "Edited_img ByIbad.jpg";
  link.href = dataURL;
  link.click();
};

saveImgBtn.addEventListener("click", saveImage);
filterSlider.addEventListener("input", updateFilter);
fileInput.addEventListener("change", loadImg);
selectBtn.addEventListener("click", () => fileInput.click());
