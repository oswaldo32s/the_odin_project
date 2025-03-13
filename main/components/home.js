import createElement from "../functions/elements.js";
import slideShow from "./slideShow.js";
import { projects } from "../assets/data.js";

export default function home() {
  const home = createElement("div", {
    class: "home",
    childElements: [slideShow(projects)],
  });

  return home;
}
