import { createElement } from "./DOM";
import { taskHeaders } from "./data";
import { Projects } from "./projects";

const TasksDOM = (function () {
  const dialog = document.querySelector(".dialog");

  const renderTaskTable = function (tasks = Tasks.getTasks()) {
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

    taskHeaders.forEach((header) => {
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
  };

  const renderTaskDetails = function (e) {
    const taskID = e.target.parentElement.classList[1];
    const taskDetails = Tasks.getTasks().find((task) => task.id == taskID);

    // Elements
    const dClose = createElement("button", {
      class: "close-d",
      text: "×",
      events: {
        click: function () {
          dialog.close();
        },
      },
    });

    const dContainer = createElement("div", {
      class: "d-container",
      html: `<div class="task-details"><span class="task-key">Title:</span><span class="task-value">${taskDetails.title}</span></div>
      <div class="task-details"><span class="task-key">Description:</span><span class="task-value">${taskDetails.description}</span></div>
      <div class="task-details"><span class="task-key">Due Date:</span><span class="task-value">${taskDetails.dueDate}</span></div>
      <div class="task-details"><span class="task-key">Priority:</span><span class="task-value">${taskDetails.priority}</span></div>
      <div class="task-details"><span class="task-key">Project:</span><span class="task-value">${taskDetails.project}</span></div>`,
    });

    const editBtn = createElement("button", {
      class: `${taskDetails.id} edit-btn`,
      text: "Edit",
      events: {
        click: renderTaskEdit,
      },
    });
    dialog.appendChild(dClose);
    dialog.appendChild(dContainer);
    dialog.appendChild(editBtn);
    dialog.showModal();
  };

  const renderTaskEdit = function (e) {
    const taskID = e.target.classList[0];
    const taskDetails = Tasks.getTasks().find((task) => task.id == taskID);
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
    Projects.getProjects().forEach((project) => {
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

    taskForm.addEventListener("submit", Tasks.updateTask);
    deleteBtn.addEventListener("click", Tasks.deleteTask);

    dContainer.innerHTML = "";
    buttonContainer.appendChild(updateBtn);
    buttonContainer.appendChild(deleteBtn);
    taskForm.appendChild(buttonContainer);
    dContainer.appendChild(taskForm);
  };
  return {
    renderTaskTable,
  };
})();

const Tasks = (function () {
  const getTasks = function () {
    return JSON.parse(localStorage.tasks);
  };

  function deleteTask(e) {
    e.preventDefault();
    console.log("it works", e.target.classList[0]);
  }

  function createTask(
    title,
    description,
    dueDate,
    priority,
    projectID,
    project
  ) {
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

  return {
    getTasks,
    createTask,
    updateTask,
  };
})();
export { TasksDOM, Tasks };
