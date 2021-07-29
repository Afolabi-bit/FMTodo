const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const form = document.getElementById("form");
const input = document.getElementById("todo-input");
const todosWrapper = document.querySelector("#todos-wrapper");
const filterBtns = document.getElementById("filter");
const clearBtn = document.getElementById("clear");
const tracker = document.getElementById("tracker");

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
});

document.addEventListener("DOMContentLoaded", getTodos);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  newTodo();
});

function newTodo() {
  const inputVal = input.value;

  if (inputVal.trim() == "" || inputVal == "") {
    return;
  } else {
    let div = document.createElement("div");
    let checkbox = document.createElement("p");
    let text = document.createElement("p");
    let closeBtn = document.createElement("img");
    let check = document.createElement("img");

    div.classList.add("todo");
    checkbox.classList.add("checkbox");
    text.textContent = inputVal;
    saveToLS(inputVal);
    closeBtn.classList.add("close-btn");
    closeBtn.setAttribute("src", "./images/icon-cross.svg");

    div.appendChild(checkbox);
    div.appendChild(text);
    div.appendChild(closeBtn);
    todosWrapper.appendChild(div);
    input.value = "";
  }
}

function getTodos() {
  let todos;
  if (localStorage.getItem("FMTodos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("FMTodos"));
  }

  todos.forEach((todo) => {
    let div = document.createElement("div");
    let checkbox = document.createElement("p");
    let text = document.createElement("p");
    let closeBtn = document.createElement("img");
    let check = document.createElement("img");

    div.classList.add("todo");
    checkbox.classList.add("checkbox");
    text.textContent = todo;
    closeBtn.classList.add("close-btn");
    closeBtn.setAttribute("src", "./images/icon-cross.svg");

    div.appendChild(checkbox);
    div.appendChild(text);
    div.appendChild(closeBtn);
    todosWrapper.appendChild(div);
  });

  setInterval(() => {
    const todos = document.querySelectorAll(".todo");
    const num = [];
    todos.forEach((todo) => {
      if (!todo.classList.contains("completed")) {
        num.push(todo);
      }
    });
    tracker.textContent = num.length;
  }, 200);
}

function saveToLS(todo) {
  let todos;
  if (localStorage.getItem("FMTodos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("FMTodos"));
  }

  todos.push(todo);
  let newList = JSON.stringify(todos);
  localStorage.setItem("FMTodos", newList);
}

todosWrapper.addEventListener("click", deleteAndCheck);

function deleteAndCheck(e) {
  let elem = e.target;
  let parentElem = elem.parentElement;
  console.log(parentElem);

  if (elem.classList.contains("checkbox")) {
    parentElem.classList.toggle("completed");
    completedToLS(parentElem);
  } else if (elem.classList.contains("close-btn")) {
    deleteFromLS(parentElem);
    parentElem.remove();
  } else {
    return;
  }
}

function deleteFromLS(todo) {
  let todos;
  if (localStorage.getItem("FMTodos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("FMTodos"));
  }

  let todoIndex = todo.children[1].textContent;
  let index = todos.indexOf(todoIndex);
  todos.splice(index, 1);
  localStorage.setItem("FMTodos", JSON.stringify(todos));
}

filterBtns.addEventListener("click", filter);

function filter(e) {
  let elem = e.target;
  let todos = document.querySelectorAll(".todo");
  let res;

  todos.forEach((todo) => {
    const btns = document.querySelectorAll("#filter button");
    btns.forEach((btn) => btn.classList.remove("active"));
    if (elem.classList.contains("in-progress")) {
      elem.classList.add("active");
      !todo.classList.contains("completed")
        ? (todo.style.display = "flex")
        : (todo.style.display = "none");
    } else if (elem.classList.contains("done")) {
      elem.classList.add("active");
      todo.classList.contains("completed")
        ? (todo.style.display = "flex")
        : (todo.style.display = "none");
    } else {
      elem.classList.add("active");
      todo.style.display = "flex";
    }
  });
}

clearBtn.addEventListener("click", () => {
  const todos = document.querySelectorAll(".todo");
  todos.forEach((todo) => {
    if (todo.classList.contains("completed")) {
      todo.remove();
      deleteFromLS(todo);
    }
  });
});
