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
let allTodos = [];
let removeTodoBtns = [];
let checkboxs = [];
let todoList = [];
let todoContents = [];
let sortMethod = "NoSort";
let contentToDel = "";

// function store() {
//   localStorage.todoList = JSON.stringify;
// }

class Todo {
  constructor(content, checked, active) {
    this.content = content;
    this.checked = false;
    this.active = true;
  }
}

// testing if todolist.checked is matching checkboxs.checked
// function isChecked() {
//   if (todoList.length >= 1) {
//     for (let i = 0; i < todoList.length - 1; i++) {
//       if (checkboxs[i].checked === true) {
//         todoList[i].checked = true;
//       }
//       if (todoList[i].checked === true) {
//         checkboxs[i].checked = true;
//       }
//     }
//   }
// }

// testing all cases for matching Todos object active state and the state display on screen
const isActive = () => {
  if (todoList.length >= 1) {
    for (let i = 0; i < todoList.length - 1; i++) {
//      if (todoContents[i].dataset.content === "isnotactive") {
//        todoList[i].active = false;
//      }
//      if (todoContents[i].dataset.content === "isactive") {
//        todoList[i].active = true;
//      }
      if (todoList[i].active === true) {
        todoContents[i].dataset.content = "isactive";
     } else {
        todoContents[i].dataset.content = "isnotactive";
      }
    }
  }
};

//mark a todo as complete
// an array of input as argument
// const markAsChecked = () => {
//   checkboxs.forEach((checkbox) => {
//     checkbox.addEventListener("input", (e) => {
//       let i = e.target.dataset.indiceCheckbox;
//       if (checkbox.checked === true) {
//         todoList[i].checked = true;
//       } else if (checkbox.checked === false) {
//         todoList[i].checked = false;
//       }
//     });
//   });
// };

// const markAsActive = () => {
//   todoContents.forEach((todoContent) => {
//     todoContent.addEventListener("click", (e) => {
//       let i = e.target.dataset.indiceContent;

//       if (todoContent.dataset.content === "isactive") {
//         todoContent.dataset.content = "isnotactive";
//         todoList[i].active = false;
//       } else if ((todoContent.dataset.content = "isnotactive")) {
//         todoContent.dataset.content = "isactive";
//         todoList[i].active = true;
//       }
//     });
//   });
// };

// an array as argument
const countItemLeft = (anArray) => {
  let a = 0; // random var has to be a number
  // number of todo which is have an active state
  for (let i = 0; i < anArray.length; i++) {
    if (anArray[i].active) {
      a++;
    }
  }
  itemLeftValue.textContent = `${a}` + " ";
};

// an array of button as first argument
// an array of element to delete as second argument
// const deleteTodo = (buttons, item) => {
//   buttons.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       console.log(todoList);
//       console.log(allTodos);
//       let i = e.composedPath()[1].dataset.deleteBtn; // determine which div is target by the event
//       item[i].remove();
//       todoList.splice(i, 1);
//       console.log(todoList);
//       console.log(allTodos);
//       countItemLeft(todoList);
//     });
//   });
// };

const clearCompleted = () => {
  return (sortMethod = "ClearCompleted");
};

// const controlFilterAll = () => {
//   if (filterAllBtn.dataset.filter === "active") {
//     alert("test1");
//     filterActiveBtn.removeAttribute("data-filter");
//     filterCompletedBtn.removeAttribute("data-filter");
//   }
// };
// const controlFilterActive = () => {
//   if (filterActiveBtn.dataset.filter === "active") {
//     alert("test2");
//     filterAllBtn.removeAttribute("data-filter");
//     filterCompletedBtn.removeAttribute("data-filter");
//   }
// };
// const controlFilterCompleted = () => {
//   if (filterCompletedBtn.dataset.filter === "active") {
//     alert("test3");
//     filterActiveBtn.removeAttribute("data-filter");
//     filterAllBtn.removeAttribute("data-filter");
//   }
// };

const displayFilteredElement = () => {
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
};
// display todos
//and assign a value to each todo which is the index's array of each todos
const displayTodo = () => {
  containerTodo.innerHTML = todoList
    .filter(function (todo) {
      if (sortMethod === "NoSort") {
        return todo;
      }
      if (sortMethod === "ClearCompleted") {
        return todo.active === true;
      }
    })
    .map((todo) => {
      return `<div class="todo" data-todo=${todoList.indexOf(todo)}>
    <label class="todo__input">
      <input class="checkbox" type="checkbox" data-indice-checkbox="${todoList.indexOf(
        todo
      )}"/>
      <span class="checkmark">
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
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

//theme switcher
themeBtn.addEventListener("click", () => {
  if (document.body.dataset.theme === "light") {
    document.body.dataset.theme = "dark";
  } else if (document.body.dataset.theme === "dark") {
    document.body.dataset.theme = "light";
  }
  console.log(document.body.dataset);
});

todoValidationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  todoContents = document.querySelectorAll(".todo__content");
  if (inputTodo.value !== "") {
    let content = inputTodo.value;
    let newTodo = new Todo(content, false);
    todoList.push(newTodo);
  }
  displayTodo();
  allTodos = document.querySelectorAll(".todo");
  removeTodoBtns = document.querySelectorAll(".todo__close");
  checkboxs = document.querySelectorAll(".checkbox");
  inputTodo.value = "";
  todoContents = document.querySelectorAll(".todo__content");

  // markAsChecked();
  // countItemLeft(todoList);
  // // isChecked();
  // // markAsActive();
  // countItemLeft(todoList);
  isActive();
  // deleteTodo(removeTodoBtns, allTodos);
  countItemLeft(todoList);
});

window.document.body.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.className === "checkbox") {
    let i = e.target.dataset.indiceCheckbox;
    if (todoList[i].checked === false) {
      todoList[i].checked = true;
      todoList[i].active = false;
      todoContents[i].dataset.content = "isnotactive";
    } else {
      todoList[i].checked = false;
      todoList[i].active = true;
      todoContents[i].dataset.content = "isactive";
    }
    console.log(todoList);
    console.log(todoContents);
  }
});

window.document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    contentToDel = e.composedPath()[2].children[1].textContent;
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].content === contentToDel) {
        console.log(todoList[i].content);
        todoList.splice(i, 1);
      }
    }
    displayTodo();
    countItemLeft(todoList);
  }
});

clearCompletedBtn.addEventListener("click", () => {
  clearCompleted();
  displayTodo();
  countItemLeft(todoList);
  let newArr = todoList.filter(function (todo) {
    if (sortMethod === "NoSort") {
      return todo;
    }
    if (sortMethod === "ClearCompleted") {
      return todo.active === true;
    }
  });
  todoList = newArr;
  sortMethod = "NoSort";
  isActive();
});

filterAllBtn.addEventListener("click", () => {
  if (!filterAllBtn.dataset.filter) {
    filterAllBtn.setAttribute("data-filter", "active");
  } else if (filterAllBtn.dataset.filter === "active") {
    filterAllBtn.removeAttribute("data-filter");
  }
  if (filterAllBtn.dataset.filter === "active") {
    filterActiveBtn.removeAttribute("data-filter");
    filterCompletedBtn.removeAttribute("data-filter");
  }
  displayFilteredElement();
  countItemLeft(todoList);
  console.log(filterAllBtn, filterActiveBtn, filterCompletedBtn);
});

filterActiveBtn.addEventListener("click", () => {
  if (!filterActiveBtn.dataset.filter) {
    filterActiveBtn.setAttribute("data-filter", "active");
  } else if (filterActiveBtn.dataset.filter === "active") {
    filterActiveBtn.removeAttribute("data-filter");
    filterAllBtn.setAttribute("data-filter", "active");
  }
  if (filterActiveBtn.dataset.filter === "active") {
    filterAllBtn.removeAttribute("data-filter");
    filterCompletedBtn.removeAttribute("data-filter");
  }
  displayFilteredElement();
  countItemLeft(todoList);
  console.log(filterAllBtn, filterActiveBtn, filterCompletedBtn);
});

filterCompletedBtn.addEventListener("click", () => {
  if (!filterCompletedBtn.dataset.filter) {
    filterCompletedBtn.setAttribute("data-filter", "active");
  } else if (filterCompletedBtn.dataset.filter === "active") {
    filterCompletedBtn.removeAttribute("data-filter");
    filterAllBtn.setAttribute("data-filter", "active");
  }
  if (filterCompletedBtn.dataset.filter === "active") {
    filterActiveBtn.removeAttribute("data-filter");
    filterAllBtn.removeAttribute("data-filter");
  }
  displayFilteredElement();
  countItemLeft(todoList);
  console.log(filterAllBtn, filterActiveBtn, filterCompletedBtn);
});
