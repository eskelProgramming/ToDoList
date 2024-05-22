window.onload = function() {
    let submitTaskButton: HTMLButtonElement = document.querySelector("#task-submit-btn") as HTMLButtonElement;
    submitTaskButton.onclick = function() {
        addTask();
    }
}

/**
 * If the task is valid, add it to the local storage
 */
function addTask() {
    let task: Task|null = validateTask();

    if (task != null){
        addTaskToLocalStorage(task);
    }
}

/**
 * Validate the task input to make sure it isn't empty
 * create a new Task object if the input is valid
 * return null if the input is invalid
 * @returns Task|null Task object if input is valid, null otherwise
 */
function validateTask(): Task|null{
    let taskInput: HTMLInputElement = <HTMLInputElement>document.getElementById("task");
    let taskName: string = taskInput.value;
    taskName = taskName.trim();

    if (taskName == "") {
        alert("Please enter a task");
        return null;
    }
    else {
        let newTask = new Task(taskName);
        // newTask.name = taskName;
        return newTask;
    }
}

/**
 * Adds a task to the local storage
 * @param t Task to add to local storage
 */
function addTaskToLocalStorage(t: Task) {
    const taskStorageKey = "Tasks";
    // Read the existing tasks from storage
    let taskData = localStorage.getItem(taskStorageKey);

    // Initialize with existing taskData if is not null, or an empty array
    // This is a JS ternary/conditional operator
    let tasks: Task[] = taskData ? JSON.parse(taskData) : [];

    // Add the new task to the list
    tasks.push(t);

    // Add to localStorage
    taskData = JSON.stringify(tasks);
    localStorage.setItem(taskStorageKey, taskData);
}