// ==========================================
// SAKA TASK MANAGER DASHBOARD
// dashboard.js
// ==========================================

// LocalStorage Key
const STORAGE_KEY = "sakaTasks";

// Elements
const taskName = document.getElementById("taskName");
const taskDescription = document.getElementById("taskDescription");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskContainer = document.getElementById("taskContainer");

const searchTask = document.getElementById("searchTask");

const filterTasks = document.getElementById("filterTasks");

const clearTasks = document.getElementById("clearTasks");

// Statistics

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completionRate = document.getElementById("completionRate");

// Data

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let editId = null;

// ==========================================
// SAVE TO LOCAL STORAGE
// ==========================================

function saveTasks(){

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

}

// ==========================================
// UPDATE DASHBOARD STATS
// ==========================================

function updateStats(){

    const total = tasks.length;

    const completed = tasks.filter(task=>task.completed).length;

    const pending = total - completed;

    const percentage =
        total === 0 ? 0 :
        Math.round((completed/total)*100);

    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

    completionRate.textContent = percentage + "%";

}

// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(date){

    if(!date) return "Not Set";

    return new Date(date).toLocaleDateString();

}
// ==========================================
// RENDER TASKS
// ==========================================

function renderTasks(taskList = tasks) {

    taskContainer.innerHTML = "";

    if (taskList.length === 0) {

        taskContainer.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-list-check"></i>

            <h2>No Tasks Found</h2>

            <p>

                Start by creating your first task.

            </p>

        </div>

        `;

        updateStats();

        return;

    }

    taskList.forEach(task => {

        const priorityClass =
            task.priority === "High"
                ? "priority-high"
                : task.priority === "Medium"
                ? "priority-medium"
                : "priority-low";

        const taskCard = document.createElement("div");

        taskCard.className =
            task.completed
                ? "task-card completed"
                : "task-card";

        taskCard.innerHTML = `

            <h3>${task.name}</h3>

            <p>${task.description}</p>

            <div class="task-info">

                <span class="${priorityClass}">

                    ${task.priority}

                </span>

                <span>

                    📅 ${formatDate(task.date)}

                </span>

                <span>

                    ${task.completed ? "✅ Completed" : "⏳ Pending"}

                </span>

            </div>

            <div class="task-actions">

                <button
                    class="complete-btn"
                    onclick="toggleTask(${task.id})">

                    ${task.completed ? "Undo" : "Complete"}

                </button>

                <button
                    class="edit-btn"
                    onclick="editTask(${task.id})">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">

                    Delete

                </button>

            </div>

        `;

        taskContainer.appendChild(taskCard);

    });

    updateStats();

}
// ==========================================
// ADD / UPDATE TASK
// ==========================================

addTaskBtn.addEventListener("click", () => {

    const name = taskName.value.trim();
    const description = taskDescription.value.trim();
    const priority = taskPriority.value;
    const dueDate = taskDate.value;

    // Validation
    if (name === "" || description === "") {

        alert("Please fill in all required fields.");

        return;

    }

    // Edit Existing Task
    if (editId !== null) {

        const task = tasks.find(task => task.id === editId);

        task.name = name;
        task.description = description;
        task.priority = priority;
        task.date = dueDate;

        editId = null;

        addTaskBtn.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            Add Task
        `;

    }

    // Create New Task
    else {

        const newTask = {

            id: Date.now(),

            name,

            description,

            priority,

            date: dueDate,

            completed: false,

            createdAt: new Date().toLocaleString()

        };

        tasks.push(newTask);

    }

    saveTasks();

    renderTasks();

    clearForm();

});

// ==========================================
// CLEAR FORM
// ==========================================

function clearForm(){

    taskName.value = "";
    taskDescription.value = "";
    taskPriority.value = "High";
    taskDate.value = "";

}

// ==========================================
// EDIT TASK
// ==========================================

function editTask(id){

    const task = tasks.find(task => task.id === id);

    if(!task) return;

    taskName.value = task.name;

    taskDescription.value = task.description;

    taskPriority.value = task.priority;

    taskDate.value = task.date;

    editId = id;

    addTaskBtn.innerHTML = `
        <i class="fa-solid fa-pen"></i>
        Update Task
    `;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

// ==========================================
// DELETE TASK
// ==========================================

function deleteTask(id){

    const confirmDelete = confirm(
        "Delete this task?"
    );

    if(!confirmDelete) return;

    tasks = tasks.filter(task=>task.id!==id);

    saveTasks();

    renderTasks();

}

// ==========================================
// COMPLETE TASK
// ==========================================

function toggleTask(id){

    const task = tasks.find(task=>task.id===id);

    if(!task) return;

    task.completed = !task.completed;

    saveTasks();

    renderTasks();

}
// ==========================================
// SEARCH TASKS
// ==========================================

searchTask.addEventListener("keyup", () => {

    const keyword = searchTask.value.toLowerCase().trim();

    const filtered = tasks.filter(task =>

        task.name.toLowerCase().includes(keyword) ||

        task.description.toLowerCase().includes(keyword)

    );

    renderTasks(filtered);

});

// ==========================================
// FILTER TASKS
// ==========================================

filterTasks.addEventListener("change", () => {

    const value = filterTasks.value;

    let filtered = tasks;

    switch(value){

        case "completed":

            filtered = tasks.filter(task => task.completed);

            break;

        case "pending":

            filtered = tasks.filter(task => !task.completed);

            break;

        case "high":

            filtered = tasks.filter(task => task.priority === "High");

            break;

        case "medium":

            filtered = tasks.filter(task => task.priority === "Medium");

            break;

        case "low":

            filtered = tasks.filter(task => task.priority === "Low");

            break;

        default:

            filtered = tasks;

    }

    renderTasks(filtered);

});

// ==========================================
// CLEAR ALL TASKS
// ==========================================

clearTasks.addEventListener("click", () => {

    if(tasks.length === 0){

        alert("No tasks available.");

        return;

    }

    const confirmClear = confirm(

        "Delete ALL tasks permanently?"

    );

    if(!confirmClear) return;

    tasks = [];

    localStorage.removeItem(STORAGE_KEY);

    renderTasks();

});

// ==========================================
// ENTER KEY SUPPORT
// ==========================================

taskName.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        addTaskBtn.click();

    }

});

// ==========================================
// AUTO LOAD
// ==========================================

renderTasks();

// ==========================================
// OPTIONAL DEMO DATA
// (Runs only when LocalStorage is empty)
// ==========================================

if(tasks.length === 0){

    tasks = [

        {

            id:1,

            name:"Complete Internship Task",

            description:"Finish MainCraft Task 4 Dashboard.",

            priority:"High",

            date:"2026-07-10",

            completed:false

        },

        {

            id:2,

            name:"Update GitHub Repository",

            description:"Push latest SAKA project changes.",

            priority:"Medium",

            date:"2026-07-12",

            completed:true

        }

    ];

    saveTasks();

    renderTasks();

}

console.log("✅ SAKA Dashboard Loaded Successfully");