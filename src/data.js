import { Project } from "./project.js";
import { format } from "date-fns";

export { projects, createDefaultData, getData };

const projects = [];

const createDefaultData = function () {
  // clear projects array
  projects.length = 0;

  // create default project
  const defaultProject = new Project("My List", true);

  // demo dates
  const date1 = new Date();
  const date2 = new Date();

  // create demo tasks
  defaultProject.createTask(
    "Clean room",
    "",
    format(date1.setDate(date1.getDate() + 4), "yyyy-MM-dd")
  );
  defaultProject.createTask("Write thank you note to mom", "", "", 3);
  defaultProject.createTask(
    "Mow lawn",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut turpis massa,",
    format(date2.setDate(date2.getDate() - 7), "yyyy-MM-dd"),
    1,
    true
  );
  defaultProject.createTask(
    "Empty dishwasher",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut turpis massa,",
    "",
    1
  );

  // add default project to projects array
  projects.push(defaultProject);
};

const getData = function () {
  if (localStorage.getItem("localProjects")) {
    const storedProjects = JSON.parse(localStorage.getItem("localProjects"));
    storedProjects.forEach((project) => {
      // creates instances of Project class
      const newProject = new Project(project.name, project.selected);
      projects.push(newProject);
      // creates instances of new project's Task class
      project.tasks.forEach((task) => {
        newProject.createTask(
          task.name,
          task.notes,
          task.dueDate,
          task.priority,
          task.complete
        );
      });
    });
  } else {
    createDefaultData();
  }
};
