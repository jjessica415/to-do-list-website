const input = document.getElementById('myInput');
const taskList = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list');
const dueDate = document.getElementById("due-date");
// const todosHtml = document.querySelector(".todos");
// let todosJson = JSON.parse(localStorage.getItem("todos"))
// const filters = document.querySelectorAll(".filter");

// let filter = '';

// function addTask() {
//     if(myInput.value === ''){} 
//     else {
//         // upon clicking the add button after you write out your tag, it is listed under the input/add button  
//         let li = document.createElement("li");
//         li.innerHTML = `${myInput.value} <p class="due-date">Due Date: ${dueDate.value}</p>`;
        
//         // do {
//         //     li.innerHTML = `<p class="due-date">Due Date: ${dueDate.value}</p>`;
//         // } while (dueDate.value != '');
//         listContainer.appendChild(li);

//         // let task = {
//         //     description: inputBox.value,
//         //     dueDate: dueDate.value,
//         //   };
//         //   compltedTask.push(task);
//         // //   let li = document.createElement("li");
//         //   li.innerHTML = `${inputBox.value} <p class="due-date">Due: ${dueDate.value}</p>`;
//         // //   listContainer.appendChild(li);

//         // add the cross icon to each of the listed tasks
//         let span = document.createElement("span");
//         span.innerHTML = "\u00d7";
//         li.appendChild(span);
//     }
//     myInput.value = "";
//     dueDate.value = "";
//     saveData();
// }

document.addEventListener('DOMContentLoaded', function () {
    // loadTasks();
    loadCompletedTasks();
  });

function addTask() {
    const taskText = input.value.trim();

    // if (taskText !== '') {

    if(input.value === ''){} 
    else {
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
    //   setPriority(newTask.querySelector('select')); // Set initial priority


      // add the cross icon to each of the listed tasks
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      newTask.appendChild(span);
    }

      input.value = '';
      dueDate.value = '';
      saveTasks();
    
  }


taskList.addEventListener("click", function(e){
    // when clicking on a specific task it checks and unchecks the task, strike out and unstrikes the task
    if(e.target.tagName === "LI"){
        while (e.target.classList.toggle("checked")){
            moveTaskToCompleted(e.target);
            saveTasks();
            play();
        };
        saveTasks();
    }

    // if the cross/x is clicked on then it removes the task listed
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

// // allows the information/data to be saved, even when you exit/reopen, refresh, and backout of the page 
// function saveData(){
//     localStorage.setItem("data", taskList.innerHTML);
// }

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


function displayTask(){
    taskList.innerHTML = localStorage.getItem("tasks");
}

function play(e) {
    var audio = document.getElementById("audio");
    audio.currentTime = 0;
    audio.play();

// double check the code below with toggleBtnAnimation, make sure it makes sense with my code
    const btns = document.querySelectorAll('li');
    btns.forEach(btn => btn.addEventListener('click', toggleBtnAnimation));
    saveTasks();

}

// filters.forEach(function (el) {
//     el.addEventListener("click", (e) => {
//       if (el.classList.contains('active')) {
//         el.classList.remove('active');
//         filter = '';
//       } else {
//         filters.forEach(tag => tag.classList.remove('active'));
//         el.classList.add('active');
//         filter = e.target.dataset.filter;
//       }
//       showTodos();
//     });
//   });


displayTask();