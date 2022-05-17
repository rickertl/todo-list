import Task from "./task.js";
import { projects } from "./data.js";
import { displayAllTasks } from "./display.js";

export default class Project {
  constructor(title, selected = false, tasks = []) {
    this.title = title;
    this.selected = selected;
    this.tasks = tasks;
  }

  listTasks() {
    displayAllTasks(this);
  }

  createProject(title) {
    this.selected = false; // remove "selected" from current project
    projects.push(new Project(title, true));
  }

  editProject(title) {
    this.title = title;
  }

  switchSelectedProject(index) {
    projects.forEach((project) => {
      project.selected = false;
    });
    projects[index].selected = true;
  }

  createTask(title, description, dueDate, priority, complete) {
    let task = new Task(title, description, dueDate, priority, complete);
    this.tasks.push(task);
    this.listTasks();
  }

  deleteTask(index) {
    this.tasks[index] = null; // set to null for garbage collection
    this.tasks.splice(index, 1);
    this.listTasks();
  }

  deleteTasks(type) {
    // loop through array in reverse to get all elements
    for (let i = this.tasks.length - 1; i >= 0; i--) {
      if (type === "completed") {
        if (this.tasks[i].complete) {
          this.deleteTask(i);
        }
      } else {
        this.deleteTask(i);
      }
    }
  }

  sortTasks() {
    //https://serveanswer.com/questions/js-sort-array-object-by-custom-key-and-value
    const priority = {
      high: 1,
      normal: 2,
      low: 3,
    };
    const sortedByPriority = this.tasks.sort(
      (a, b) => priority[a.priority] - priority[b.priority]
    );
    // https://bobbyhadz.com/blog/javascript-sort-array-of-objects-by-boolean-property
    const sortedByComplete = sortedByPriority.sort(
      (a, b) => Number(a.complete) - Number(b.complete)
    );
    return sortedByComplete;
  }

  completeTask(index) {
    this.tasks[index].complete = true;
    this.listTasks();
  }
}

//https://stackoverflow.com/questions/52377344/javascript-array-of-instances-of-a-class
