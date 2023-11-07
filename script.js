const fileInput = document.querySelector(".file-input");
const selectBtn = document.querySelector(".select");
const preview = document.querySelector(".preview img");
const container = document.querySelector(".container");
const filter = document.querySelectorAll(".options button");

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
  });
});

fileInput.addEventListener("change", loadImg);
selectBtn.addEventListener("click", () => fileInput.click());
