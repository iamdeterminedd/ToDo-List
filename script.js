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
  li.appendChild(document.createTextNode(task));

  const button = createButton('remove-task btn-x text-red');
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

function removeTask(e) {
  //   e.target.parentElement.parentElement;

  if (e.target.parentElement.classList.contains('remove-task')) {
    const taskRemove = e.target.parentElement.parentElement;

    if (confirm('Are you sure?')) {
      taskRemove.remove();

      removeTaskFromLocalStorage(taskRemove.textContent);
    }
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
taskList.addEventListener('click', removeTask);
document.addEventListener('DOMContentLoaded', displayTasks);
