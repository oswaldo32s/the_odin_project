import header from "./components/header.js";
import createElement from "./functions/elements.js";

const body = document.body;

function renderWeb() {
  const App = createElement("div", {
    class: "app",
    childElements: [header()],
  });

  body.appendChild(App);
}

renderWeb();
