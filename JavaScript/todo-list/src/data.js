import { v4 as uuidv4 } from "uuid";

const taskHeaders = ["Title", "Description", "Due Date", "Priority", "Project"];

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

export { tasks, projects, taskHeaders };
