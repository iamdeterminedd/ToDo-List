const addTask = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

formattedDate();

function displayTasks() {
  const tasksFromLocalStorage = getTaskFromLocalStorage();
  const completedFromLocalStorage = getCompletedTaskFromLocalStorage();
  tasksFromLocalStorage.forEach((task) =>
    addTaskToDOM(task, completedFromLocalStorage.includes(task))
  );
}

function onAddTaskSubmit(e) {
  e.preventDefault();

  const newTask = taskInput.value;
  const completed = false;

  if (newTask === '') {
    alert('Please add task');
    return;
  }

  addTaskToDOM(newTask, completed);

  addTaskToLocalStorage(newTask);

  taskInput.value = '';
}

function addTaskToDOM(task, completed) {
  const li = document.createElement('li');
  const checkBox = createCheckBox('check-box btn-check', completed);
  const button = createButton('remove-task btn-x text-red');

  li.appendChild(checkBox);
  li.appendChild(document.createTextNode(task));
  li.appendChild(button);

  if (completed) {
    li.classList.add('completed');
  }

  taskList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function createCheckBox(classes, completed) {
  const box = document.createElement('input');
  box.type = 'checkbox';
  box.className = classes;
  box.checked = completed;
  box.addEventListener('change', toggleCompletion);
  return box;
}

function onClickTask(e) {
  if (e.target.parentElement.classList.contains('remove-task')) {
    removeTask(e.target.parentElement.parentElement);
  } else if (e.target.classList.contains('check-box')) {
    toggleCompletion(e.target.parentElement);
  }
}

function toggleCompletion(e) {
  const checkbox = e.target;
  const task = checkbox.parentElement;
  task.classList.toggle('completed', checkbox.checked);

  updateCompletedTaskInLocalStorage(task.textContent, checkbox.checked);
}

function getCompletedTaskFromLocalStorage() {
  let completedFromLocalStorage;

  if (localStorage.getItem('completed') === null) {
    completedFromLocalStorage = [];
  } else {
    completedFromLocalStorage = JSON.parse(localStorage.getItem('completed'));
  }

  return completedFromLocalStorage;
}

function updateCompletedTaskInLocalStorage(task, completed) {
  let completedFromLocalStorage = getCompletedTaskFromLocalStorage();

  if (completed) {
    completedFromLocalStorage.push(task);
  } else {
    completedFromLocalStorage = completedFromLocalStorage.filter(
      (i) => i !== task
    );
  }

  localStorage.setItem('completed', JSON.stringify(completedFromLocalStorage));
}

function removeTask(task) {
  if (confirm('Are you sure?')) {
    task.remove();
    removeTaskFromLocalStorage(task.textContent);
  }
}

function addTaskToLocalStorage(task) {
  let taskFromStorage = getTaskFromLocalStorage();

  taskFromStorage.push(task);

  localStorage.setItem('tasks', JSON.stringify(taskFromStorage));
}

function getTaskFromLocalStorage() {
  let taskFromLocalStorage;

  if (localStorage.getItem('tasks') === null) {
    taskFromLocalStorage = [];
  } else {
    taskFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
  }

  return taskFromLocalStorage;
}

function removeTaskFromLocalStorage(task) {
  let taskFromLocalStorage = getTaskFromLocalStorage();

  taskFromLocalStorage = taskFromLocalStorage.filter((i) => i !== task);

  localStorage.setItem('tasks', JSON.stringify(taskFromLocalStorage));
}

function formattedDate() {
  let currentDate = new Date();

  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  let formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    currentDate
  );
  document.getElementById('currentDate').innerHTML = formattedDate;
}

addTask.addEventListener('submit', onAddTaskSubmit);
taskList.addEventListener('click', onClickTask);
document.addEventListener('DOMContentLoaded', displayTasks);
