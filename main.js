// Buoc 1: goi bien bang id
// Buoc 2: add su kien submut
// Buoc 3: them su kien ngam chan
// Buoc 4: tao 1 ham chu bien
// Buoc 5: dung if
let todos = [];

// HANDLE ADD FORM
const addInputNode = document.getElementById("addInput");
const addFormNode = document.getElementById("addForm");
addFormNode.addEventListener("submit", (event) => {
  event.preventDefault();
  if (addInputNode.value) {
    addTodo(addInputNode.value);
    addInputNode.value = "";
  }
});

function addTodo(addedValue) {
  const newTodo = {
    id: Date.now(),
    label: addedValue,
    isDone: false,
  };
  todos.unshift(newTodo);
  renderTodos();
}
/*-----------------------*/

/*--- HANDLE RENDER TODO-ITEMS ---*/
function renderTodos() {
  // create todo list node
  // tao mot cai todo de them gia tri vao
  const todoListNode = document.getElementById("todoList");
  todoListNode.innerHTML = "";
  // lặp qua mảng "todos" để xử lý các mục việc cần làm kết xuất
  // loop through "todos" array to handle render todo-items
  todos.forEach((todo) => {
    // this is todo-item's keys
    const { id, label, isDone, isEditting } = todo || {};

    // todoItemNode: wrap toto-item content
    const todoItemNode = document.createElement("li");
    todoItemNode.className = `todo-item ${isDone ? "done" : ""}`;
    todoItemNode.id = id;
    // lam sao cho hien thu thu muc can thao tac
    // labelNode: render todo-item label
    const labelNode = document.createElement("span");
    labelNode.className = "todo-label";
    labelNode.innerText = label;

    // tom gon cac hanh dong can lam
    // actionNode: wrap todo-item actions
    // them hanh dong add id vao
    const actionNode = document.createElement("div");
    actionNode.className = "todo-action";

    // deleteBtnNode: button handle delete action
    const deleteBtnNode = document.createElement("button");
    deleteBtnNode.className = "btn btn-delete";
    deleteBtnNode.innerText = "Delete";
    deleteBtnNode.addEventListener("click", (e) => {
      e.preventDefault();
      deleteTodo(id);
    });
    // them hanh dong chinh sua khi nhan vao
    // editBtnNode: button handle edit action
    const editBtnNode = document.createElement("button");
    editBtnNode.className = "btn btn-edit";
    editBtnNode.innerText = "Edit";
    editBtnNode.addEventListener("click", (e) => {
      e.preventDefault();
      toggleEditView(id);
    });
    // lenh xu ly hanh dong khi thuc hien tac vu xong
    // doneBtnNode: button handle done action
    const doneBtnNode = document.createElement("button");
    doneBtnNode.className = "btn btn-done";
    doneBtnNode.innerText = isDone ? "Undone" : "Done";
    doneBtnNode.addEventListener("click", (e) => {
      e.preventDefault();
      updateTodoStatus(id);
    });
    // xu ly dau vao khi tiep nhan dang ky cua nguoi dung dien vao
    // editInputNode: input handle get user edited-label
    const editInputNode = document.createElement("input");
    editInputNode.className = "input editInput";
    editInputNode.value = label;
    // nut xu ly de luu sau khi xu ly xong
    // saveBtnNode: button handle save user edited-label
    const saveBtnNode = document.createElement("button");
    saveBtnNode.className = "btn";
    saveBtnNode.innerText = "Save";

    // editFormNode: form cover & handle submit edited-label
    const editFormNode = document.createElement("form");
    editFormNode.className = "form editForm";
    editFormNode.addEventListener("submit", (e) => {
      e.preventDefault();
      if (editInputNode.value) {
        updateTodoLabel(id, editInputNode.value);
        toggleEditView(id);
        editInputNode.value = "";
      }
    });
    // neu dung thi no se add va gui cai ma da chinh sua xong
    // if "isEditting" true, render edit view with editFormNode
    if (isEditting) {
      editFormNode.appendChild(editInputNode);
      editFormNode.appendChild(saveBtnNode);

      todoItemNode.appendChild(editFormNode);
    }
    // neu sai se hien thi lai che do xem tt va chinh sua
    // if "isEditting" false, render info view with labelNode & actionNode
    else {
      actionNode.appendChild(deleteBtnNode);
      !isDone && actionNode.appendChild(editBtnNode);
      actionNode.appendChild(doneBtnNode);

      todoItemNode.appendChild(labelNode);
      todoItemNode.appendChild(actionNode);
    }

    // add this todoItemNode into todoListNode
    todoListNode.appendChild(todoItemNode);
  });
}
/*-----------------------*/

// FUNCTIONS

// handle delete todo item by id
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

// handle update todo item's status
function updateTodoStatus(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
  );
  renderTodos();
}

// handle toggle todo item's edit view
function toggleEditView(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, isEditting: !todo.isEditting } : todo
  );
  renderTodos();
}

// handle update todo item's label
function updateTodoLabel(id, editedLabel) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, label: editedLabel } : todo
  );
  renderTodos();
}
