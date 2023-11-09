const fileInput = document.querySelector(".file-input");
const selectBtn = document.querySelector(".select");
const preview = document.querySelector(".preview img");
const container = document.querySelector(".container");
const filter = document.querySelectorAll(".options button");
const RotateBtn = document.querySelectorAll(".rotate button");
const filterName = document.querySelector(".filter-info .name");
const filterNum = document.querySelector(".value");
const filterSlider = document.querySelector(".slider .range");
let selectedFilter = document.querySelector(".options .active");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;

let rotate = 0;
let = flipH = 1;
let = flipY = 1;
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
        flipY = flipY === 1 ? -1 : 1;
        break;
      case "horizontal":
        flipH = flipH === 1 ? -1 : 1; // console.log("horizontal");
        break;

      default:
        break;
    }
    applyFilters();
  });
});
filterSlider.addEventListener("input", updateFilter);
fileInput.addEventListener("change", loadImg);
selectBtn.addEventListener("click", () => fileInput.click());
