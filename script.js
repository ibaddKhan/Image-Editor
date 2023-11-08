const fileInput = document.querySelector(".file-input");
const selectBtn = document.querySelector(".select");
const preview = document.querySelector(".preview img");
const container = document.querySelector(".container");
const filter = document.querySelectorAll(".options button");
const filterName = document.querySelector(".filter-info .name");
const filterNum = document.querySelector(".value");
const filterSlider = document.querySelector(".slider .range");
let selectedFilter = document.querySelector(".options .active");

let brightness = 100,
  saturation = 100,
  inversion = 100,
  grayscale = 100;

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

filter.forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    item.classList.add("active");
    selectedFilter = item;
    filterName.innerHTML = item.innerHTML;
    switch (selectedFilter.id) {
      case "Brightness":
        brightness = filterSlider.value;
        filterNum.innerHTML = `${brightness}%`;
        console.log("bright on");
        break;
      case "Saturation":
        saturation = filterSlider.value;
        filterNum.innerHTML = `${saturation}%`;
        console.log("sat on");
        break;
      case "Inversion":
        inversion = filterSlider.value;
        filterNum.innerHTML = `${inversion}%`;
        console.log("inv on");
        break;
      case "Grayscale":
        grayscale = filterSlider.value;
        filterNum.innerHTML = `${grayscale}%`;
        console.log("grays on");
        break;

      default:
        break;
    }
  });
});

const updateFilter = () => {
  filterNum.innerHTML = filterSlider.value + "%";
  if (selectedFilter.id === "Brightness") {
    brightness = filterSlider.value + "%";
  } else if (selectedFilter.id === "Saturation") {
    saturation = filterSlider.value + "%";
  } else if (selectedFilter.id === "Inversion") {
    inversion = filterSlider.value + "%";
  } else {
    grayscale = filterSlider.value + "%";
  }
};

filterSlider.addEventListener("input", updateFilter);
fileInput.addEventListener("change", loadImg);
selectBtn.addEventListener("click", () => fileInput.click());
