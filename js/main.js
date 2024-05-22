window.onload = function () {
    let submitTaskButton = document.querySelector("#task-submit-btn");
    submitTaskButton.onclick = function () {
        validateAndCreateTask();
    };
    loadTasksFromLocalStorage();
};
function validateAndCreateTask() {
    let task = validateTask();
    if (task != null) {
        addTaskToLocalStorage(task);
        loadTasksFromLocalStorage();
    }
}
function validateTask() {
    let taskInput = document.getElementById("task");
    let taskName = taskInput.value;
    taskName = taskName.trim();
    if (taskName == "") {
        alert("Please enter a task");
        return null;
    }
    else {
        let newTask = new Task(taskName);
        return newTask;
    }
}
function addTaskToLocalStorage(t) {
    const taskStorageKey = "Tasks";
    let taskData = localStorage.getItem(taskStorageKey);
    let tasks = taskData ? JSON.parse(taskData) : [];
    tasks.push(t);
    taskData = JSON.stringify(tasks);
    localStorage.setItem(taskStorageKey, taskData);
}
function loadTasksFromLocalStorage() {
    const taskStorageKey = "Tasks";
    let taskData = localStorage.getItem(taskStorageKey);
    let tasks = taskData ? JSON.parse(taskData) : [];
    for (let task of tasks) {
        addTaskToWebpage(task);
    }
}
function addTaskToWebpage(task) {
    let ul = document.querySelector("#task-list");
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    let taskCheckbox = document.createElement("input");
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.classList.add("task-checkbox");
    li.appendChild(taskCheckbox);
    let taskNameNode = document.createTextNode(" " + task.name);
    li.appendChild(taskNameNode);
    ul.appendChild(li);
}
