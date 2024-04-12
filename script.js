document.addEventListener("DOMContentLoaded", function () {
    const addBtn = document.getElementById("addBtn");
    const DeleteAllBtn = document.getElementById("DeleteAllBtn");
    const CompleteBtn = document.getElementById("CompleteBtn");
    const updateBtn = document.getElementById("updateBtn");
    const taskScreen = document.querySelector(".taskscreen");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    addBtn.addEventListener("click", function () {
        const taskInput = prompt("Enter a task:");
        if (taskInput) {
            tasks.push(taskInput);
            saveTasks();
            renderTasks();
        }
    });

    DeleteAllBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete all tasks?")) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    });

    CompleteBtn.addEventListener("click", function () {
        let completeIndex = prompt("Enter the number of the task to mark as completed:\n" + listTasks());
        completeIndex = parseInt(completeIndex);
        if (!isNaN(completeIndex) && completeIndex > 0 && completeIndex <= tasks.length) {
            if (confirm(`Are you sure you want to complete "${tasks[completeIndex - 1]}"?`)) {
                tasks.splice(completeIndex - 1, 1);
                saveTasks();
                renderTasks();
            }
        } else {
            alert("Invalid input!");
        }
    });

    updateBtn.addEventListener("click", function () {
        let updateIndex = prompt("Enter the number of the task to update:\n" + listTasks());
        updateIndex = parseInt(updateIndex);
        if (!isNaN(updateIndex) && updateIndex > 0 && updateIndex <= tasks.length) {
            const newTask = prompt("Enter the updated task:");
            if (newTask) {
                tasks[updateIndex - 1] = newTask;
                saveTasks();
                renderTasks();
            } else {
                alert("Invalid input!");
            }
        } else {
            alert("Invalid input!");
        }
    });

    function renderTasks() {
        taskScreen.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskElement = document.createElement("div");
            taskElement.textContent = `${index + 1}. ${task}`;
            taskElement.classList.add("task");
            taskElement.addEventListener("click", function () {
                const deleteIndex = parseInt(this.textContent.split(".")[0]) - 1;
                if (confirm(`Are you sure you want to delete "${tasks[deleteIndex]}"?`)) {
                    tasks.splice(deleteIndex, 1);
                    saveTasks();
                    renderTasks();
                }
            });
            taskScreen.appendChild(taskElement);
        });
    }

    function listTasks() {
        let taskList = "";
        tasks.forEach((task, index) => {
            taskList += `${index + 1}. ${task}\n`;
        });
        return taskList;
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    renderTasks();
});
