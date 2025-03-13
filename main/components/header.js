import dropDownMenu from "./dropdown.js";
import createElement from "../functions/elements.js";

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
                  dropDownMenu("Projects", [
                    {
                      name: "Calculator",
                      link: "https://oswaldo32s.github.io/the_odin_project/Foundations/calculator/index.html",
                    },
                    {
                      name: "Etch-a-Sketch",
                      link: "https://oswaldo32s.github.io/the_odin_project/Foundations/etch-a-sketch/index.html",
                    },
                    {
                      name: "Rock Paper Scissors",
                      link: "https://oswaldo32s.github.io/the_odin_project/Foundations/rock-paper-scissors/index.html",
                    },
                    {
                      name: "To Do List",
                      link: "https://oswaldo32s.github.io/the_odin_project/JavaScript/todo-list/dist/index.html",
                    },
                    {
                      name: "Tic Tac Toe",
                      link: "https://oswaldo32s.github.io/the_odin_project/JavaScript/tictactoe/index.html",
                    },
                    {
                      name: "Library",
                      link: "https://oswaldo32s.github.io/the_odin_project/JavaScript/library/index.html",
                    },
                  ]),
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
