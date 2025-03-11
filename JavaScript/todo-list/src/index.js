import { tasks, projects, taskHeaders } from "./data";
import { TasksDOM } from "./tasks";
import { ProjectsDOM } from "./projects";
import "./style.css";

if (!localStorage.tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

if (!localStorage.projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

TasksDOM.renderTaskTable();
ProjectsDOM.renderProjects();
