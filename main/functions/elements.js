function createElement(tag, options = {}) {
  const element = document.createElement(tag);
  Object.entries(options).forEach(([key, value]) => {
    if (key == "text") {
      element.textContent = value;
    } else if (key == "html") {
      element.innerHTML = value;
    } else if (key == "class") {
      element.classList.add(...value.split(" "));
    } else if (key == "attribute") {
      Object.entries(value).forEach(([attributeKey, attributeValue]) => {
        element.setAttribute(attributeKey, attributeValue);
      });
    } else if (key == "events") {
      Object.entries(value).forEach(([eventKey, eventValue]) => {
        element.addEventListener(eventKey, eventValue);
      });
    } else if (key == "childElements") {
      value.forEach((childElement) => element.appendChild(childElement));
    }
  });

  return element;
}

async function renderInsideMain(page) {
  const main = document.querySelector(".main");

  if (main) {
    main.innerHTML = "";
    main.appendChild(await page);
  }
}

export { createElement, renderInsideMain };
