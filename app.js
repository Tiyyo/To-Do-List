"use strict";
const themeBtn = document.getElementsByClassName("container__header__theme")[0];
const containerTodo = document.getElementsByClassName("container__todos")[0];
const inputTodo = document.getElementById("todo");
const todoValidationForm =
  document.getElementsByClassName("container__input")[0];
const itemLeftValue = document.getElementsByClassName("items--left")[0];
const clearCompletedBtn = document.getElementsByClassName("clear-completed")[0];
const filterAllBtn = document.getElementsByClassName("filter--all")[0];
const filterActiveBtn = document.getElementsByClassName("filter--active")[0];
const filterCompletedBtn =
  document.getElementsByClassName("filter--completed")[0];

class Storage {
  static store() {
    let storage = localStorage.setItem("todoList", JSON.stringify(todoList));
    return storage;
  }
  static restore() {
    let restored =
      localStorage.getItem("todoList") === null
        ? []
        : JSON.parse(localStorage.getItem("todoList"));
    return restored;
  }
}

let allTodos = [];
let removeTodoBtns = [];
let checkboxs = [];
let todoList = Storage.restore();
let todoContents = [];
let sortMethod = "NoSort";
let contentToDel = "";

allTodos = document.querySelectorAll(".todo");
removeTodoBtns = document.querySelectorAll(".todo__close");
checkboxs = document.querySelectorAll(".checkbox");
inputTodo.value = "";
todoContents = document.querySelectorAll(".todo__content");

class Todo {
  constructor(id, content, checked, active) {
    this.id = id;
    this.content = content;
    this.checked = false;
    this.active = true;
  }
}

class UI {
  static displayTodo() {
    let displayTodo = todoList.map((todo) => {
      return `<div class="todo" data-todo=${todoList.indexOf(todo)} data-id="${
        todo.id
      }">
      <label class="todo__input">
      <input class="checkbox" type="checkbox" data-id="${
        todo.id
      }" data-indice-checkbox="${todoList.indexOf(todo)}"/>
        <span class="checkmark">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
        </span>
        </label>
        <p class="todo__content" data-id="${
          todo.id
        }" data-content="isactive" data-indice-content="${todoList.indexOf(
        todo
      )}">${todo.content}</p>
          <button class="todo__close" role="remove todo" data-delete-btn="${todoList.indexOf(
            todo
          )}">
      <img
      src="./assets/images/icon-cross.svg"
      alt="crose to remove the line"
      />
      </button>
      </div>
      `;
    });

    containerTodo.innerHTML = displayTodo.join("");
  }
  static clearInput() {
    return (inputTodo.value = "");
  }
  static counterItemsLeft() {
    let a = 0; // random var has to be a number
    // number of todo which is have an active state
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].active) {
        a++;
      }
    }
    return (itemLeftValue.textContent = `${a}` + " ");
  }
  static deleteTodo() {
    allTodos = document.querySelectorAll(".todo");
    containerTodo.addEventListener("click", (e) => {
      if (e.target.tagName === "IMG") {
        let i = e.composedPath()[2].dataset.todo;
        let id = e.composedPath()[2].dataset.id;
        console.log(id);
        allTodos[i].remove();
        this.deleteTodoFromArray(id);
        this.counterItemsLeft();
        console.log(todoList);
        Storage.store(todoList);
      }
    });
  }
  static deleteTodoFromArray(id) {
    todoList = todoList.filter((todo) => todo.id !== +id);
  }
  static forLoopCompleted(e) {
    let refid = parseInt(e.target.dataset.id);
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === refid && todoList[i].checked === false) {
        todoList[i].checked = true;
        todoList[i].active = false;
      }
    }
  }
  static forLoopActiveState(e) {
    let refid = parseInt(e.target.dataset.id);
    for (let i = 0; i < todoContents.length; i++) {
      let numref = parseInt(todoContents[i].dataset.id);
      if (numref === refid && todoContents[i].dataset.content === "isactive") {
        todoContents[i].dataset.content = "isnotactive";
      }
    }
  }
  static markAsCompleted() {
    containerTodo.addEventListener("click", (e) => {
      todoContents = document.querySelectorAll(".todo__content");
      if (e.target.className === "checkbox") {
        this.forLoopCompleted(e);
        this.forLoopActiveState(e);
      }
    });
  }
  static checkIfActive() {
    todoContents = document.querySelectorAll(".todo__content");
    if (todoList.length >= 1) {
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].active === false) {
          console.log(todoList[i]);
          console.log(todoContents[i]);
          todoContents[i].dataset.content = "isnotactive";
        }
      }
    }
  }
}

class Filter {
  static displayFilteredElement() {
    allTodos = document.querySelectorAll(".todo");
    if (filterAllBtn.dataset.filter === "active") {
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i]) {
          allTodos[i].style.display = "grid";
        }
      }
    }
    if (filterActiveBtn.dataset.filter === "active") {
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].active === false) {
          console.log(allTodos[i]);
          allTodos[i].style.display = "none";
        }
        if (todoList[i].active === true) {
          allTodos[i].style.display = "grid";
        }
      }
    }
    if (filterCompletedBtn.dataset.filter === "active") {
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].active === true) {
          allTodos[i].style.display = "none";
        }
        if (todoList[i].active === false) {
          allTodos[i].style.display = "grid";
        }
      }
    }
  }
  static filter(activeFilter, filter1, filter2) {
    if (!activeFilter.dataset.filter) {
      activeFilter.setAttribute("data-filter", "active");
    } else if (activeFilter.dataset.filter === "active") {
      activeFilter.removeAttribute("data-filter");
    }
    if (activeFilter.dataset.filter === "active") {
      filter1.removeAttribute("data-filter");
      filter2.removeAttribute("data-filter");
    }
    this.displayFilteredElement();
  }
}

window.addEventListener("load", () => {
  UI.displayTodo();
  todoContents = document.querySelectorAll(".todo__content");
  UI.checkIfActive();
  todoContents = document.querySelectorAll(".todo__content");
  UI.markAsCompleted();
  UI.deleteTodo();
  UI.counterItemsLeft();
});

todoValidationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let givenId = Math.ceil(Math.random() * 10000);
  if (inputTodo.value !== "") {
    inputTodo.value;
    let newTodo = new Todo(givenId, inputTodo.value, false, true);
    todoList.push(newTodo);
    UI.displayTodo();
    allTodos = document.querySelectorAll(".todo");
    todoContents = document.querySelectorAll(".todo__content");
    UI.checkIfActive();

    // UI.giveAnId();
    UI.clearInput();
    UI.markAsCompleted();
    UI.deleteTodo();
    UI.counterItemsLeft();
    Storage.store(todoList);
  }
});

async function deleteCompletedEl() {
  for (let i = 0; i < todoList.length; i++) {
    if (todoContents[i].dataset.content === "isnotactive") {
      allTodos[i].remove();
    }
  }
}

function removeFromTodoArr() {
  for (let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];
    if (todo.active === false) {
      todoList.splice(i, 1);
      i--;
    }
  }
}

clearCompletedBtn.addEventListener("click", () => {
  allTodos = document.querySelectorAll(".todo");
  deleteCompletedEl().then(removeFromTodoArr());
  UI.counterItemsLeft(todoList);
  Storage.store(todoList);
});

filterAllBtn.addEventListener("click", () => {
  Filter.filter(filterAllBtn, filterActiveBtn, filterCompletedBtn);
});

filterActiveBtn.addEventListener("click", () => {
  Filter.filter(filterActiveBtn, filterAllBtn, filterCompletedBtn);
});

filterCompletedBtn.addEventListener("click", () => {
  Filter.filter(filterCompletedBtn, filterAllBtn, filterActiveBtn);
});

//theme switcher
themeBtn.addEventListener("click", () => {
  if (document.body.dataset.theme === "light") {
    document.body.dataset.theme = "dark";
  } else if (document.body.dataset.theme === "dark") {
    document.body.dataset.theme = "light";
  }
  console.log(document.body.dataset);
});
