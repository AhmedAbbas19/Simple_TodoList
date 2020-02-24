import { createElement } from "./element";

const myList = document.querySelector(".myList");
document.getElementById("myInput").addEventListener("keyup", e => {
  if (e.which == 13) {
    const newItem = createElement(
      "span",
      "list-item bg-primary",
      e.target.value
    );
    myList.append(newItem);
    e.target.value = "";
    // console.log(e.target.value);
  }
});
