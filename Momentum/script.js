/*
Features to be implemented:
 
1. Add task-items using #task-input.
2. Remove task-items by clicking on the .delete-button.
3. Save the "status" of a #task-item if it's completed.
4. Save the #task-list in localStorage.
*/

const taskForm = document.querySelector("form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let allTasks = getTasks();
updateTaskList();

// Prevent default page reload and call addTask function.
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});

// If taskText.length is above zero add it to the allTasks array and set the input field to be empty.
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText.length > 0) {
    const taskObject = {
      text: taskText,
      completed: false,
    };
    allTasks.push(taskObject);
    updateTaskList();
    saveTasks();
    taskInput.value = "";
  }
}

//To have previous tasks in the list, best way is to recreate the list every time a task is added.
function updateTaskList() {
  taskList.innerHTML = "";
  allTasks.forEach((task, taskIndex) => {
    taskItem = createTaskItem(task, taskIndex);
    taskList.append(taskItem);
  });
}

// Function to create the items in HTML.
function createTaskItem(task, taskIndex) {
  const taskID = "task-" + taskIndex;
  const taskItem = document.createElement("li");
  const taskText = task.text;
  taskItem.className = "task-item";
  taskItem.innerHTML = `
            <input type="checkbox" id="${taskID}" />

          <label for="${taskID}" class="custom-checkbox">
            <svg
              fill="transparent"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>

          <label for="${taskID}" class="task-text">${taskText}</label>

          <button class="delete-button">
            <svg
              fill="var(--secondary-color)"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
          `;
  const deleteButton = taskItem.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTaskItem(taskIndex);
  });
  const checkbox = taskItem.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTasks[taskIndex].completed = checkbox.checked;
    saveTasks();
  });
  checkbox.checked = task.completed;
  return taskItem;
}

function deleteTaskItem(taskIndex) {
  allTasks = allTasks.filter((_, i) => i !== taskIndex);
  saveTasks();
  updateTaskList();
}

function saveTasks() {
  // Only string values can be stored in the localStorage.
  const tasksJSON = JSON.stringify(allTasks);
  localStorage.setItem("tasks", tasksJSON);
}

function getTasks() {
  // Prevent the function to return null, generate an empty array.
  const tasks = localStorage.getItem("tasks") || "[]";
  // Convert tasks to the JavaScript array from the JSON string.
  return JSON.parse(tasks);
}
