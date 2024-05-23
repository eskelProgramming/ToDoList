window.onload = function() {
    let submitTaskButton: HTMLButtonElement = document.querySelector("#task-submit-btn") as HTMLButtonElement;
    submitTaskButton.onclick = function() {
        validateAndCreateTask();
    }

    // Load tasks from local storage
    loadTasksFromLocalStorage();
}

/**
 * If the task is valid, add it to the local storage
 */
function validateAndCreateTask() {
    let task: Task|null = validateTask();

    if (task != null){
        addTaskToLocalStorage(task);
        loadTasksFromLocalStorage();
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


function loadTasksFromLocalStorage() {
    const taskStorageKey = "Tasks";
    let taskData = localStorage.getItem(taskStorageKey);
    let tasks: Task[] = taskData ? JSON.parse(taskData) : [];

    // Add each task to the webpage
    for (let i : number = 0; i < tasks.length; i++) {
        // Create a new task object from the JSON data
        let task = new Task(tasks[i].name);

        // Add the task to the webpage
        addTaskToWebpage(task, i);
    }
}

/**
 * Adds a task object to the webpage. Assumes all data is valid.
 * @param task The task to add to the webpage
 */
function addTaskToWebpage(task: Task, index: number) {
    // add the task to the ul
    let ul: HTMLUListElement = document.querySelector("#task-list") as HTMLUListElement;

    // Create a new li
    let li: HTMLLIElement = document.createElement("li");

    // add a class to the li
    li.classList.add("list-group-item");

    // Create a new input element type checkbox
    let taskCheckbox = document.createElement("input");

    // Set the input type to checkbox
    taskCheckbox.setAttribute("type", "checkbox");

    // Set the input class task-checkbox
    taskCheckbox.classList.add("task-checkbox");

    // Set the initial state of the checkbox
    taskCheckbox.checked = task.completed;

    // Add onchange event to the checkbox
    taskCheckbox.onchange = function (): void {
        task.complete(taskCheckbox.checked);
        updateTaskInLocalStorage(task, taskCheckbox.checked); // Update the task in localStorage when the checkbox is clicked
        if (task.completed) {
            li.style.color = "gray";
        }
        else {
            li.style.color = "black";
        }
    };

    // Add the checkbox to the li
    li.appendChild(taskCheckbox);

    // Add the task name to the li
    let taskNameNode = document.createTextNode(" " + task.name);
    li.appendChild(taskNameNode);

    
    // Add the li to the ul
    ul.appendChild(li);
}

function updateTaskInLocalStorage(task: Task, completedStatus: Boolean): void {
    const taskStorageKey: string = "Tasks";
    let taskData: string | null = localStorage.getItem(taskStorageKey);
    let tasks: Task[] = taskData ? JSON.parse(taskData) : [];
    let taskIndex: number = tasks.findIndex(t => t.name === task.name); // Find the task by name
    if (taskIndex !== -1) {
        tasks[taskIndex] = task; // Update the task if it was found
    }

    taskData = JSON.stringify(tasks);

    localStorage.setItem(taskStorageKey, taskData);
}