const addTask = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function onAddTaskSubmit(e) {
  e.preventDefault();

  const newTask = taskInput.value;

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newTask));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  taskList.appendChild(li);
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

addTask.addEventListener('submit', onAddTaskSubmit);
