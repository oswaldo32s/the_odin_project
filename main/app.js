import header from "./components/header.js";
import { createElement } from "./functions/elements.js";
import home from "./components/home.js";
import signUp from "./components/signup.js";
import weather from "./components/weather/weather.js";

const body = document.body;

async function renderWeb() {
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
