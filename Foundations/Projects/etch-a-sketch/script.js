const container = document.createElement("div");
container.classList.add("sketch-container");

const button = document.createElement("button");
button.textContent = "Click me to change Grid Size";
button.addEventListener("click", createGrid);

document.body.appendChild(button);
document.body.appendChild(container);

function handleHover(e) {
  e.target.style.backgroundColor = "black";
}

function createGrid() {
  const gridSize = prompt("Choose grid size:");
  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(${gridSize}, ${
    640 / gridSize
  }px)`;
  container.style.gridAutoRows = `${640 / gridSize}px`;

  for (let i = 0, boxCount = gridSize ** 2; i < boxCount; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.addEventListener("mouseleave", handleHover);
    container.appendChild(box);
  }
}

createGrid();
