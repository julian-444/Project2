let tasks = [];

const taskForm = document.getElementById("taskForm");
const taskTitleInput = document.getElementById("taskTitle");
const taskPrioritySelect = document.getElementById("taskPriority");
const taskList = document.getElementById("taskList");

taskForm.onsubmit = function (event) {
    event.preventDefault();

    const title = taskTitleInput.value.trim();
    const priority = taskPrioritySelect.value;
    const status = document.querySelector('input[name="taskStatus"]:checked').value;

    if (title === "" || priority === "") {
        alert("Please fill in all task details.");
        return;
    }

    const task = {
        title: title,
        priority: priority,
        status: status
    };

    tasks.push(task);
    renderTasks();
    taskForm.reset();
    document.getElementById("pendingStatus").checked = true;
};

function renderTasks() {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement("li");
        li.className = "list-group-item";

        const taskContainer = document.createElement("div");
        taskContainer.className = "task-item";

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        if (tasks[i].status === "Completed") {
            taskInfo.classList.add("completed-task");
        }

        let priorityClass = "";
        if (tasks[i].priority === "Low") {
            priorityClass = "priority-low";
        } else if (tasks[i].priority === "Medium") {
            priorityClass = "priority-medium";
        } else if (tasks[i].priority === "High") {
            priorityClass = "priority-high";
        }

        taskInfo.innerHTML =
            "<strong>Title:</strong> " + tasks[i].title + "<br>" +
            "<strong>Priority:</strong> <span class='" + priorityClass + "'>" + tasks[i].priority + "</span><br>" +
            "<strong>Status:</strong> " + tasks[i].status;

        const actionDiv = document.createElement("div");
        actionDiv.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.className = "btn btn-success btn-sm";
        completeButton.textContent = "Mark Complete";
        completeButton.onclick = createCompleteHandler(i);

        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-danger btn-sm";
        removeButton.textContent = "Remove";
        removeButton.onclick = createRemoveHandler(i);

        actionDiv.appendChild(completeButton);
        actionDiv.appendChild(removeButton);

        taskContainer.appendChild(taskInfo);
        taskContainer.appendChild(actionDiv);
        li.appendChild(taskContainer);
        taskList.appendChild(li);
    }
}

function createRemoveHandler(index) {
    return function () {
        tasks.splice(index, 1);
        renderTasks();
    };
}

function createCompleteHandler(index) {
    return function () {
        tasks[index].status = "Completed";
        renderTasks();
    };
}
