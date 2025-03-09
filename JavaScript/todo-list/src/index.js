import { v4 as uuidv4 } from "uuid";
import "./style.css";

const tasks = [
  {
    id: uuidv4(),
    title: "Buy Groceries",
    description: "Purchase fruits, vegetables, and dairy products.",
    dueDate: "2025-03-10",
    priority: "High",
    project: "Personal",
  },
  {
    id: uuidv4(),
    title: "Finish To-Do List App",
    description: "Complete the factory function and DOM implementation.",
    dueDate: "2025-03-12",
    priority: "High",
    project: "Development",
  },
  {
    id: uuidv4(),
    title: "Read JavaScript Book",
    description: "Read chapters 5-7 of 'You Don’t Know JS'.",
    dueDate: "2025-03-15",
    priority: "Medium",
    project: "Learning",
  },
  {
    id: uuidv4(),
    title: "Workout",
    description: "Go to the gym for a strength training session.",
    dueDate: "2025-03-08",
    priority: "Low",
    project: "Health",
  },
  {
    id: uuidv4(),
    title: "Plan Weekend Trip",
    description: "Research and book accommodations for a short getaway.",
    dueDate: "2025-03-14",
    priority: "Medium",
    project: "Leisure",
  },
];

const taskHeaders = ["Title", "Description", "Due Date", "Priority", "Project"];

function createElement(tag, options = {}) {
  const element = document.createElement(tag);
  Object.entries(options).forEach(([key, value]) => {
    if (key == "text") {
      element.textContent = value;
    } else if (key == "html") {
      element.innerHTML = value;
    } else if (key == "class") {
      element.classList.add(...value.split(" "));
    }
  });

  return element;
}

if (!localStorage.tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(tasks) {
  const table = document.querySelector(".task-table");
  if (tasks) {
    const taskContainer = createElement("div", { class: "task-contaner" });
    tasks.forEach((task) => {
      const tasksDiv = createElement("div", { class: "task-box" });
      Object.entries(task).forEach(([key, value]) => {
        if (key == "id") {
          tasksDiv.classList.add(value);
        } else {
          tasksDiv.appendChild(createElement("span", { text: value }));
        }
      });
      taskContainer.appendChild(tasksDiv);
    });
    // clear body
    table.innerHTML = "";
    table.appendChild(taskContainer);
  }
}

function renderTaskTable(tasks, headers) {
  const container = document.querySelector(".main-container");
  const tableElement = createElement("table", {
    class: "tasks-table",
    html: `
    <thead class="thead"></thead><tbody class="tbody"></tbody>`,
  });
  container.appendChild(tableElement);

  const thead = document.querySelector(".thead");
  const headerTr = createElement("tr");
  const tbody = document.querySelector(".tbody");

  thead.appendChild(headerTr);

  headers.forEach((header) => {
    const headerElement = createElement("th", { text: header });
    headerTr.appendChild(headerElement);
  });

  tasks.forEach((task) => {
    const tr = createElement("tr", { class: "task-row" });
    tr.addEventListener("click", renderTaskDetails);
    Object.entries(task).forEach(([key, value]) => {
      if (key == "id") {
        tr.classList.add(value);
      } else {
        const td = createElement("td", { text: value });
        tr.appendChild(td);
      }
    });
    tbody.appendChild(tr);
  });
}

function getTasks() {
  return JSON.parse(localStorage.tasks);
}

function renderTaskDetails(e) {
  const taskID = e.target.parentElement.classList[1];
  const taskDetails = getTasks().find((task) => (task.id = taskID));
  console.log(taskDetails);
}

renderTaskTable(getTasks(), taskHeaders);
