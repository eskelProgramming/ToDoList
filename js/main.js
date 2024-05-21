window.onload = function () {
    let submitTaskButton = document.querySelector("#task-submit-btn");
    submitTaskButton.addEventListener("click", validateTask);
};
function validateTask() {
    let taskInput = document.getElementById("task");
    let task = taskInput.value;
    task = task.trim();
    if (task == "") {
        alert("Please enter a task");
    }
    else {
        let newTask = new Task(task);
    }
}
