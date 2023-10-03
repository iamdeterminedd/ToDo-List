const addTask = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function onAddTaskSubmit(e) {
  e.preventDefault();

  const newTask = taskInput.value;

  if (newTask === '') {
    alert('Please add task');
    return;
  }

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newTask));

  const button = createButton('remove-task btn-link text-red');
  li.appendChild(button);

  taskList.appendChild(li);

  addTaskToLocalStorage(newTask);

  taskInput.value = '';
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
    }
  }
}

function addTaskToLocalStorage(task) {
  let taskFromStorage;

  if (localStorage.getItem('tasks') === null) {
    taskFromStorage = [];
  } else {
    taskFromStorage = JSON.parse(localStorage.getItem('tasks'));
  }

  taskFromStorage.push(task);

  localStorage.setItem('tasks', JSON.stringify(taskFromStorage));
}

addTask.addEventListener('submit', onAddTaskSubmit);
taskList.addEventListener('click', removeTask);
