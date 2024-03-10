const input = document.getElementById('myInput');
const taskList = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list');
const dueDate = document.getElementById("due-date");


document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    loadCompletedTasks();
  });

function addTask() {
    const taskText = input.value.trim();

    if (taskText !== '') {
      const newTask = document.createElement('li');
      newTask.innerHTML = `
        ${taskText} <p class="due-date">Due: ${dueDate.value}</p>
        <select onchange="setPriority(this)">
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>`;
      taskList.appendChild(newTask);

      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      newTask.appendChild(span);
    }

      input.value = '';
      dueDate.value = '';
      saveTasks();
    
  }


taskList.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        while (e.target.classList.toggle("checked")){
            moveTaskToCompleted(e.target);
            saveTasks();
            play();
        };
        saveTasks();
    }

    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveTasks();
    }
}, false);


function setPriority(select) {
    const taskItem = select.parentNode;
    const priority = select.value;
    taskItem.className = `priority-${priority}`;
    saveTasks();
  }


function saveTasks() {
    localStorage.setItem('tasks', taskList.innerHTML);
    localStorage.setItem('completedTasks', completedList.innerHTML);
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
    play();
    saveTasks();
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


function displayTask(){
    taskList.innerHTML = localStorage.getItem("tasks");
}

function play() {
    var audio = document.getElementById("audio");
    audio.currentTime = 0;
    audio.play();

    const btns = document.querySelectorAll('li');
    btns.forEach(btn => btn.addEventListener('click', toggleBtnAnimation));
    saveTasks();

}

displayTask();