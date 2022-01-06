const form = document.getElementById("form");
const title = document.getElementById("titleInput");
const date = document.getElementById("dateInput");
const start = document.getElementById("startTime");
const end = document.getElementById("endTime");
const type = document.getElementById("eventType");
const desc = document.getElementById("descInput");
const errorElement = document.getElementById("error");

form.addEventListener("submit", (e) => {
  // let msg = [];

  e.preventDefault();
});

const clearForm = () => {
  document.getElementById("form").reset();
};
