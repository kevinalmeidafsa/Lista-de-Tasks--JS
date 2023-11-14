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
      handleCompleteTask(completeButton, taskTextWrapper, taskItemContainer)
    );

    const taskText = document.createElement("p");
    taskText.innerText = inputElement.value;
    taskText.classList.add("tasks-text");

    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fa-solid", "fa-trash", "cursor-pointer");
    deleteButton.addEventListener("click", () =>
      handleDeleteTask(taskItemContainer, taskTextWrapper)
    );
    taskItemContainer.appendChild(taskTextWrapper);
    taskTextWrapper.appendChild(completeButton);
    taskTextWrapper.appendChild(taskText);
    taskItemContainer.appendChild(deleteButton);
    tasksContent.appendChild(taskItemContainer);
    inputElement.value = "";

    updateLocalStorage();
  }
};

/* FUNCTION COMPLETAR TAREFA */
const handleCompleteTask = (
  completeButton,
  taskTextWrapper,
  taskItemContainer
) => {
  const tasks = tasksContent.childNodes;
  for (const task of tasks) {
    const currentTaskClicked = task.firstChild.isSameNode(taskTextWrapper);
    const isChecked = completeButton.checked;

    if (currentTaskClicked && isChecked) {
      console.log("completar");
      taskItemContainer.classList.toggle("opacity-50");
      taskTextWrapper.classList.toggle("completed");
    }
    if (currentTaskClicked && !isChecked) {
      taskItemContainer.classList.toggle("opacity-50");
      taskTextWrapper.classList.toggle("completed");
    }
  }
  updateLocalStorage();
};

/* FUNCTION DELETAR TAREFA */
const handleDeleteTask = (taskItemContainer, taskTextWrapper) => {
  const tasks = tasksContent.childNodes;

  for (const task of tasks) {
    const currentTaskDeleteClicked =
      task.firstChild.isSameNode(taskTextWrapper);

    if (currentTaskDeleteClicked) {
      taskItemContainer.remove();
      console.log("deletar");
    }
  }
  updateLocalStorage();
};

/* FUNCTION VALIDAÇÃO DE INPUT */
const handleInputChange = () => {
  const isValid = validateInput();
  if (isValid) {
    messageError.classList.add("hidden");
    inputElement.classList.remove("error");
  }
};

/* ATUALIZAR O LOCAL STORAGE */
const updateLocalStorage = () => {
  const tasks = tasksContent.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild.lastChild;
    const isCompleted = task.firstChild.firstChild.checked;

    return {
      descripition: content.innerText,
      isCompleted,
    };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const taskFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  console.log({ taskFromLocalStorage });

  for (const task of taskFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("tasks-content");

    const taskTextWrapper = document.createElement("div");
    taskTextWrapper.classList.add("task-text-wrapper");

    const completeButton = document.createElement("input");
    completeButton.type = "checkbox";
    completeButton.classList.add("complete-button");
    completeButton.addEventListener("input", () =>
      handleCompleteTask(completeButton, taskTextWrapper, taskItemContainer)
    );

    const taskText = document.createElement("p");
    taskText.innerText = task.descripition;
    if (task.isCompleted) {
      taskTextWrapper.classList.add("completed");
      taskItemContainer.classList.add("opacity-50");
      completeButton.checked = true;
    }
    taskText.classList.add("tasks-text");

    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fa-solid", "fa-trash", "cursor-pointer");
    deleteButton.addEventListener("click", () =>
      handleDeleteTask(taskItemContainer, taskTextWrapper)
    );
    taskItemContainer.appendChild(taskTextWrapper);
    taskTextWrapper.appendChild(completeButton);
    taskTextWrapper.appendChild(taskText);
    taskItemContainer.appendChild(deleteButton);
    tasksContent.appendChild(taskItemContainer);
  }
};

refreshTasksUsingLocalStorage();

/* ADICIONAR TAREFA */
addNewTaskButton.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleAddTask();
  }
});

/* VALIDAR INPUT */
inputElement.addEventListener("input", () => handleInputChange());
