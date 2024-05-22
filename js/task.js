class Task {
    constructor(name) {
        this.name = name;
        this.completed = false;
    }
    complete(isComplete) {
        console.log('Completing task: ' + this.name);
        this.completed = isComplete;
    }
}
