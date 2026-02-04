

const navLinks = [
    { text: "Start", url: "/assigments/index.html" },
    { text: "Uppgift 1", url: "/assigments/assignment1/index.html" },
     { text: "Uppgift 2", url: "/assigments/assignment2/index.html" },

];

export function actualNav (isActive) {
const ul= document.querySelector("#globalNav ul");
let html = "";
for (let i = 0; i< navLinks.length; i++) {
    const link = navLinks[i];
    let activeClass= "";

    if (i=== isActive) {
        activeClass = "class= 'active'";
    }
    html+= `<li><a href="${link.url}" ${activeClass}> ${link.text}</a></li>`;
}
   ul.innerHTML= html;
};


