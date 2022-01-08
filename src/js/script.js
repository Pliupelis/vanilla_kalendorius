let clicked = null;
let formattedDate = null;
let tracker = 0;
let events = sessionStorage.getItem("events")
  ? JSON.parse(sessionStorage.getItem("events"))
  : sessionStorage.setItem(
      "events",
      JSON.stringify([
        {
          date: "2022-01-30",
          start: "1:15pm",
          end: "2:00pm",
          title: "Get haircut",
          type: "Out Of Office",
          desc: "Don't forget to get CASH",
        },
      ])
    );

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
const form = document.getElementById("form");

//form variables
const title = document.getElementById("title");
const date = document.getElementById("date");
const start = document.getElementById("start");
const end = document.getElementById("end");
const type = document.getElementById("type");
const desc = document.getElementById("desc");

const displayView = document.getElementById("displayView");

const openDisplayView = (clickedEvent) => {
  console.log(clickedEvent);
  const displayDate = (document.getElementById("detailsDate").innerText =
    clickedEvent.date);
  const displayTitle = (document.getElementById("detailsTitle").innerText =
    clickedEvent.title);
  const displayStart = (document.getElementById("detailsStart").innerText =
    clickedEvent.start);
  const displayEnd = (document.getElementById("detailsEnd").innerText =
    clickedEvent.end);
  const displayType = (document.getElementById("detailsType").innerText =
    clickedEvent.type);
  const displayDesc = (document.getElementById("detailsDesc").innerText =
    clickedEvent.desc);
  // displayTitle.setAttribute("value", displayTitle.value);
  // console.log(displayTitle);
  detailsView.style.display = "flex";
};

const generate = () => {
  const date = new Date();

  tracker !== 0 && date.setMonth(new Date().getMonth() + tracker);
  const day = date.getDate();
  const month = date.getMonth();
  const longMonth = date.toLocaleDateString(undefined, { month: "long" });
  const year = date.getFullYear();

  const firstMonthDay = new Date(year, month, 1);
  const monthDays = new Date(year, month + 1, 0).getDate();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  document.getElementById("monthDisplay").innerText = `${longMonth} ${year}`;
  const dateString = firstMonthDay.toLocaleDateString(undefined, options);
  const blankDays = weekdays.indexOf(dateString.split(", ")[0]);

  calendar.innerHTML = "";

  for (let i = 1; i <= blankDays + monthDays; i++) {
    const wrapper = document.createElement("div");
    const daySquare = document.createElement("div");
    // const dayTitle = document.createElement("div");
    const actualMonth = month + 1;
    const actualDay = i - blankDays;

    formattedDate = `${year}-${actualMonth}-${actualDay}`
      .split("-")
      .map((number) => (number < 10 ? "0" + number : number))
      .join("-");

    wrapper.classList.add("container__calendar-wrapper");
    daySquare.classList.add("container__calendar-wrapper__day");
    daySquare.setAttribute("id", formattedDate);

    if (i > blankDays) {
      daySquare.innerText = i - blankDays;
    } else {
      daySquare.classList.add("header__calendar-padding");
    }

    calendar.appendChild(daySquare);

    const eventForDay = events.find((e) => e.date === formattedDate);
    if (eventForDay) {
      applyEvent(eventForDay);
      daySquare.addEventListener("click", () =>
        openDisplayView({ ...eventForDay })
      );
    }
  }
};

const saveEvent = (e) => {
  e.preventDefault();

  title.value ? title.classList.remove("error") : title.classList.add("error");
  date.value ? date.classList.remove("error") : date.classList.add("error");
  start.value ? start.classList.remove("error") : start.classList.add("error");
  end.value ? end.classList.remove("error") : end.classList.add("error");
  type.value ? type.classList.remove("error") : type.classList.add("error");
  desc.value ? desc.classList.remove("error") : desc.classList.add("error");

  if (title.value && date.value && start.value && end.value && type.value) {
    events.push({
      date: date.value,
      start: start.value,
      end: end.value,
      title: title.value,
      type: type.value,
      desc: desc.value,
    });
    sessionStorage.setItem("events", JSON.stringify(events));
    form.reset();
  }
  generate();
  applyEvent(date.value);
};

const applyEvent = (eventDay) => {
  const dayOnCalendar = document.getElementById(eventDay.date);
  const dayTitle = document.createElement("div");
  dayTitle.classList.add("container__calendar-wrapper__day__title");
  dayTitle.innerText = eventDay.title;
  dayOnCalendar.appendChild(dayTitle);
};

const buttonHandlers = () => {
  document.getElementById("nextBtn").addEventListener("click", () => {
    tracker++;
    generate();
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    tracker--;
    generate();
  });

  document
    .getElementById("x")
    .addEventListener("click", () => (detailsView.style.display = "none"));

  document
    .getElementById("deleteBtn")
    .addEventListener("click", () => console.log("delete"));

  document.getElementById("saveBtn").addEventListener("click", saveEvent);

  document
    .getElementById("resetBtn")
    .addEventListener("click", () => form.reset());
};

buttonHandlers();
generate();
