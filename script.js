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

  updateActiveButton(e.target);
};

const updateCards = (type) => {

  let label;
 
  if (type === "daily"){
     label = 'Yesterday';
  } else if (type === "weekly"){
     label = 'Last Week'
  } else {
      label = 'Last Month'
  }

  // card = current element(div) : index = current position
  cards.forEach((card, index) => {
    // make item variable have access to progressData[current position]
    // e.g. : item = progessData[0];
    const item = progressData[index];

    // Get the elements inside the div and change their textContent accordingly
    // [type] retrived from handleClick function (daily, weekly, monthly)
    card.querySelector("h3").textContent = item.title;
    card.querySelector(".current").textContent =
      `${item.timeframes[type].current}hrs`;
    card.querySelector(".previous").textContent =
      `${label} - ${item.timeframes[type].previous}hrs`;
  });
};

const updateActiveButton = (button) => {
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });

  button.classList.add("active");
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
    updateCards("weekly");
    updateActiveButton(weeklyBtn);
  });
