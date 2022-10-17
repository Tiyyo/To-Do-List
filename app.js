const containerTodo = document.getElementsByClassName("container__todos")[0];
const inputTodo = document.getElementById("todo");
const todoValidationForm =
  document.getElementsByClassName("container__input")[0];
const itemLeftValue = document.getElementsByClassName("items--left")[0];
let allTodos = [];
let removeTodoBtns = [];
let checkboxs = [];
let todoList = [];
let todoContent = [];
allTodos = document.querySelectorAll(".todo");
removeTodoBtns = document.querySelectorAll(".todo__close");
checkboxs = document.querySelectorAll(".checkbox");

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
    for (i = 0; i < todoList.length - 1; i++) {
      if (checkboxs[i].checked === true) {
        todoList[i].checked = true;
      }
      if (todoList[i].checked === true) {
        checkboxs[i].checked = true;
      }
    }
  }
  console.log(todoList);
  console.log(checkboxs);
}
//mark a todo as complete
// an array of input as argument
const markAsChecked = () => {
  checkboxs.forEach((checkbox) => {
    checkbox.addEventListener("input", (e) => {
      i = e.target.dataset.indiceCheckbox;
      if (checkbox.checked === true) {
        todoList[i].checked = true;
      } else if (checkbox.checked === false) {
        todoList[i].checked = false;
      }
      console.log(todoList[i]);
      // if ((todoList[i].checked = true)) {
      //   console.log(todoList);
      //   checkboxs[i].checked = true;
      // }
    });
  });
};
const markAsActive = () => {
  //   todoContent.forEach((checkbox) => {
  //     checkbox.addEventListener("input", (e) => {
  //       i = e.target.dataset.indiceCheckbox;
  //       if ((checkbox.checked = true)) {
  //         todoList[i].checked = true;
  //       } else {
  //         todoList[i].checked = false;
  //         checkbox[i].checkbox = false;
  //       }
  //       // if ((todoList[i].checked = true)) {
  //       //   console.log(todoList);
  //       //   checkboxs[i].checked = true;
  //       // }
  //     });
  //   });
};

const lineThroughtTodo = () => {};

// an array as argument
const countItemLeft = (anArray) => {
  itemLeftValue.textContent = `${anArray.length}` + " ";
};

// an array of button as first argument
// an array of element to delete as second argument
const deleteTodo = (buttons, item) => {
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      i = e.composedPath()[1].dataset.deleteBtn;
      item[i].remove();
      todoList.splice(i, 1);
      countItemLeft(todoList);
    });
  });
};

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
    <p class="todo__content" data-todo-content="${todoList.indexOf(todo)}">${
        todo.content
      }</p>
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
    content = inputTodo.value;
    let newTodo = new Todo(content, false);
    todoList.push(newTodo);
    displayTodo();
    allTodos = document.querySelectorAll(".todo");
    removeTodoBtns = document.querySelectorAll(".todo__close");
    checkboxs = document.querySelectorAll(".checkbox");
    inputTodo.value = "";
    todoContent = document.querySelectorAll(".todo__content");
  }
  store();
  markAsChecked();
  isChecked();
  markAsActive();
  lineThroughtTodo();
  deleteTodo(removeTodoBtns, allTodos);
  countItemLeft(todoList);
});
