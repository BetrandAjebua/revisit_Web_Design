import {teamData} from "./data.js";
// console.log(teamData)
teamData.forEach(element=>{
  document.querySelector(".card-container").innerHTML+=`
      <div class="card">
        <div class="card-head">
          <div class="card-profile" >
          <img src=${element.imageUrl}></div>
        </div>
        <div class="card-body">
          <span class="member-name">${element.name}</span>
          <span class="member-title">${element.title}</span>
        </div>
        <div class="card-footer">
          <p>${element.qualification}</p>
          <i class="fab fa-linkedin-in"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-github"></i>
        </div>
      </div>
  
  `
})