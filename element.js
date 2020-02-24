export function createElement(tagName, classesString, innerHTML) {
  const newItem = document.createElement(tagName);
  newItem.setAttribute("class", classesString);
  newItem.innerText = innerHTML;
  return newItem;
}
