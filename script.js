// select element
const todoList = document.getElementById("todos-list");
const form = document.getElementById("main_form");

// read previous tasks. If no tasks were found, start with an empty list
let todos = JSON.parse(localStorage.getItem("tasks")) || [];

// function for submit todo item
const submitTodo = (e) => {
  e.preventDefault();
  // get title from form input
  let title = form.todoTitle.value;
  // generate random numbers for task id
  let id = new Date().getTime().toString();
  if (title !== "") {
    //   add task in todos
    todos.push({ title: title, id: id, complete: false, editTask: false });
    form.todoTitle.value = "";
    return renderList();
  } else return alert("Please add Task");
};

// add submit eventListner on form
form.addEventListener("submit", submitTodo);

// fuction for delete todo item
const deleteTodo = (taskIdToDelete) => {
  todos = todos.filter((todo) => todo.id !== taskIdToDelete);
  return renderList();
};

// function for complete task
const markComplete = (taskIdtoComplete) => {
  todos.forEach((item) =>
    taskIdtoComplete === item.id ? (item.complete = !item.complete) : item
  );
  return renderList();
};

// function for enter and exit task edit
const editTaskMode = (taskIdtoEdit) => {
  todos.forEach((item) => {
    taskIdtoEdit === item.id && (item.editTask = !item.editTask);
  });
  return renderList();
};

// function for submit new edited title
const submitNewTodo = (e, newTitle, taskIdToChange) => {
  e.preventDefault();
  return todos.forEach((todo) => {
    if (taskIdToChange === todo.id) {
      todo.title = newTitle.value;
      todo.complete = false;
      todo.editTask = !todo.editTask;
      return renderList();
    }
  });
};

// function for rendering todos list
const renderList = () => {
  // store the new task in localStorage
  localStorage.setItem("tasks", JSON.stringify(todos));

  // update task in todos array
  todos = JSON.parse(localStorage.getItem("tasks")) || [];

  todoList.innerHTML = "";

  // forEach loop on todos array
  todos.forEach((todo) => {
    // todo list item
    let todoListItem = document.createElement("div");
    todoListItem.classList.add("todo_list_item");

    // conditional rendering for editing task
    if (todo.editTask) {
      // create form for edit task
      let formForEditTodoTitle = document.createElement("form");
      formForEditTodoTitle.classList.add("newForm");
      formForEditTodoTitle.setAttribute("id", todo.id);
      formForEditTodoTitle.onsubmit = (e) =>
        submitNewTodo(e, newTitle, todo.id);

      // input for new title
      let newTitle = document.createElement("input");
      newTitle.name = "newTitle";
      newTitle.value = todo.title;
      newTitle.classList.add("editInput");

      // submit button for this form
      let btnForNewTitle = document.createElement("button");
      btnForNewTitle.classList.add("submit_new_title");
      btnForNewTitle.setAttribute("form", todo.id);
      btnForNewTitle.innerHTML = '<i class="fa-solid fa-check"></i>';

      // button for cancel new title and exit from editing mode
      let cancentbtn = document.createElement("button");
      cancentbtn.classList.add("cancel_new_title");
      cancentbtn.onclick = () => editTaskMode(todo.id);
      cancentbtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

      // append to the todo list
      formForEditTodoTitle.appendChild(newTitle);
      todoListItem.appendChild(formForEditTodoTitle);
      todoListItem.appendChild(btnForNewTitle);
      todoListItem.appendChild(cancentbtn);
    } else {
      // div todo title
      let todoTask = document.createElement("div");
      todoTask.classList.add("todo_title");
      todoTask.innerHTML = `<p class=${todo.complete ? "line" : ""}>${
        todo.title
      }</p>`;

      //  complete button
      let completeBtn = document.createElement("button");
      completeBtn.onclick = () => markComplete(todo.id);
      completeBtn.classList.add("completeBtn");
      completeBtn.innerHTML = `<i class="fa-regular ${
        todo.complete ? "fa-square-check" : "fa-square"
      } complete"></i>`;

      // dlete button
      let deleteBtn = document.createElement("button");
      deleteBtn.onclick = () => deleteTodo(todo.id);
      deleteBtn.classList.add("deletebtn");
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can delete"></i>';

      // edit button
      let editBTn = document.createElement("button");
      editBTn.onclick = () => editTaskMode(todo.id);
      editBTn.classList.add("editBtn");
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
};
renderList();
