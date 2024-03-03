const myInput = document.getElementById("myInput");
const listContainer = document.getElementById("list-container");


function addTask() {
    if(myInput.value === ''){
        alert("You must write something!");
    }
    else {
        // upon clicking the add button after you write out your tag, it is listed under the input/add button  
        let li = document.createElement("li");
        li.innerHTML = myInput.value;
        listContainer.appendChild(li);
        // add the cross icon to each of the listed tasks
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    myInput.value = "";
    saveData();
}
// try to make it so that you can just press enter to add a new task instead of pressing the button every time
// myInput.addEventListener('keypress', (event) => {
//     if(event.key === 13) {
//         addTask();
//     }
// });

listContainer.addEventListener("click", function(e){
    // when clicking on a specific task it checks and unchecks the task, strike out and unstrikes the task
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    // if the cross/x is clicked on then it removes the task listed
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function displayTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

displayTask();