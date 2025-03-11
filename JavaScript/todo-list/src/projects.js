import { projects } from "./data";
import { createElement } from "./DOM";
import { Tasks, TasksDOM } from "./tasks";
import { v4 as uuidv4 } from "uuid";

const Projects = (function () {
  function getProjects() {
    return JSON.parse(localStorage.projects);
  }

  function createProject(title) {
    return {
      id: uuidv4(),
      name: title,
    };
  }

  function addProject(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const newProjects = getProjects().concat(
      createProject(formData.projectName)
    );
    localStorage.setItem("projects", JSON.stringify(newProjects));
    ProjectsDOM.renderProjects();
  }

  function deleteProject(e) {
    const projectID = e.target.classList[0];
    const newProjects = getProjects();
    const projectIndex = getProjects().findIndex(
      (project) => project.id == projectID
    );
    newProjects.splice(projectIndex, 1);
    localStorage.setItem("projects", JSON.stringify(newProjects));
    ProjectsDOM.renderProjects();
  }

  return {
    getProjects,
    deleteProject,
    addProject,
  };
})();

const ProjectsDOM = (function () {
  const nav = document.querySelector(".navigation");
  const dialog = document.querySelector(".dialog");

  function rederProjectDetails(e) {
    const projectID = e.target.classList[1];
    if (projectID == "project-delete-btn" || !projectID) {
      TasksDOM.renderTaskTable();
    } else {
      TasksDOM.renderTaskTable(
        Tasks.getTasks().filter((task) => task.projectID == projectID)
      );
    }
  }

  function renderProjects() {
    nav.innerHTML = "";
    const navList = createElement("ul", {
      class: "nav-list",
      events: {
        click: rederProjectDetails,
      },
      childElements: [
        createElement("li", {
          class: "li-nav",
          text: "All Projects",
          events: {
            click: rederProjectDetails,
          },
        }),
        ...Projects.getProjects().map((project) => {
          return createElement("li", {
            class: `li-nav ${project.id}`,
            childElements: [
              createElement("span", {
                class: `project-span ${project.id}`,
                text: project.name,
              }),
              createElement("button", {
                class: `${project.id} project-delete-btn`,
                text: "🗑️",
                events: {
                  click: Projects.deleteProject,
                },
              }),
            ],
          });
        }),
        createElement("button", {
          class: "add-project-btn",
          text: "Add Project",
          events: {
            click: renderAddProject,
          },
        }),
      ],
    });
    nav.appendChild(navList);
    dialog.close();
  }

  function renderAddProject(e) {
    e.stopPropagation();
    const addProjectForm = createElement("form", {
      class: "add-project-form",
      events: {
        submit: Projects.addProject,
      },
      childElements: [
        createElement("label", {
          class: "add-project-label",
          text: "New Project Title",
          attribute: {
            for: "projectName",
          },
        }),
        createElement("input", {
          class: "add-project-input",
          attribute: {
            name: "projectName",
          },
        }),
        createElement("button", {
          class: "add-project-button",
          text: "Add New Project",
        }),
      ],
    });

    const dClose = createElement("button", {
      class: "close-d",
      text: "×",
      events: {
        click: () => dialog.close(),
      },
    });

    dialog.innerHTML = "";
    dialog.appendChild(dClose);
    dialog.appendChild(addProjectForm);
    dialog.showModal();
  }

  return {
    renderProjects,
  };
})();

export { Projects, ProjectsDOM };
