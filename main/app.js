import header from "./components/header.js";
import createElement from "./functions/elements.js";
import home from "./components/home.js";

const body = document.body;

function renderWeb() {
  const App = createElement("div", {
    class: "app",
    childElements: [
      header(),
      createElement("main", {
        class: "main",
        childElements: [home()],
      }),
    ],
  });

  body.appendChild(App);
}

renderWeb();
