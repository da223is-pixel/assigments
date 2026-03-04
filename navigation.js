const navLinks = [
    { text: "Start", url: "index.html" },
    { text: "Uppgift 1", url: "assignment1/index.html" },
     { text: "Uppgift 2", url: "assignment2/index.html" },
      { text: "Uppgift 3", url: "assignment3/index.html" }

]; //imp.ist



export function actualNav (activeIndex, isSubPage) {
const ul= document.querySelector("#globalNav ul");
let html = ""; // fylls

for (let i = 0; i< navLinks.length; i++) {
   const prefix = isSubPage ?"../":"";  //lägger till ../ för undermappar.
   const active = i=== activeIndex?  "class='active'" : ""; //aktiveras med vitt färg om man är på sidan.
  
    html+= `<li><a href="${prefix}${navLinks[i].url}"${active}>${navLinks[i].text}</a></li>`; 
}
   ul.innerHTML= html; //läggs in allt änring.
};

 
