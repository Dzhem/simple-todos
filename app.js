const addTodoBtn = document.querySelector(".add-todo>button");
const todosList = document.getElementById("todos");
document.addEventListener("DOMContentLoaded", loadTodos);

addTodoBtn.addEventListener("click", handleClick);

function handleClick() {
  const todoInput = this.previousElementSibling;
  const todoText = todoInput.value.trim();
  if (todoText) {
    createTodo(todoText);
    saveToStorage(todoText);
    todoInput.value = "";
  }
}

function createTodo(todoText) {
  const li = document.createElement("li");
  li.innerHTML = `<span>${todoText}</span><span class="basket">&#128465;</span>`;
  li.classList.add("todo-item");
  todosList.append(li);
  li.querySelector("span.basket").addEventListener("click", removeTodo);
}

function saveToStorage(newTodo) {
  const todos = JSON.parse(localStorage.getItem("tasks")) || [];
  localStorage.setItem("tasks", JSON.stringify([...todos, newTodo]));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("tasks"));
  if (todos) {
    todos.forEach((todo) => createTodo(todo));
  }
}

function removeTodo() {
  this.removeEventListener("click", removeTodo);
  removeFromStorage(this.previousElementSibling.innerText);
  this.closest(".todo-item").remove();
}

function removeFromStorage(removeTodo) {
  let todos = JSON.parse(localStorage.getItem("tasks"));
  todos = todos.filter((todo) => todo !== removeTodo);
  localStorage.setItem("tasks", JSON.stringify(todos));
}
