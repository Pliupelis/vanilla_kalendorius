let clicked = null;
let formattedDate = null;
let tracker = 0;
let events = sessionStorage.getItem("events")
  ? JSON.parse(sessionStorage.getItem("events"))
  : sessionStorage.setItem(
      "events",
      JSON.stringify([
        {
          title: "Get haircut",
          date: "2022-01-30",
          start: "1:15pm",
          end: "2:00pm",
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

// const eventForDay = events.find((e) => e.date === clicked);
const displayView = document.getElementById("displayView");

const openDisplayView = (clickedDate) => {
  const titleForDay = events.find((e) => e.date === clicked);
  console.log(date);
  console.log(titleForDay);
  // const displayTitle = document.getElementById("displayTitle");
  // displayTitle.setAttribute("value", title.value);
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
  //last day of month
  const monthDays = new Date(year, month + 1, 0).getDate();
  // const monthDay = new Date(year, month, 0).getDate();

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
  console.log(blankDays);
  for (let i = 1; i <= blankDays + monthDays; i++) {
    const wrapper = document.createElement("div");
    const daySquare = document.createElement("div");
    // const dayTitle = document.createElement("div");
    const actualMonth = month + 1;
    const actualDay = i - blankDays;

    formattedDate = `${year}-${actualMonth}, ${actualDay}`.split(", ")[1];

    wrapper.classList.add("container__calendar-wrapper");
    daySquare.classList.add("container__calendar-wrapper__day");

    if (i > blankDays) {
      daySquare.innerText = i - blankDays;

      daySquare.addEventListener("click", () =>
        openDisplayView(`${year}-${actualMonth}-${actualDay}`)
      );
    } else {
      daySquare.classList.add("header__calendar-padding");
    }

    calendar.appendChild(daySquare);

    formattedDate =
      formattedDate < 10 ? ("0" + formattedDate).slice(-2) : formattedDate;
    daySquare.setAttribute("id", formattedDate);
  }
};

const applyEvent = (eventDay) => {
  const dayOnCalendar = document.getElementById(eventDay);
  const dayTitle = document.createElement("div");

  dayTitle.classList.add("container__calendar-wrapper__day__title");
  dayTitle.innerText = title.value;
  dayOnCalendar.appendChild(dayTitle);
};

const saveEvent = (e) => {
  //
  console.log(
    title.value,
    date.value,
    start.value,
    end.value,
    type.value,
    desc.value
  );
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
    applyEvent(date.value.split("-")[2]);
    sessionStorage.setItem("events", JSON.stringify(events));
    form.reset();
  }
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
