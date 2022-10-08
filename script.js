// select element
const todoList = document.getElementById("todos-list");
const form = document.getElementById("main_form");

// array for to-do
let todos = [];

// add submit eventListner on form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // get title from form input
  const title = form.todoTitle.value;
  // generate unique number for task id
  const id = new Date().getTime().toString();
  if (title === "") {
    return alert("Please add Task");
  } else {
    todos.push({ title: title, id: id, complete: !1, editTask: !1 });
    form.todoTitle.value = "";
    return renderList();
  }
});

// function remove all task
const removeAll = () => {
  if (!todos.length > 0) return;
  let removeAllTodo = document.createElement("p");
  removeAllTodo.innerHTML = "Remove all";
  removeAllTodo.classList.add("deleteAll");
  removeAllTodo.onclick = () => {
    todos.length = 0;
    renderList();
  };
  todoList.appendChild(removeAllTodo);
};

// function for rmoving non digit character from id
function onlyNumber(element) {
  return element.id.replace(/\D/g, "");
}

// fuction for delete todo item
function deleteTodo(e) {
  let idToDelete = onlyNumber(e.target.parentElement);
  todos = todos.filter((todo) => todo.id !== idToDelete);
  renderList();
}

// function for complete task
const markComplete = (e) => {
  let idTocomplete = onlyNumber(e.target.parentElement);
  return (
    todos.forEach((item) =>
      idTocomplete === item.id ? (item.complete = !item.complete) : item
    ),
    renderList()
  );
};

// function for edit task mode
const editTaskMode = (e) => {
  let taskIdtoEdit = onlyNumber(e.target.parentElement.parentElement);
  return (
    todos.forEach((item) => {
      taskIdtoEdit === item.id && (item.editTask = !item.editTask);
    }),
    renderList()
  );
};

// function for add new title (edit)
const addNewTitle = (e) => {
  e.preventDefault();
  let target = e.target.parentElement;
  if (target.id === "newbtn") {
    target = e.target.parentElement.parentElement;
  }
  let newTitle = target.querySelector(".editInput").value;
  let titleId = onlyNumber(target);
  todos.forEach((todo) => {
    if (titleId === todo.id) {
      todo.title = newTitle;
      todo.complete = false;
      todo.editTask = !todo.editTask;
      return renderList();
    }
  });
};

// function for rendering todos list
const renderList = () => {
  todoList.innerHTML = "";

  // forEach loop on todos array
  todos.forEach((todo) => {
    let todoListItem = document.createElement("div");
    todoListItem.classList.add("list-item");
    todoListItem.setAttribute("id", `itemNo-${todo.id}`);

    // conditional rendering for editing task
    if (todo.editTask) {
      // create form for new title
      let formForEditTodoTitle = document.createElement("form");

      // add function on form submit
      formForEditTodoTitle.onsubmit = addNewTitle;
      formForEditTodoTitle.classList.add("newForm");
      let newTitle = document.createElement("input");
      newTitle.name = "newTitle";
      newTitle.setAttribute("id", "newinput");
      newTitle.value = todo.title;
      newTitle.autofocus = true;
      newTitle.classList.add("editInput");

      // submit button for this form
      let btnForNewTitle = document.createElement("button");
      btnForNewTitle.classList.add("btnfornewtitle");
      btnForNewTitle.onclick = addNewTitle;
      btnForNewTitle.setAttribute("id", "newbtn");
      btnForNewTitle.innerHTML = '<i class="fa-solid fa-check"></i>';

      // button for cancel new title and exit from editing mode
      let cancentbtn = document.createElement("button");
      cancentbtn.classList.add("editInput-exit");
      cancentbtn.onclick = editTaskMode;
      cancentbtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

      // append element to the todo list
      formForEditTodoTitle.appendChild(newTitle);
      todoListItem.appendChild(formForEditTodoTitle);
      todoListItem.appendChild(btnForNewTitle);
      todoListItem.appendChild(cancentbtn);
    } else {
      // create div for todo item
      let todoTask = document.createElement("div");
      todoTask.classList.add("todo-title");
      // add p tag inside div and store todo title
      todoTask.innerHTML = `<p class=${todo.complete ? "line" : ""}>${
        todo.title
      }</p>`;

      //  complete button
      let completeBtn = document.createElement("button");
      completeBtn.onclick = markComplete;
      completeBtn.classList.add("completeBtn");
      completeBtn.setAttribute("id", `complete-${todo.id}`);
      completeBtn.innerHTML = `<i class="fa-regular ${
        todo.complete ? "fa-square-check" : "fa-square"
      } complete"></i>`;

      // dlete button
      let deleteBtn = document.createElement("button");
      deleteBtn.onclick = deleteTodo;
      deleteBtn.classList.add("deletebtn");
      deleteBtn.setAttribute("id", `delete-${todo.id}`);
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can delete"></i>';

      // edit button
      let editBTn = document.createElement("button");
      editBTn.onclick = editTaskMode;
      editBTn.classList.add("editBtn");
      editBTn.setAttribute("id", `edit-${todo.id}`);
      editBTn.innerHTML = '<i class="fa-solid fa-edit"></i>';

      // append element to the todo list item
      todoListItem.appendChild(completeBtn);
      todoListItem.appendChild(todoTask);
      todoListItem.appendChild(deleteBtn);
      todoListItem.appendChild(editBTn);
    }
    // append todoListItem to todoList
    todoList.appendChild(todoListItem);
  });

  // funtion for remove all todo's
  removeAll();
};
