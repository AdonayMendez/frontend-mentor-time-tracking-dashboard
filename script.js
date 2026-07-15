const dailyBtn = document.getElementById("daily");
const weeklyBtn = document.getElementById("weekly");
const monthlyBtn = document.getElementById("monthly");
const workCurrent = document.getElementById("workCurrent");
const workPrevious = document.getElementById("workPrevious");


let progressData = [];




const handleClick = (e) => {
  let type = e.target.textContent.toLowerCase();

  progressData.forEach(item => {
    console.log(
      item.title, 
      item.timeframes[type].current,
      item.timeframes[type].previous
    );
  });

  // if(type === "daily"){
  //   workCurrent.textContent = `${progressData[0].timeframes[type].current}`;
  //   workPrevious.textContent = `${progressData[0].timeframes[type].previous}`;  

  // }
}

dailyBtn.addEventListener("click", handleClick);
weeklyBtn.addEventListener("click", handleClick);
monthlyBtn.addEventListener("click", handleClick);





fetch('data.json').then(response => {
  if(!response.ok){
    console.log("Request Failed"); 
    return [];
  } else {
    return response.json(); 
  }
}).then(data => {
  progressData = data;

  console.log(progressData);
});