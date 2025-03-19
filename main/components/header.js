import dropDownMenu from "./dropdown.js";
import { createElement, renderInsideMain } from "../functions/elements.js";
import { projects } from "../assets/data.js";
import home from "./home.js";
import signUp from "./signup.js";

export default function header() {
  const header = createElement("header", {
    class: "app-header",
    childElements: [
      createElement("div", {
        class: "header",
        childElements: [
          createElement("h1", {
            class: "app-logo",
            text: "⚡",
          }),
          createElement("h1", {
            class: "app-title",
            text: "The Odin Project",
          }),
          createElement("nav", {
            class: "app-navigation",
            childElements: [
              createElement("button", {
                class: "small-navigation-button",
                text: "🟰",
                events: {
                  click: () => {
                    const nav = document.querySelector(".navigation-list");
                    nav.classList.toggle("active");
                  },
                },
              }),
              createElement("ul", {
                class: "navigation-list",
                childElements: [
                  createElement("li", {
                    class: "navigation-list-item",
                    childElements: [
                      createElement("button", {
                        class: "navigation-button",
                        text: "Home",
                        events: {
                          click: () => {
                            document.querySelector(".main").innerHTML = "";
                            document.querySelector(".main").appendChild(home());
                          },
                        },
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
                        events: {
                          click: () => {
                            renderInsideMain(signUp());
                          },
                        },
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
