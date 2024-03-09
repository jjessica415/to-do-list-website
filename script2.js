document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    loadCompletedTasks();
  });

  function addTask() {
    const input = document.getElementById('new-task');
    const taskText = input.value.trim();
    const prioritySelect = document.getElementById('priority-select');
    const priority = prioritySelect.value;

    if (taskText !== '') {
      const taskList = document.getElementById('todo-list');
      const newTask = document.createElement('li');
      newTask.innerHTML = `
        <input type="checkbox" onclick="toggleCompletion(this)">
        <span>${taskText}</span>
        <button onclick="removeTask(this)">Remove</button>
        <select onchange="setPriority(this)">
          <option value="low" ${priority === 'low' ? 'selected' : ''}>Low</option>
          <option value="medium" ${priority === 'medium' ? 'selected' : ''}>Medium</option>
          <option value="high" ${priority === 'high' ? 'selected' : ''}>High</option>
        </select>
      `;
      newTask.className = `priority-${priority}`;
      taskList.appendChild(newTask);
      saveTasks();
      input.value = '';
    }
  }

  function removeTask(button) {
    const taskList = document.getElementById('todo-list');
    const completedList = document.getElementById('completed-list');
    const taskItem = button.parentNode;
    
    if (taskItem.classList.contains('completed')) {
      completedList.removeChild(taskItem);
    } else {
      taskList.removeChild(taskItem);
    }

    saveTasks();
  }

  function toggleCompletion(checkbox) {
    const taskText = checkbox.nextElementSibling;
    const taskItem = checkbox.parentNode;

    if (checkbox.checked) {
      taskText.classList.add('completed');
      moveTaskToCompleted(taskItem);
    } else {
      taskText.classList.remove('completed');
      moveTaskToTodoList(taskItem);
    }

    saveTasks();
  }

  function setPriority(select) {
    const taskItem = select.parentNode;
    const priority = select.value;
    taskItem.className = `priority-${priority}`;
    saveTasks();
  }

  function saveTasks() {
    const taskList = document.getElementById('todo-list');
    const completedList = document.getElementById('completed-list');
    localStorage.setItem('tasks', taskList.innerHTML);
    localStorage.setItem('completedTasks', completedList.innerHTML);
  }

  function loadTasks() {
    const taskList = document.getElementById('todo-list');
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      taskList.innerHTML = savedTasks;
      const selects = taskList.querySelectorAll('select');
      selects.forEach(setPriority);
    }
  }
  

  function loadCompletedTasks() {
    const completedList = document.getElementById('completed-list');
    const savedCompletedTasks = localStorage.getItem('completedTasks');
    if (savedCompletedTasks) {
      completedList.innerHTML = savedCompletedTasks;
    }
  }

  function moveTaskToCompleted(taskItem) {
    const completedList = document.getElementById('completed-list');
    completedList.appendChild(taskItem);
    saveTasks();
  }

  function moveTaskToTodoList(taskItem) {
    const todoList = document.getElementById('todo-list');
    todoList.appendChild(taskItem);
    saveTasks();
  }

  function checkEnterKey(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  }

  function showTab(tabName) {
    const todoTab = document.getElementById('todo-tasks');
    const completedTab = document.getElementById('completed-tasks');

    if (tabName === 'todo') {
      todoTab.style.display = 'block';
      completedTab.style.display = 'none';
    } else if (tabName === 'completed') {
      todoTab.style.display = 'none';
      completedTab.style.display = 'block';
    }
  }