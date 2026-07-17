const dailyBtn = document.getElementById("daily");
const weeklyBtn = document.getElementById("weekly");
const monthlyBtn = document.getElementById("monthly");

// Group Buttons in array
const buttons = [dailyBtn, weeklyBtn, monthlyBtn];

const cards = document.querySelectorAll(".data");

let progressData = [];

const handleClick = (e) => {
  let type = e.target.textContent.toLowerCase();

  updateCards(type);
};

const updateCards = (type) => {
  // card = current element(div) : index = current position
  cards.forEach((card, index) => {
    // make item variable have access to progressData[current position]
    // e.g. : item = progessData[0];
    const item = progressData[index];

    // Get the elements inside the div and change their textContent accordingly
    // [type] retrived from handleClick function (daily, weekly, monthly)
    card.querySelector("h3").textContent = item.title;
    card.querySelector(".current").textContent = `${item.timeframes[type].current}hrs`;
    card.querySelector(".previous").textContent = `Last Week - ${item.timeframes[type].previous}hrs`;
  });
};

buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      console.log("Request Failed");
      return [];
    }
    return response.json();
  })
  .then((data) => {
    progressData = data;

    // Show weekly by default 
    updateCards('weekly');
  });
