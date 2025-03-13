import dropDownMenu from "./dropdown.js";
import createElement from "../functions/elements.js";
import { projects } from "../assets/data.js";

export default function header() {
  const header = createElement("header", {
    class: "app-header",
    childElements: [
      createElement("div", {
        class: "header",
        childElements: [
          createElement("h1", {
            class: "app-title",
            text: "⚡ The Odin Project",
          }),
          createElement("nav", {
            class: "app-navigation",
            childElements: [
              createElement("ul", {
                class: "navigation-list",
                childElements: [
                  createElement("li", {
                    class: "navigation-list-item",
                    childElements: [
                      createElement("button", {
                        class: "navigation-button",
                        text: "Home",
                      }),
                    ],
                  }),
                  dropDownMenu("Projects", projects),
                  createElement("li", {
                    class: "navigation-list-item",
                    childElements: [
                      createElement("button", {
                        class: "navigation-button",
                        text: "About it",
                      }),
                    ],
                  }),
                  createElement("li", {
                    class: "navigation-list-item",
                    childElements: [
                      createElement("button", {
                        class: "navigation-button",
                        text: "Sign Up",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  return header;
}

export { header };
