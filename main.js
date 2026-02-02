import { assignments, myInfo } from "./assignments.js";

document.getElementById("about").innerHTML = `
<p>${myInfo.name} - ${myInfo.course} - ${myInfo.username}<p> `;


const container = document.getElementById("assignments");
container.innerHTML = `

<h3> ${assignments[0].id} : ${assignments[0].title} </h3> <p>${assignments[0].description}  
<a href= "assignment1/index.html"> Gå till uppgift 1 </a></p>
`;




