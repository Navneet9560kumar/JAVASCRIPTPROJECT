document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // ✅ Render saved tasks on page load
  tasks.forEach(task => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();

    if (taskText === "") {
      console.log("Empty input, not adding task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    saveTask();
    renderTask(newTask); // ✅ Show new task
    console.clear();
    console.log("✅ All Tasks:", tasks);
    todoInput.value = "";
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.textContent = task.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";

    delBtn.addEventListener("click", () => {
      todoList.removeChild(li);
      tasks = tasks.filter(t => t.id !== task.id);
      saveTask();
    });

    li.appendChild(delBtn);
    todoList.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
