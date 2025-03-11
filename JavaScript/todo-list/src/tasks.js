import { createElement } from "./DOM";
import { taskHeaders } from "./data";
import { Projects } from "./projects";
import { v4 as uuidv4 } from "uuid";

const TasksDOM = (function () {
  const dialog = document.querySelector(".dialog");
  const container = document.querySelector(".main-container");

  const renderTaskTable = function (tasks = Tasks.getTasks()) {
    // Clear the container if there was alrady existing elements
    container.innerHTML = "";

    const tableElement = createElement("table", {
      class: "tasks-table",
      childElements: [
        createElement("thead", {
          class: "thead",
          childElements: taskHeaders.map((header) =>
            createElement("th", { text: header })
          ),
        }),

        createElement("tbody", {
          class: "tbody",
          childElements: tasks.map((task) =>
            createElement("tr", {
              class: `task-row ${task.id}`,
              events: {
                click: renderTaskDetails,
              },
              childElements: Object.entries(task)
                .filter((x) => x[0] !== "id" && x[0] !== "projectID")
                .map(([key, value]) => {
                  return createElement("td", { text: value });
                }),
            })
          ),
        }),
      ],
    });

    const addTaskBtn = createElement("button", {
      class: "add-task-btn",
      text: "Add New Task",
      events: {
        click: renderNewTask,
      },
    });

    container.appendChild(tableElement);
    container.appendChild(addTaskBtn);
    dialog.close();
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
    dialog.innerHTML = "";
    dialog.appendChild(dClose);
    dContainer.appendChild(editBtn);
    dialog.appendChild(dContainer);
    dialog.showModal();
  };

  function renderNewTask() {
    const dClose = createElement("button", {
      class: "close-d",
      text: "×",
      events: {
        click: function () {
          dialog.close();
        },
      },
    });

    let projects = "";
    Projects.getProjects().forEach((project) => {
      projects += `<option value="${project.id}">${project.name}</option>`;
    });
    const taskForm = createElement("form", {
      class: `task-form`,
      html: `
          <div class="task-form-div">
              <label for="title" class="task-label">Title</label>
              <input type="text" name="title" id="title"">
          </div>
          <div class="task-form-div">
              <label for="description" class="task-label">Description</label>
              <textarea name="description" id="description"></textarea>
          </div>
          <div class="task-form-div">
              <label for="dueDate" class="task-label">Due Date</label>
              <input type="date" name="dueDate" id="dueDate">
          </div>
          <div class="task-form-div">
              <label for="priority" class="task-label">Priority</label>
              <select name="priority" id="priority">
                <option value="low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
          </div>
          <div class="task-form-div">
              <label for="project" class="task-label">Project</label>
              <select name="project" id="project">
                ${projects}
              </select>
          </div>`,
      events: {
        submit: Tasks.addTask,
      },
    });

    const addTaskBtn = createElement("button", {
      class: "add-task-btn",
      text: "Add",
    });

    dialog.innerHTML = "";
    dialog.appendChild(dClose);
    taskForm.appendChild(addTaskBtn);
    dialog.appendChild(taskForm);
    dialog.showModal();
    //taskForm.addEventListener("submit", Tasks.addTask);
  }

  const renderTaskEdit = function (e) {
    const taskID = e.target.classList[0];
    const taskDetails = Tasks.getTasks().find((task) => task.id == taskID);
    const dContainer = document.querySelector(".d-container");

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

    const taskID = e.target.classList[0];
    const newTasks = getTasks();
    const taskIndex = getTasks().findIndex((task) => task.id == taskID);
    newTasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    TasksDOM.renderTaskTable();
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
    const previousProject = Projects.getProjects().find(
      (project) => project.id == formData.project
    );
    const updatedTask = createTask(
      formData.title,
      formData.description,
      formData.dueDate,
      formData.priority,
      formData.project,
      previousProject ? previousProject.name : ""
    );
    tasks[taskIndex] = updatedTask;

    localStorage.setItem("tasks", JSON.stringify(tasks));
    TasksDOM.renderTaskTable(getTasks(), taskHeaders);
  }

  function addTask(e) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    const newTask = createTask(
      formData.title,
      formData.description,
      formData.dueDate,
      formData.priority,
      formData.project,
      Projects.getProjects().find((project) => project.id == formData.project)
        .name
    );

    localStorage.setItem("tasks", JSON.stringify(getTasks().concat(newTask)));
    TasksDOM.renderTaskTable(getTasks(), taskHeaders);
  }

  return {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    addTask,
  };
})();
export { TasksDOM, Tasks };
