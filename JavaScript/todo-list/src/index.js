import { v4 as uuidv4 } from "uuid";

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
  const body = document.body;
  if (tasks) {
    const taskContainer = createElement("div", { class: "task-contaner" });
    tasks.forEach((task) => {
      const tasksDiv = createElement("div", { class: "task-box" });
      Object.entries(task).forEach(([key, value]) => {
        tasksDiv.appendChild(createElement("span", { text: value }));
      });
      taskContainer.appendChild(tasksDiv);
    });
    // clear body
    body.innerHTML = "";
    body.appendChild(taskContainer);
  }
}

renderTasks(JSON.parse(localStorage.tasks));
