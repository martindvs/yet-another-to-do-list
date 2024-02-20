const wrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");

const toggleScreen = () => {
  wrapper.classList.toggle("show-category");
};

menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);

const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const blackBackdrop = document.querySelector(".black-backdrop");

const toggleAddTaskForm = () => {
  addTaskForm.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
};

addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);

// let's add categories and tasks
let categories = [
  { title: "Gaming", img: "gaming.png" },
  { title: "Shopping", img: "shopping.png" },
  { title: "Education", img: "education.png" },
  { title: "Finance", img: "finance.png" },
  { title: "Coding", img: "coding.png" },
  { title: "Fitness", img: "fitness.png" },
];

let tasks = [
  {
    id: 1,
    task: "Play Final Fantasy VII REMAKE: Rebirth",
    category: "Gaming",
    completed: false,
  },
  {
    id: 2,
    task: "Finish Persona 5",
    category: "Gaming",
    completed: false,
  },
  {
    id: 3,
    task: "Buy random tiktok product",
    category: "Shopping",
    completed: false,
  },
  {
    id: 4,
    task: "Pay my credit card bill",
    category: "Finance",
    completed: false,
  },
  {
    id: 5,
    task: "Start tutorial number 1875",
    category: "Coding",
    completed: false,
  },
  {
    id: 6,
    task: "Finish cooking masterclass",
    category: "Education",
    completed: false,
  },
];

let selectedCategory = categories[0];

const categoriesContainer = document.querySelector(".categories");
const categoryTitles = document.querySelector(".category-title");
const totalCategoryTasks = document.querySelector(".category-tasks");
const categoryImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".total-tasks");

const calculateTotal = () => {
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLocaleLowerCase()
  );
  totalCategoryTasks.innerHTML = `${categoryTasks.length} Tasks`;
  totalTasks.innerHTML = tasks.length;
};

const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    // get all the tasks of current category
    const categoryTasks = tasks.filter(
      (task) =>
        task.category.toLowerCase() === category.title.toLocaleLowerCase()
    );

    // create a div to render category
    const div = document.createElement("div");
    div.classList.add("category");
    div.addEventListener("click", () => {
      wrapper.classList.add("show-category");
      selectedCategory = category;
      categoryTitles.innerHTML = category.title;
      categoryImg.src = `./images/${category.img}`;
      calculateTotal();
      // re render tasks when category changes
      renderTasks();
    });
    div.innerHTML = `<div class="left">
    <img src="./images/${category.img}" alt="${category.title}" />
    <div class="content">
      <h1>${category.title}</h1>
      <p>${categoryTasks.length} Tasks</p>
    </div>
  </div>
  <div class="options-edit">
    <div class="toggle-btn">
      <img src="./images/edit.png" alt="" />
    </div>
  </div>`;

    categoriesContainer.appendChild(div);
  });
};

const tasksContainer = document.querySelector(".tasks");

const renderTasks = () => {
  tasksContainer.innerHTML = "";
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );

  // if there are no tasks
  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-task">Nothing to do here, go have some fun</p>`;
  } else {
    // if there are tasks
    categoryTasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");
      const label = document.createElement("label");
      label.classList.add("task");
      label.setAttribute("for", task.id);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = task.id;
      checkbox.checked = task.completed;

      // add completion functionality on click checkbox
      checkbox.addEventListener("change", () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        // change the true to false or backwards
        tasks[index].completed = !tasks[index].completed;
        // save locally
        saveLocal();
      });

      div.innerHTML = `<div class="delete">
      <img src="./images/delete.png" alt="" />
    </div>`;

      label.innerHTML = `<span class="checkmark">
      <img src="./images/check.png" alt="" />
    </span>
    <p>${task.task}</p>`;

      label.prepend(checkbox);
      div.prepend(label);
      tasksContainer.appendChild(div);

      // delete function
      const deleteBtn = div.querySelector(".delete");
      deleteBtn.addEventListener("click", () => {
        const index = tasks.findIndex((t) => t.id === task.id);

        // remove the task
        tasks.splice(index, 1);
        saveLocal();
        renderTasks();
      });
    });

    renderCategories();
    calculateTotal();
  }
};

// save and get tasks from local storage
const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const getLocal = () => {
  const localTasks = JSON.parse(localStorage.getItem("tasks"));

  // if task is found
  if (localTasks) {
    tasks = localTasks;
  }
};

//add new tasks

// redner categories in sleect
const categorySelect = document.querySelector("#category-select");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");

const taskInput = document.querySelector("#task-input");

cancelBtn.addEventListener("click", toggleAddTaskForm);

addBtn.addEventListener("click", () => {
  const task = taskInput.value;
  const category = categorySelect.value;

  if (task === "") {
    alert("Just write something, please?");
  } else {
    const newTask = {
      id: tasks.length + 1,
      task,
      category,
      completed: false,
    };
    tasks.push(newTask);
    taskInput.value = "";

    saveLocal();
    toggleAddTaskForm();
    renderTasks();
  }
});
categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.title.toLowerCase();
  option.textContent = category.title;
  categorySelect.appendChild(option);
});

// already stored tasks
getLocal();
calculateTotal();
renderCategories();
renderTasks();
