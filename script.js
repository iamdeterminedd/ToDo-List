const addTask = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function displayTasks() {
  const tasksFromLocalStorage = getTaskFromLocalStorage();
  tasksFromLocalStorage.forEach((task) => addTaskToDOM(task));
}

function onAddTaskSubmit(e) {
  e.preventDefault();

  const newTask = taskInput.value;

  if (newTask === '') {
    alert('Please add task');
    return;
  }

  addTaskToDOM(newTask);

  addTaskToLocalStorage(newTask);

  taskInput.value = '';
}

function addTaskToDOM(task) {
  const li = document.createElement('li');
  const checkBox = createCheckBox('check-box btn-check');
  const button = createButton('remove-task btn-x text-red');

  li.appendChild(checkBox);
  li.appendChild(document.createTextNode(task));
  li.appendChild(button);

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

function createCheckBox(classes) {
  const box = document.createElement('input');
  box.type = 'checkbox';
  box.className = classes;
  return box;
}

function onClickTask(e) {
  if (e.target.parentElement.classList.contains('remove-task')) {
    removeTask(e.target.parentElement.parentElement);
  } else if (e.target.classList.contains('check-box')) {
    toggleCompletion(e.target.parentElement);
  }
}

function toggleCompletion(task) {
  task.classList.toggle('completed');
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

addTask.addEventListener('submit', onAddTaskSubmit);
taskList.addEventListener('click', onClickTask);
document.addEventListener('DOMContentLoaded', displayTasks);
