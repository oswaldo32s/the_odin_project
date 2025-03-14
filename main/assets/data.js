import weather from "../components/weather/weather.js";
import { renderInsideMain } from "../functions/elements.js";

const projects = [
  {
    name: "Calculator",
    link: "https://oswaldo32s.github.io/the_odin_project/Foundations/calculator/index.html",
    img: "./main/assets/images/calculator.jpeg",
  },
  {
    name: "Etch-a-Sketch",
    link: "https://oswaldo32s.github.io/the_odin_project/Foundations/etch-a-sketch/index.html",
    img: "./main/assets/images/etch-a-sketch.jpeg",
  },
  {
    name: "Rock Paper Scissors",
    link: "https://oswaldo32s.github.io/the_odin_project/Foundations/rock-paper-scissors/index.html",
    img: "./main/assets/images/rock-paper-scissors.jpeg",
  },
  {
    name: "To Do List",
    link: "https://oswaldo32s.github.io/the_odin_project/JavaScript/todo-list/dist/index.html",
    img: "./main/assets/images/todolist.jpeg",
  },
  {
    name: "Tic Tac Toe",
    link: "https://oswaldo32s.github.io/the_odin_project/JavaScript/tictactoe/index.html",
    img: "./main/assets/images/tictactoe.jpeg",
  },
  {
    name: "Library",
    link: "https://oswaldo32s.github.io/the_odin_project/JavaScript/library/index.html",
    img: "./main/assets/images/library.jpeg",
  },
  {
    name: "Weather App",
    link: async () => {
      const ddmenu = document.querySelector(".show");
      const weatherElement = await weather();
      if (ddmenu) {
        renderInsideMain(weatherElement);
        ddmenu.classList = "dropdown-list";
      }
      renderInsideMain(weatherElement);
    },
    img: "./main/assets/images/library.jpeg",
  },
];

export { projects };
