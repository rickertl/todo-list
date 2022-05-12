import { listTasks, deleteTask } from "./project.js";
import { project } from "./data.js";

export { taskRows, buildProjectView };

// cache dom
const body = document.querySelector("body");

// BUILD DEFAULT VIEW
function buildProjectView(project, projectID) {
  const projectName = body.querySelector(".current-project");
  projectName.textContent = project.title;
  projectName.setAttribute("data-id", projectID);
  taskRows(project); // or project.listTasks();
}

// DISPLAY ALL TASKS
const taskList = body.querySelector(".task-list");

function taskRows(project) {
  taskList.textContent = "";
  project.sortTasks().forEach((task, index) => {
    taskRow(task, index);
  });
  listenForDelete(project);
}

function taskRow(task, index) {
  // create DOM elements
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  const taskTitle = document.createElement("div");
  const taskTitleBox = document.createElement("span"); // need this for ellipsis to work
  const taskDueDate = document.createElement("div");
  const taskPriority = document.createElement("div");
  if (task.priority === "high") {
    taskPriority.classList.add("high");
  } else if (task.priority === "low") {
    taskPriority.classList.add("low");
  }
  const taskDelete = document.createElement("div");
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("data-id", index);
  deleteBtn.classList.add("delete-btn");
  // add content to elements
  taskTitleBox.textContent = task.title;
  if (task.dueDate) {
    taskDueDate.textContent = task.dueDate;
  }
  taskPriority.textContent = task.priority;
  deleteBtn.textContent = "X";
  // append elements to parents
  taskContainer.appendChild(taskTitle);
  taskTitle.appendChild(taskTitleBox);
  taskContainer.appendChild(taskDueDate);
  taskContainer.appendChild(taskPriority);
  taskContainer.appendChild(taskDelete);
  taskDelete.appendChild(deleteBtn);
  taskList.appendChild(taskContainer);
}

function listenForDelete(project) {
  const deleteBtns = taskList.querySelectorAll("button.delete-btn");
  deleteBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-id");
      project.deleteTask(index);
      taskRows(project);
    });
  });
}

// ENTER NEW TASK
const addTaskToProject = function (event) {
  event.preventDefault();
  const newTask = project.createTask(
    form.elements["title"].value,
    form.elements["description"].value,
    form.elements["dueDate"].value,
    form.elements["priority"].value
  );
  form.reset();
  // form.classList.toggle("show-form");
  project.listTasks();
};

// get form submission
const form = document.querySelector("form");
form.onsubmit = addTaskToProject;