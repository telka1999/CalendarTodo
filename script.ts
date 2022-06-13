interface TaskObj {
  day:string
  name:string
  randomOne: number
  randomTwo: number
  randomThree: number
  year: string
}

let yearClick: string;
let dayClick: string;
let taskName: string;
let nav = 0;
let tasks = localStorage.getItem("List")
  ? JSON.parse(localStorage.getItem("List"))
  : [];  

const allMonthe = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const calendarDate = document.querySelector(".date-year") as HTMLDivElement;
const calendar = document.querySelector(".calendar-month") as HTMLDivElement;
const popupAddTask = document.querySelector(".popup-back-add") as HTMLDivElement;
const closPopup = document.querySelector(".add-clos-icon") as HTMLSpanElement;
const creatTask = document.querySelector(".add-popup-icon") as HTMLSpanElement;
const taskInp = document.querySelector(".add-input") as HTMLInputElement;
const inpBox = document.querySelector(".add-inp-box") as HTMLDivElement;

const deletePopup = document.querySelector(".popup-back-remove") as HTMLDivElement;
const closPopupDel = document.querySelector(".btn-nie") as HTMLButtonElement;
const deleteTask = document.querySelector(".btn-tak") as HTMLButtonElement;
const spanDelete = document.querySelector(".span-task")as HTMLSpanElement;

const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();

function load() {
  const d = new Date();

  if (nav !== 0) {
    d.setMonth(new Date().getMonth() + nav);
  }

  const month = d.getMonth();
  const year = d.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarDate.innerHTML = `${allMonthe[month]} ${year}`;

  calendar.innerHTML = "";

  const prevDays = new Date(d.getFullYear(), d.getMonth(), 0).getDay();
  const nextDays = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDay() - 7;
  const positiveDays = Math.abs(nextDays);

  for (let x = prevDays; x >= 1; x--) {
    calendar.innerHTML += `<div class="day-padding"></div>`;
  }

  for (let i = 1; i <= daysInMonth; i++) {
    if (i === new Date().getDate() && d.getMonth() === new Date().getMonth()) {
      calendar.innerHTML += `<div class="day-number">
                                      <div class="day-active">${i}</div>
                                  </div>`;
    } else {
      calendar.innerHTML += `<div class="day-number">
                                      <div class="day">${i}</div>
                                  </div>`;
    }
  }

  if (positiveDays < 7) {
    for (let j = 1; j <= positiveDays; j++) {
      calendar.innerHTML += `<div class="day-padding"></div>`;
    }
  }

  const daysBlocks = document.querySelectorAll(".day");

  document.querySelectorAll(".day-number").forEach((day) => {
    day.addEventListener("click", () => {
      daysBlocks.forEach((dayblock) => {
        dayblock.classList.remove("grey-day");
      });

      yearClick = calendarDate.innerHTML;

      dayClick = day.children[0].innerHTML;
     

      if (day.children[1] === undefined) {
        popupAddTask.classList.add("active-popup");

        taskInp.value = "";

        document.body.style.overflow = "hidden";
      } else {
        deletePopup.classList.add("active-popup");

        document.body.style.overflow = "hidden";

        taskName = day.children[1].innerHTML;

        spanDelete.innerHTML = `${day.children[1].innerHTML}`;

        tasks.forEach((task:TaskObj) => {       
          
          if (day.children[1].innerHTML === task.name) {
            spanDelete.style.backgroundColor = `rgb(${task.randomOne}, ${task.randomTwo}, ${task.randomThree})`;
          }
        });
      }
    });
  });

  closPopupDel.addEventListener("click", () => {
    deletePopup.classList.remove("active-popup");

    document.body.style.overflow = "auto";
  });

  deleteTask.addEventListener("click", () => {
    let newArr = tasks.filter((task: TaskObj) => task.name !== taskName);

    localStorage.setItem("List", JSON.stringify(newArr));

    tasks = newArr;

    document.querySelectorAll(".day-number").forEach((day) => {
      if (day.children[1] !== undefined) {
        if (day.children[1].innerHTML === taskName) {
          day.children[1].remove();
        }
      }
    });

    deletePopup.classList.remove("active-popup");

    document.body.style.overflow = "auto";
  });

  tasks.forEach((task: TaskObj) => {
    document.querySelectorAll(".day-number").forEach((day) => {
      if (
        day.children[0].innerHTML === task.day &&
        task.year === calendarDate.innerHTML
      ) {
        day.innerHTML += `<div class="task-mini" style="background-color: rgb(${task.randomOne},${task.randomTwo},${task.randomThree})">${task.name}</div>`;
      }
    });
  });
}

function cancelPopup() {
  inpBox.classList.remove("input-valide");
  popupAddTask.classList.remove("active-popup");
  document.body.style.overflow = "auto";
}

function saveTask() {
  if (taskInp.value === "") {
    inpBox.classList.add("input-valide");
  } else {
    const randomOne = Math.floor(Math.random() * 255);
    const randomTwo = Math.floor(Math.random() * 255);
    const randomThree = Math.floor(Math.random() * 255);

    const taskItem = {
      name: taskInp.value,
      year: yearClick,
      day: dayClick,
      randomOne: randomOne,
      randomTwo: randomTwo,
      randomThree: randomThree,
    };

    tasks.push(taskItem);

    localStorage.setItem("List", JSON.stringify(tasks));

    popupAddTask.classList.remove("active-popup");
    inpBox.classList.remove("input-valide");
    document.body.style.overflow = "auto";

    load();
  }
}

const nextMonth = document.querySelector(".next-month") as HTMLSpanElement;
const prevMonth = document.querySelector(".prev-month") as HTMLSpanElement;

function initBtn() {
  nextMonth.addEventListener("click", () => {
    nav++;
    load();
  });

  prevMonth.addEventListener("click", () => {
    nav--;
    load();
  });

  closPopup.addEventListener("click", cancelPopup);

  creatTask.addEventListener("click", saveTask);
}

initBtn();
load();
