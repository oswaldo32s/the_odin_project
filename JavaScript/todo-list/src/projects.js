import { projects } from "./data";
import { createElement } from "./DOM";
import { Tasks, TasksDOM } from "./tasks";

const Projects = (function () {
  function getProjects() {
    return JSON.parse(localStorage.projects);
  }

  return {
    getProjects,
    deleteProject,
  };

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
})();

const ProjectsDOM = (function () {
  const nav = document.querySelector(".navigation");

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
        }),
      ],
    });
    nav.appendChild(navList);
  }

  return {
    renderProjects,
  };
})();

export { Projects, ProjectsDOM };
