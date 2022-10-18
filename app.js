"use strict";

const containerTodo = document.getElementsByClassName("container__todos")[0];
const inputTodo = document.getElementById("todo");
const todoValidationForm =
  document.getElementsByClassName("container__input")[0];
const itemLeftValue = document.getElementsByClassName("items--left")[0];
const clearCompletedBtn = document.getElementsByClassName("clear-completed")[0];
const filterAllBtn = document.getElementsByClassName("filter--all")[0];
const filterActive = document.getElementsByClassName("filter--active")[0];
const filterAllCompleed =
  document.getElementsByClassName("filter--completed")[0];
let allTodos = [];
let removeTodoBtns = [];
let checkboxs = [];
let todoList = [];
let todoContents = [];
let sortMethod = "NoSort";
// allTodos = document.querySelectorAll(".todo");
// removeTodoBtns = document.querySelectorAll(".todo__close");
// checkboxs = document.querySelectorAll(".checkbox");

console.log(clearCompletedBtn);

//stored todo list
function store() {
  localStorage.todoList = JSON.stringify;
}

class Todo {
  constructor(content, checked, active) {
    this.content = content;
    this.checked = false;
    this.active = true;
  }
}

// testing if todolist.checked is matching checkboxs.checked
function isChecked() {
  if (todoList.length >= 1) {
    for (let i = 0; i < todoList.length - 1; i++) {
      if (checkboxs[i].checked === true) {
        todoList[i].checked = true;
      }
      if (todoList[i].checked === true) {
        checkboxs[i].checked = true;
      }
    }
  }
}

// testing all cases for matching Todos object active state and the state display on screen
const isActive = () => {
  if (todoList.length >= 1) {
    for (let i = 0; i < todoList.length - 1; i++) {
      if (todoContents[i].dataset.content === "isnotactive") {
        todoList[i].active = false;
      }
      if (todoContents[i].dataset.content === "isactive") {
        todoList[i].active = true;
      }
      if (todoList[i].active === true) {
        todoContents[i].dataset.content = "isactive";
      }
      if (todoList[i].active === false) {
        todoContents[i].dataset.content = "isnotactive";
      }
    }
  }
};

//mark a todo as complete
// an array of input as argument
const markAsChecked = () => {
  checkboxs.forEach((checkbox) => {
    checkbox.addEventListener("input", (e) => {
      let i = e.target.dataset.indiceCheckbox;
      if (checkbox.checked === true) {
        todoList[i].checked = true;
      } else if (checkbox.checked === false) {
        todoList[i].checked = false;
      }
    });
  });
};

const markAsActive = () => {
  todoContents.forEach((todoContent) => {
    todoContent.addEventListener("click", (e) => {
      let i = e.target.dataset.indiceContent;

      if (todoContent.dataset.content === "isactive") {
        todoContent.dataset.content = "isnotactive";
        todoList[i].active = false;
      } else if ((todoContent.dataset.content = "isnotactive")) {
        todoContent.dataset.content = "isactive";
        todoList[i].active = true;
      }
      console.log(todoList);
    });
  });
};

// an array as argument
const countItemLeft = (anArray) => {
  itemLeftValue.textContent = `${anArray.length}` + " ";
};

// an array of button as first argument
// an array of element to delete as second argument
const deleteTodo = (buttons, item) => {
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let i = e.composedPath()[1].dataset.deleteBtn;
      item[i].remove();
      todoList.splice(i, 1);
      countItemLeft(todoList);
    });
  });
};

const clearCompleted = () => {
  for (let i = 0; i < todoList.length - 1; i++) {
    if (todoList[i].checked === true) {
      todoList[i].active = false;
    }
    if (todoList[i].active === false) {
      todoContents[i].dataset.content = "isnotactive";
    }
  }
};

const pasEncoreDeNom = () => {
  if (filterAll === active) {
    active = noactive;
    completed = noactive;
  }
  if (filterActive === active) {
    all = noactive;
    completed = noactive;
  }
  if (filterCompleted === active) {
    active = noactive;
    All = noactive;
  }
};

let newArrFilter = todoList.filter(function (el, key) {
  console.log(el);
  if (el.active === true) {
    return true;
  }
});

let newArrFilter2 = todoList.filter(function (el, key) {
  console.log(el);
  if (el.active === false) {
    return true;
  }
});
// display todos
//and assign a value to each todo which is the index's array of each todos
const displayTodo = () => {
  containerTodo.innerHTML = todoList
    .map((todo) => {
      return `<div class="todo" data-todo=${todoList.indexOf(todo)}>
    <label class="todo__input">
      <input class="checkbox" type="checkbox" data-indice-checkbox="${todoList.indexOf(
        todo
      )}"/>
      <span class="checkmark">
        <img
          class="checkmark__img"
          src="./assets/images/icon-check.svg"
          alt="checkmark indicator"
        />
      </span>
    </label>
    <p class="todo__content" data-content data-indice-content="${todoList.indexOf(
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
    })
    .join("");
};

todoValidationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputTodo.value !== "") {
    let content = inputTodo.value;
    let newTodo = new Todo(content, false);
    todoList.push(newTodo);
    displayTodo();
    allTodos = document.querySelectorAll(".todo");
    removeTodoBtns = document.querySelectorAll(".todo__close");
    checkboxs = document.querySelectorAll(".checkbox");
    inputTodo.value = "";
    todoContents = document.querySelectorAll(".todo__content");
  }

  markAsChecked();
  isChecked();
  markAsActive();
  isActive();
  deleteTodo(removeTodoBtns, allTodos);
  countItemLeft(todoList);

  let newArrFilter = todoList.filter(function (el, key) {
    console.log(el);
    if (el.active === true) {
      return true;
    }
  });

  let newArrFilter2 = todoList.filter(function (el, key) {
    console.log(el);
    if (el.active === false) {
      return true;
    }
  });
  console.log(newArrFilter2);
});

clearCompletedBtn.addEventListener("click", () => {
  clearCompleted();
  console.log(todoList);
});

filterAllBtn.addEventListener("click", (e) => {
  console.log(e);
  if (!filterAllBtn.dataset.filter) {
    filterAllBtn.setAttribute("data-filter", "active");
    sortMethod = "NoSort";
  } else if (filterAllBtn.dataset.filter == "active") {
    filterAllBtn.removeAttribute("data-filter");
  }
  pasEncoreDeNom();
  console.log(filterAllBtn);
});
