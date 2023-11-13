const inputElement = document.querySelector(".new-task-input");
const addNewTaskButton = document.querySelector(".new-task-button");
const messageError = document.querySelector(".error-message");
const tasksContent = document.querySelector(".tasks-list");

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const isValid = validateInput();

  if (!isValid) {
    messageError.classList.remove("hidden");
    inputElement.classList.add("error");
  } else {
    inputElement.classList.remove("error");

    messageError.classList.add("hidden");

    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("tasks-content");

    const taskTextWrapper = document.createElement("div");
    taskTextWrapper.classList.add("task-text-wrapper");

    const completeButton = document.createElement("input");
    completeButton.type = "checkbox";
    completeButton.classList.add("complete-button");
    completeButton.addEventListener("input", () =>
      handleCompleteTask(completeButton, taskText, taskItemContainer)
    );

    const taskText = document.createElement("p");
    taskText.innerText = inputElement.value;
    taskText.classList.add("tasks-text");

    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fa-solid", "fa-trash", "cursor-pointer");
    deleteButton.addEventListener("click", () => {
      taskItemContainer.remove();
    });

    taskItemContainer.appendChild(taskTextWrapper);
    taskTextWrapper.appendChild(completeButton);
    taskTextWrapper.appendChild(taskText);
    taskItemContainer.appendChild(deleteButton);
    tasksContent.appendChild(taskItemContainer);
    inputElement.value = "";
  }
};

const handleInputChange = () => {
  const isValid = validateInput();
  if (isValid) {
    messageError.classList.add("hidden");
    inputElement.classList.remove("error");
  }
};

const handleCompleteTask = (completeButton, taskText, taskItemContainer) => {
  const isComplete = completeButton.checked;
  if (isComplete) {
    taskText.classList.add("completed");
    taskItemContainer.classList.add("opacity-50");
  } else {
    taskText.classList.remove("completed");
    taskItemContainer.classList.remove("opacity-50");
  }
};

/* ADICIONAR TAREFA */
addNewTaskButton.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleAddTask();
  }
});

/* VALIDAR INPUT */
inputElement.addEventListener("input", () => handleInputChange());
