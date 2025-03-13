import createElement from "../functions/elements.js";

export default function dropDownMenu(name, dropDownList = []) {
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
