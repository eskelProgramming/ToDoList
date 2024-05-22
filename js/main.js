window.onload = function () {
    let submitTaskButton = document.querySelector("#task-submit-btn");
    submitTaskButton.onclick = function () {
        addTask();
    };
};
function addTask() {
    let task = validateTask();
    if (task != null) {
        addTaskToLocalStorage(task);
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
