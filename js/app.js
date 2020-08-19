const addTask = document.querySelector('#addItem');
const inputForm = document.querySelector('#inputForm');
const saveButton = document.querySelector('#saveButton');
const output = document.querySelector('#output');

// Add task button
const addItem = () => {
    // Display the input form
    inputForm.style.display = 'block';
    // Focus the input form
    taskInput.focus();
};

// Add and update item to localstorage
const checkStorage = () => {
    const input = document.querySelector('#taskInput');
    // Update localstorage if there is value in input
    if(input.value) {
        // If there is nothing in localstorage
        if(localStorage.getItem('tasks') === null) {
            // Create and empty array
            const tasks = [];
            // Push the first object in tasks array
            tasks.push({name: input.value, id: tasks.length});
            // Set the array in localstorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } else {
            // Take the first object in the tasks array from localstorage
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            // Push new task in the array
            tasks.push({name: input.value, id: tasks.length});
            // Set the update in localstorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };
    };
};

// Display item on UI
const displayItem = () => {
    // Get tasks array from localstorage
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    // Only activate if tasks array isn't empty
    if(tasks !== null) {
        // Loop through the array and create html for each of the task
        const html = tasks.map((task) => {
            return `
            <div class="item" id="${task.id}">
                <div class="label">${task.name}</div>
                <i class="edit fas fa-user-edit" id="${task.id}" title="Edit" onclick=""></i>
                <i class="delete far fa-trash-alt" id="${task.id}" title="Delete"></i>
            </div>
            `
        }).join('');
        // Put the html to the UI
        output.innerHTML = html; 
    } else {
        // If there isn't any object in tasks array then check the localstorage
        checkStorage();
    };
};

// Save the task and display the item
const saveTask = (e)  => {
    // Prevent default loading while submitting a form
    e.preventDefault();
    // Check localstorage for tasks
    checkStorage();
    // Display the tasks on UI
    displayItem();
    // Reset the form
    inputForm.reset();
    // Hide the form
    inputForm.style.display = 'none';
};

// Delete item
const deleteItem = (e) => {
    // Only activate if target's clss is delete
    if(e.target.classList.contains('delete')) {
        // Get tasks array from localstorage
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        // Get id to target
        const parent = parseInt(e.target.parentElement.id);
        // Only activate if tasks array ins't empty
        tasks.map((task, index) => {
            // Only activate if the id of task and parent id of target are same
            if(task.id === parent) {
                // Remove the parent element of the target form the UI
                e.target.parentElement.remove();
                // Remove the same object from localstorage
                tasks.splice(index, 1);
            };
        })
        // Set the update to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
};


// Hide the inputForm when clicked anywhere but inputForm element
const hideInputForm = (e) => {
    // Only activate if the clicked element is idfferent than the input form
    if(inputForm !== e.target) {
        // Hide the element from UI
        inputForm.style.display = 'none';
    }
};

// Edit task
const editTask = (e) => {
    // Only activate if the target has a class of edit
    if(e.target.classList.contains('edit')) {
        // Array of objects of tasks in localstorage
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        // Loop through the tasks array
        tasks.map(task => {
            // TextContent of target siblings
            const oldValue = e.target.previousElementSibling.textContent;
            // Only inititae if task's name is same as old value
            if(task.name === oldValue) {
                // Get new value from prompt input
                const newValue = prompt('Please update the task');
                // Only change the task if value is put on the prompt
                if(newValue) {
                    // Update correspondent task name new value in localstorage
                    task.name = newValue;
                    // Update the UI with new value
                    e.target.previousElementSibling.innerHTML = newValue;
                }
            };
        });
        // Set the update to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };   
};

document.addEventListener('click', editTask)
document.addEventListener('click', deleteItem)
document.addEventListener('mousedown', hideInputForm);
document.addEventListener('onload', displayItem());
saveButton.addEventListener('click', saveTask);
addTask.addEventListener('click', addItem);