window.onload = function() {
    let submitTaskButton: HTMLButtonElement = document.querySelector("#task-submit-btn") as HTMLButtonElement;
    submitTaskButton.addEventListener("click", validateTask);
}

function validateTask() {
    let taskInput: HTMLInputElement = <HTMLInputElement>document.getElementById("task");
    let task: string = taskInput.value;
    task = task.trim();

    if (task == "") {
        alert("Please enter a task");
    }
    else {
        let newTask = new Task(task);
    }
}

