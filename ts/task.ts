class Task {
    name: string;
    completed: boolean;

    constructor(name) {
        this.name = name;
        this.completed = false;
    }

    complete(isComplete: boolean) {
        console.log('Completing task: ' + this.name);
        this.completed = isComplete;
    }
}