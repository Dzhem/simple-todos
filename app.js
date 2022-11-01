const addTodoBtn = document.querySelector(".add-todo>button");
const todosList = document.getElementById("todos");

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
  li.innerHTML = todoText + "<span>&#128465;</span>";
  li.classList.add("todo-item");
  todosList.append(li);
  li.querySelector("span").addEventListener("click", removeTodo);
}

function saveToStorage(newTodo) {
  const todos = JSON.parse(localStorage.getItem("tasks")) || [];
  localStorage.setItem("tasks", JSON.stringify([...todos, newTodo]));
}

function removeTodo() {
  this.removeEventListener("click", removeTodo);
  this.closest(".todo-item").remove();
}
