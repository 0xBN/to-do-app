import _ from "lodash";
import "./style.css";
import { compareAsc, format } from "date-fns";

const toDoItem1Btn = document.querySelector(".todo-item-1");
const addProjectCardBtn = document.querySelector(".add-project-button");
const addToDoBtn = document.querySelector(".add-todo-button");
const toggleToDoBtn = document.querySelector(".todo-card");
const cardContainer = document.querySelector(".todo-cards");

class projectCard {
  constructor(title, category, color) {
    this.title = title;
    this.category = category;
    this.color = color;
    this.todoItems = [];
  }

  addToDo(newItem) {
    this.todoItems.push(newItem);
  }
}

class toDoItem {
  static createToDo(title, description, dueDate) {
    return new toDoItem(title, description, dueDate);
  }

  constructor(
    title,
    description = "temp description",
    dueDate = "f",
    priority = "",
    notes = ""
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.status = false;
    this.element = document.querySelector(title);
  }
}
//
//
const toDoItem1 = toDoItem.createToDo("toDoItem1", "apple1", "g");
const toDoItem2 = toDoItem.createToDo("toDoItem2", "apple2");

addProjectCardBtn.addEventListener("click", addProjectCard);
addToDoBtn.addEventListener("click", addToDo);
//
//
//
//
//
//
//
//

function addToDo() {
  console.log("Adding To Do");
}

function addProjectCard() {
  console.log("added new Project Card");
}
//
//
//
//
//
//
//
//
// TESTING STUFF

// window.addEventListener("click", printAll);
function printAll() {
  console.log(window.event);
}

function testClick() {
  console.log("Got your target!");
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// // Dates
// let apple = format(new Date(2014, 1, 11), "yyyy-MM-dd");
// const date1 = new Date(1993, 0, 26);
// console.log(apple);
//=> '2014-02-11'

//const todoItem1 = new toDoItem(
//     "item 1 to do",
//     "this needs to be done",
//     "today",
//     "high",
//     "these are the things that need to be done"
//   );

// let toDoCards = document.querySelector(".todo-cards");

//     let toDoCard = document.createElement("div");
//     toDoCard.classList.add("todo-card", title);

//     let toDoItemTitle = document.createElement("button");
//     toDoItemTitle.classList.add("todo-card-title");
//     toDoItemTitle.textContent = title;
//     toDoItemTitle.onclick = function () {
//       return;
//       let item = window.event.target.nextSibling;
//       console.log(item);
//       //   item.showAll();
//       //   console.log(eval(item));
//       //   console.log();

//       let xy = window.event.target.closest("div");
//       console.log(xy);
//       let details = xy.querySelector(".todo-item-details");
//       if (details.textContent == "") {
//         details.textContent = eval(item).description;
//       } else {
//         details.textContent = "";
//       }
//     };

//     let toDoItemDetails = document.createElement("div");
//     toDoItemDetails.classList.add("todo-item-details");
//     toDoItemDetails.textContent = description;

//     toDoCard.append(toDoItemTitle);
//     toDoCard.append(toDoItemDetails);
//     toDoCards.append(toDoCard);

// let status = false;
// function toggleToDo() {
//   if (status == false) {
//     status = true;
//   } else {
//     status = false;
//   }
//   console.log("toggle", status);
// }
