import { v4 as uuidv4 } from "uuid";
import "./style.css";

const projects = [
  {
    id: uuidv4(),
    name: "Personal",
  },
  {
    id: uuidv4(),
    name: "Development",
  },
  {
    id: uuidv4(),
    name: "Learning",
  },
  {
    id: uuidv4(),
    name: "Health",
  },
  {
    id: uuidv4(),
    name: "Leisure",
  },
];

const tasks = [
  {
    id: uuidv4(),
    title: "Buy Groceries",
    description: "Purchase fruits, vegetables, and dairy products.",
    dueDate: "2025-03-10",
    priority: "High",
    projectID: projects[0].id,
    project: projects[0].name,
  },
  {
    id: uuidv4(),
    title: "Finish To-Do List App",
    description: "Complete the factory function and DOM implementation.",
    dueDate: "2025-03-12",
    priority: "High",
    projectID: projects[1].id,
    project: projects[1].name,
  },
  {
    id: uuidv4(),
    title: "Read JavaScript Book",
    description: "Read chapters 5-7 of 'You Don’t Know JS'.",
    dueDate: "2025-03-15",
    priority: "Medium",
    projectID: projects[2].id,
    project: projects[2].name,
  },
  {
    id: uuidv4(),
    title: "Workout",
    description: "Go to the gym for a strength training session.",
    dueDate: "2025-03-08",
    priority: "Low",
    projectID: projects[3].id,
    project: projects[3].name,
  },
  {
    id: uuidv4(),
    title: "Plan Weekend Trip",
    description: "Research and book accommodations for a short getaway.",
    dueDate: "2025-03-14",
    priority: "Medium",
    projectID: projects[4].id,
    project: projects[4].name,
  },
];

const taskHeaders = ["Title", "Description", "Due Date", "Priority", "Project"];

const dialog = document.querySelector(".dialog");
const dClose = document.querySelector(".close-d");
const dContainer = document.querySelector(".d-container");

dClose.addEventListener("click", () => {
  dialog.close();
});

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
    }
  });

  return element;
}

if (!localStorage.tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

if (!localStorage.projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function renderTaskTable(tasks, headers) {
  const container = document.querySelector(".main-container");
  container.innerHTML = "";
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
      } else if (key == "projectID") {
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

function getProjects() {
  return JSON.parse(localStorage.projects);
}

function updateTask(e) {
  e.preventDefault();
  const taskID = e.target.classList[0];
  const tasks = getTasks();
  const taskIndex = tasks.findIndex((task) => task.id == taskID);
  const formData = Object.fromEntries(new FormData(e.target));
  const updatedTask = createTask(
    formData.title,
    formData.description,
    formData.dueDate,
    formData.priority,
    formData.project,
    getProjects().find((project) => project.id == formData.project).name
  );
  tasks[taskIndex] = updatedTask;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTaskTable(getTasks(), taskHeaders);
  dialog.close();
}

function createTask(title, description, dueDate, priority, projectID, project) {
  return {
    id: uuidv4(),
    title,
    description,
    dueDate,
    priority,
    projectID,
    project,
  };
}

function deleteTask(e) {
  e.preventDefault();
  console.log("it works", e.target.classList[0]);
}

function renderTaskEdit(e) {
  const taskID = e.target.classList[0];
  const taskDetails = getTasks().find((task) => task.id == taskID);
  const buttonContainer = createElement("div", { class: "btn-container" });
  const updateBtn = createElement("button", {
    text: "Update",
    class: `${taskDetails.id} form-btn`,
  });
  const deleteBtn = createElement("button", {
    text: "delete",
    class: `${taskDetails.id} form-btn`,
    attribute: {
      type: "button",
    },
  });
  let projects = "";
  getProjects().forEach((project) => {
    projects += `<option value="${project.id}">${project.name}</option>`;
  });
  const taskForm = createElement("form", {
    class: `${taskDetails.id} task-form`,
    html: `
        <div class="task-form-div">
            <label for="title" class="task-label">Title</label>
            <input type="text" name="title" id="title" value="${taskDetails.title}">
        </div>
        <div class="task-form-div">
            <label for="description" class="task-label">Description</label>
            <textarea name="description" id="description">${taskDetails.description}</textarea>
        </div>
        <div class="task-form-div">
            <label for="dueDate" class="task-label">Due Date</label>
            <input type="date" name="dueDate" id="dueDate" value="${taskDetails.dueDate}">
        </div>
        <div class="task-form-div">
            <label for="priority" class="task-label">Priority</label>
            <select name="priority" id="priority">
              <option value="${taskDetails.priority}">${taskDetails.priority}</option>
              <option value="low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
        </div>
        <div class="task-form-div">
            <label for="project" class="task-label">Project</label>
            <select name="project" id="project">
              <option value="${taskDetails.projectID}">${taskDetails.project}</option>
              ${projects}
            </select>
        </div>`,
  });

  taskForm.addEventListener("submit", updateTask);
  deleteBtn.addEventListener("click", deleteTask);

  dContainer.innerHTML = "";
  buttonContainer.appendChild(updateBtn);
  buttonContainer.appendChild(deleteBtn);
  taskForm.appendChild(buttonContainer);
  dContainer.appendChild(taskForm);
}

function renderTaskDetails(e) {
  const taskID = e.target.parentElement.classList[1];
  const taskDetails = getTasks().find((task) => task.id == taskID);
  const editBtn = createElement("button", {
    class: `${taskDetails.id} edit-btn`,
    text: "Edit",
  });

  editBtn.addEventListener("click", renderTaskEdit);

  dContainer.innerHTML = `<div class="task-details"><span class="task-key">Title:</span><span class="task-value">${taskDetails.title}</span></div>
            <div class="task-details"><span class="task-key">Description:</span><span class="task-value">${taskDetails.description}</span></div>
            <div class="task-details"><span class="task-key">Due Date:</span><span class="task-value">${taskDetails.dueDate}</span></div>
            <div class="task-details"><span class="task-key">Priority:</span><span class="task-value">${taskDetails.priority}</span></div>
            <div class="task-details"><span class="task-key">Project:</span><span class="task-value">${taskDetails.project}</span></div>`;

  dContainer.appendChild(editBtn);
  dialog.showModal();
}

renderTaskTable(getTasks(), taskHeaders);
