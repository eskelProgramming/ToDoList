class Task {
    name: string;
    completed: boolean;

    constructor(name) {
        this.name = name;
        this.completed = false;
    }

    complete() {
        console.log('Completing task: ' + this.name);
        this.completed = true;
    }
}