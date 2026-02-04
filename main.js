import { assignments} from "./assignments.js";

import {actualNav} from "./navigation.js";
actualNav (0);




const container = document.getElementById("assignments");

container.innerHTML = `
<h3> ${assignments[0].id} : ${assignments[0].title} </h3> <p>${assignments[0].description}  
<a href= "assignment1/index.html"> Gå till uppgift 1 </a></p>

<h3> ${assignments[1].id} : ${assignments[1].title} </h3> <p>${assignments[1].description}  
<a href= "assignment2/index.html"> Gå till uppgift 2 </a></p>
`;




