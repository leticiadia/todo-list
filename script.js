const containerElement = document.querySelector(".todo-list");
const nameInputElement = document.querySelector(".name-input");
const dateInputElement = document.querySelector(".due-date-input");
const addButton = document.querySelector(".add-todo-button");

function getTodoList() {
  return JSON.parse(localStorage.getItem("todo-list")) || [];
}

function saveTodoList(todoList) {
  return localStorage.setItem("todo-list", JSON.stringify(todoList));
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${month}/${day}/${year}`;
}

function renderTodoList() {
  const todoList = getTodoList();
  let todoListHTML = "";

  if (todoList.length === 0) {
    todoListHTML = `
      <div class="empty-state">
        <img src="/assets/icons/notepad.svg" />
        <p>Your to-do list is empty. Create your first task.</p>        
      </div>
    `;

    containerElement.innerHTML = todoListHTML;

    return;
  }

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;

    const html = `
    <div class="todo-item">
      <span>${name}</span>
      <time>${formatDate(dueDate)}</time>
      
      <button 
        class="delete-todo-button" 
        data-index="${index}"
      >
        Delete
      </button>
    </div>
    `;

    todoListHTML += html;
  });

  containerElement.innerHTML = todoListHTML;
}

function addItemTodoList() {
  const name = nameInputElement.value;
  const dueDate = dateInputElement.value;

  if (!name.trim() || !dueDate) {
    return;
  }

  const todoList = getTodoList();
  todoList.push({ name, dueDate });

  saveTodoList(todoList);

  nameInputElement.value = "";
  dateInputElement.value = "";

  renderTodoList();
}

function removeItemTodoList(index) {
  const todoList = getTodoList();
  todoList.splice(index, 1);

  saveTodoList(todoList);

  renderTodoList();
}

if (addButton) {
  addButton.addEventListener("click", () => {
    addItemTodoList();
  });
}

containerElement.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-todo-button")) {
    const index = Number(event.target.dataset.index);
    removeItemTodoList(index);
  }
});

renderTodoList();
