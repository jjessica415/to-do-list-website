const myInput = document.getElementById("myInput");
const listContainer = document.getElementById("list-container");
const dueDate = document.getElementById("due-date");

function addTask() {
    if(myInput.value === ''){
        alert("You must write something!");
    }
    else {
        // upon clicking the add button after you write out your tag, it is listed under the input/add button  
        let li = document.createElement("li");
        li.innerHTML = myInput.value;
        listContainer.appendChild(li);

        // let date = document.createElement();
        // date.innerHTML = 


        // add the cross icon to each of the listed tasks
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    myInput.value = "";
    saveData();
}


listContainer.addEventListener("click", function(e){
    // when clicking on a specific task it checks and unchecks the task, strike out and unstrikes the task
    if(e.target.tagName === "LI"){
        while (e.target.classList.toggle("checked")){
            saveData();
            play();
        };
    }

    // if the cross/x is clicked on then it removes the task listed
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// document.addEventListener('click', function (event) {
// 	fadeOutAndRemove(event.target);
// });

// function fadeOutAndRemove(element) {
// 	element.classList.add('fade-out');
//     element.addEventListener('transitionend', function () {
//   	element.parentNode.removeChild(element);
//   });
// }


// listContainer.addEventListener("click", ){
//     if (e.target.tagName === "LI"){
//         while (e.target.classList)
//     }
// }

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function displayTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

function play(e) {
    var audio = document.getElementById("bell");
    audio.currentTime = 0;
    audio.play();

// double check the code below with toggleBtnAnimation, make sure it makes sense with my code
    const btns = document.querySelectorAll('li');
    btns.forEach(btn => btn.addEventListener('click', toggleBtnAnimation));

}

// // Create a new list item when clicking on the "Add" button
// function newElement() {
//     var li = document.createElement("li");
//     var inputValue = document.getElementById("myInput").value;
//     var t = document.createTextNode(inputValue);
//     li.appendChild(t);
//     if (inputValue === '') {
//       alert("You must write something!");
//     } else {
//       document.getElementById("list-container").appendChild(li);
//     }
//     document.getElementById("myInput").value = "";
  
//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//     li.appendChild(span);
  
//     for (i = 0; i < close.length; i++) {
//       close[i].onclick = function() {
//         var div = this.parentElement;
//         div.style.display = "none";
//       }
//     }
//     saveData();
//   }


displayTask();