let taskCounter = 1; // Add this line to initialize the counter

let taskBar = document.querySelector(".active");
let cardContainer = document.querySelector(".card--container");
let addBtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal");
let backDtap = document.querySelector(".backdrop");
let closeBtn = document.querySelector(".btn-cancel");
let selectContainer = document.querySelector(".select-container");

let popup = document.querySelector(".popup");
let secendPopup = document.querySelector(".popup-2");
let thirdPopup = document.querySelector(".popup-3");
let assigne = document.querySelector(".assignee");
let reminder = document.querySelector(".reminder");
let taskrow = document.querySelector(".task-row-container");

let dateInput = document.getElementById("date-input");
let btnAdd = document.querySelector(".btn-add");
let textarea = document.querySelector(".textarea");
let inptCategory = document.querySelector(".category");
let showCategory = document.querySelector(".show-category");
let inptResponsible = document.querySelector(".responsible");
let inputID = document.querySelector(".inp-id");
let inptTitel = document.querySelector(".inp-titel");
let editButton = document.querySelector(".edit-btn");
let btnCancel = document.querySelector(".btn-cancel");

btnCancel.addEventListener("click", () => {
  modal.style.display = "none";
  backDtap.style.display = "none";
});
taskBar.addEventListener("click", () => {
  cardContainer.style.opacity = "1";
});

addBtn.addEventListener("click", () => {
  modal.style.display = "block";
  backDtap.style.display = "block";
  inputID.value = "0";
  inptTitel.value = "";
  textarea.value = "";
});

taskrow.addEventListener("click", (e) => {
  modal.style.display = "block";
  backDtap.style.display = "block";

  const taskID = e.target
    .closest(".task-row")
    .querySelectorAll(".task-title")[0].innerHTML;
  const taskTitle = e.target
    .closest(".task-row")
    .querySelectorAll(".task-title")[1].textContent;
  const taskDescription = e.target
    .closest(".task-row")
    .querySelectorAll(".task-title")[2].textContent;

  // Set the input fields to the current task's values
  inputID.value = taskID;
  inptTitel.value = taskTitle;
  textarea.value = taskDescription;

  // Edit the task when the user clicks the save button
  const saveBtn = document.querySelector(".btn-add");
  saveBtn.addEventListener("click", () => {
    const newTitle = inptTitel.value;
    const newDescription = textarea.value;
    const taskID = e.target
      .closest(".task-row")
      .querySelectorAll(".task-title")[0].innerText;
    editLocalTasks(taskID, newTitle, newDescription);
    modal.style.display = "none";
    backDtap.style.display = "none";
  });
});

function editLocalTasks(id, newTitle, newDescription) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].title = newTitle;
      tasks[i].description = newDescription;
      break;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // getLocalTasks();
}

backDtap.addEventListener("click", () => {
  popup.style.display = "none";
  secendPopup.style.display = "none";
  thirdPopup.style.display = "none";
});
closeBtn.addEventListener("click", (_e) => {
  modal.style.display = "none";
  backDtap.style.display = "none";
});
taskrow.addEventListener("click", removeChek);

selectContainer.addEventListener("click", () => {
  popup.style.display = "flex";
});
assigne.addEventListener("click", () => {
  secendPopup.style.display = "flex";
});
reminder.addEventListener("click", () => {
  thirdPopup.style.display = "flex";
});
 document.addEventListener("DOMContentLoaded", getLocalTasks);

// date
dateInput.addEventListener("change", (event) => {
  const selectedDate = event.target.value;
  console.log(selectedDate);
  document.getElementById("show-date").textContent = selectedDate;
});
//Category
inptCategory.addEventListener("change", (e) => {
  const categoryValue = e.target.value;
  console.log(categoryValue);
  document.querySelector(".show-category").textContent = categoryValue;
});
//responsible
inptResponsible.addEventListener("change", (e) => {
  const responsibleValue = e.target.value;
  document.querySelector(".show-resp").textContent = responsibleValue;
});

// Function Add tasks

btnAdd.addEventListener("click", addTask);

function addTask(e) {
  e.preventDefault();

  const taskID = inputID.value;

  if (taskID == 0) {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task-row");
    taskDiv.id = "task-" + taskCounter; // Add this line to assign a unique ID to each task
    const newTodo = ` 
<i class='bx bx-checkbox'></i>
<li class="task-title">${taskCounter}</li>
<li class="task-title">${inptTitel.value}</li>
<li class="task-title">${textarea.value}</li>
<li class="task-title">${inptCategory.value}</li>
<li class="task-title">${inptResponsible.value}</li>
<li class="task-title">${dateInput.value}</li>`;
    taskDiv.innerHTML = newTodo;
    taskrow.appendChild(taskDiv);
    // saveLocalTodos(todoInput.value)
    const newTask = {
      id: taskCounter, // Add this line to include the unique ID in the tasks object
      title: inptTitel.value,
      textarea: textarea.value,
      catagory: inptCategory.value,
      responsible: inptResponsible.value,
      date: dateInput.value,
    };
    saveLocalTasks(newTask);
    inptTitel.value = "";
    textarea.value = "";
    inptCategory.value = "";
    inptResponsible.value = "";
    dateInput.value = "";
    modal.style.display = "none";
    backDtap.style.display = "none";

    taskCounter++; // Increment the counter after adding the task
  } else {
    const newTitle = inptTitel.value;
    const newDescription = textarea.value;
    editLocalTasks(taskID, newTitle, newDescription);
  }
}

//Remove  Tasks
function removeChek(e) {
  const classList = [...e.target.classList];
  const item = e.target;

  if (classList[1] === "bx-checkbox") {
    const taskTitle = e.target
      .closest(".task-row")
      .querySelectorAll(".task-title")[0];
    const taskDescription = e.target
      .closest(".task-row")
      .querySelectorAll(".task-title")[2];

    if (taskTitle && taskDescription) {
      const taskID = taskTitle.innerText;
      removeLocalTasks(taskID);

      item.closest(".task-row").remove();
      modal.style.display = "none";
      backDtap.style.display = "none";
    }
  }
}

//LOCAL
function saveLocalTasks(task) {
  let saveTasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  saveTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(saveTasks));
}

//show in DOM
function getLocalTasks() {
  let saveTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  saveTasks.forEach((task) => {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task-row");
    const newTodo = `
      <i class='bx bx-checkbox'></i>
      <li class="task-title">${task.id}</li>
      <li class="task-title">${task.title}</li>
      <li class="task-title">${task.textarea}</li>
      <li class="task-title">${task.catagory}</li>
      <li class="task-title">${task.responsible}</li>
      <li class="task-title">${task.date}</li>`;
    taskCounter = task.id + 1;
    taskDiv.innerHTML = newTodo;
    taskrow.appendChild(taskDiv);
  });
}

//delete from Local Storage
function removeLocalTasks(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks.splice(i, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      break;
    }
  }
}
