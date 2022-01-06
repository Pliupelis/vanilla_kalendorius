let clicked = null;
let tracker = 0;
let events = sessionStorage.getItem("events")
  ? JSON.parse(sessionStorage.getItem("events"))
  : [];

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const calendar = document.getElementById("calendar");

const generate = () => {
  const date = new Date();

  tracker !== 0 && date.setMonth(new Date().getMonth() + tracker);

  const day = date.getDate();
  const month = date.getMonth();
  const longMonth = date.toLocaleDateString(undefined, { month: "long" });
  const year = date.getFullYear();

  const firstMonthDay = new Date(year, month, 1);
  //last day of month
  const monthDays = new Date(year, month + 1, 0).getDate();
  const monthDay = new Date(year, month, 0).getDate();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  document.getElementById("monthDisplay").innerText = `${longMonth} ${year}`;
  const dateString = firstMonthDay.toLocaleDateString(undefined, options);
  const blankDays = weekdays.indexOf(dateString.split(", ")[0]);
  //reset
  calendar.innerHTML = "";

  for (let i = 1; i <= blankDays + monthDays; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("container__calendar-day");

    if (i > blankDays) {
      daySquare.innerText = i - blankDays;
      // daySquare.addEventListener("click", () => console.log("clicked"));
    } else {
      daySquare.classList.add("header__calendar-padding");
    }

    calendar.appendChild(daySquare);
  }
  console.log(dateString);
  console.log(blankDays);
};

const buttonHandler = () => {
  document.getElementById("nextBtn").addEventListener("click", () => {
    tracker++;
    generate();
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    tracker--;
    generate();
  });
};

buttonHandler();
generate();
