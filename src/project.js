import Task from "./task.js";
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

  createTask(title, description, duedate, priority, complete) {
    let task = new Task(title, description, duedate, priority, complete);
    this.tasks.push(task);
    this.listTasks();
    console.log(this.tasks);
  }

  deleteTask(index) {
    this.tasks[index] = null; // set to null for garbage collection
    this.tasks.splice(index, 1);
    this.listTasks();
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
