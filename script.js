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

const body = document.body;

function renderWeb() {
  const App = createElement("div", {
    class: "app",
    childElements: [
      createElement("header", {
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

  function dropDownMenu(name, dropDownList = []) {
    function toggleDropDown() {
      dropDownUl.classList.toggle("show");
      dropDownUl.classList.toggle("dropdown-list");
    }

    const dropDownButton = createElement("button", {
      class: "navigation-button",
      text: name,
      events: {
        click: toggleDropDown,
      },
    });

    const dropDownUl = createElement("ul", {
      class: "dropdown-list",
      childElements: dropDownList.map((element) =>
        createElement("li", {
          class: "dropdown-list-item",
          childElements: [
            createElement("a", {
              class: "dropdown-list-link",
              text: element.name,
              attribute: {
                href: element.link,
                target: "_blank",
              },
            }),
          ],
        })
      ),
    });

    const dropDownMenu = createElement("div", {
      class: "dropdownmenu",
      childElements: [dropDownButton, dropDownUl],
    });

    return dropDownMenu;
  }

  body.appendChild(App);
}

renderWeb();
