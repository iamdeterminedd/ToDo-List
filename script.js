const addTask = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function onAddTaskSubmit(e) {
  e.preventDefault();

  const newTask = taskInput.value;

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newTask));

  taskList.appendChild(li);
  taskInput.value = '';
}

addTask.addEventListener('submit', onAddTaskSubmit);
