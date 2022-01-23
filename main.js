class ToDo {
    constructor({
        addToListForm,
        numberOfTasks,
        numberOfTasksCompleted,
        taskList,
        addTaskInput,
        tasks,
        doneTasks,
        inputSearch

    }) {
        this.addToListForm = addToListForm;
        this.numberOfTasks = numberOfTasks;
        this.numberOfTasksCompleted = numberOfTasksCompleted;
        this.taskList = taskList;
        this.addTaskInput = addTaskInput;
        this.tasks = tasks;
        this.doneTasks = doneTasks;
        this.inputSearch = inputSearch;
        this.toDoArr = [];
    }



    // const addToListForm = document.querySelector('form')

    refreshArr() {
        this.taskList.textContent = ''
        this.toDoArr.forEach((task, key) => {
            task.dataset.key = key
            this.taskList.appendChild(task)

        })
    }
    removeTask(e) {
        // e.target.parentNode.remove();
        let index = e.target.parentNode.dataset.key;
        // document.querySelector(`li[data-key='${index}']`).remove();
        this.toDoArr.splice(index, 1);
        this.refreshArr()
        this.display()
    }

    addTask(event) {

        event.preventDefault();
        let titleTask = this.addTaskInput.value;
        if (titleTask === '') return;
        let newTask = document.createElement('li');
        newTask.className = 'task';
        newTask.innerHTML = `<i class="material-icons" id="doneTask">
        done</i> <i class="material-icons" id="deleteTask">
            delete
            </i> <p>${titleTask}</p>`;
        this.toDoArr.push(newTask);
        this.refreshArr();
        this.addTaskInput.value = '';
        this.numberOfTasks.textContent = this.toDoArr.length - this.doneTasks.length;
        newTask.querySelector('#deleteTask').addEventListener('click', (e) => this.removeTask(e))
        newTask.querySelector('#doneTask').addEventListener('click', (e) => {
            e.target.parentNode.classList.toggle('checked');
            if (e.target.parentNode.classList.contains('checked')) {
                e.target.parentNode.querySelector('p').style.textDecoration = 'line-through'
                e.target.parentNode.querySelector('p').style.color = 'darkgrey'
            } else {
                e.target.parentNode.querySelector('p').style.textDecoration = 'solid'
                e.target.parentNode.querySelector('p').style.color = 'white'
            }

            this.display();
        })

    }


    searchTask(e) {
        const searchValue = e.target.value.toLowerCase();
        let newTasks = this.toDoArr;
        this.newTasks = newTasks.filter(li => li.textContent.toLowerCase().includes(searchValue));
        console.log(newTasks);
        this.taskList.textContent = '';
        this.newTasks.forEach(li => this.taskList.appendChild(li));
        this.display();
    }

    display() {
        this.numberOfTasks.textContent = this.toDoArr.length - this.doneTasks.length;
        this.numberOfTasksCompleted.textContent = this.doneTasks.length
    }
    start() {
        this.inputSearch.addEventListener('input', (event) => this.searchTask(event))
        this.addToListForm.addEventListener('submit', (event) => this.addTask(event))
        // this.removeButton.addEventListener('click', (event) => this.removeTask(event));
    }
}


const list = new ToDo({
    addToListForm: document.querySelector('form'),
    numberOfTasks: document.querySelector('h3 span'),
    numberOfTasksCompleted: document.querySelector('h4 span'),
    taskList: document.querySelector('ul'),
    addTaskInput: document.getElementById('addTaskInput'),
    // inputButton: document.getElementById('inputButton'),
    tasks: document.getElementsByClassName('task'),
    doneTasks: document.getElementsByClassName('checked'),
    inputSearch: document.querySelector('input.search'),
})
// removeButton.addEventListener('click', removeTask)

list.start()