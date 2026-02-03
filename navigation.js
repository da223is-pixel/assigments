

const navLinks = [
    { text: "Start", url: "./index.html" },
    { text: "Uppgift 1", url: "../index.html" },

];
const ul = document.querySelector("#globalNav ul");

for (let i = 0; i < navLinks.length; i++) {

    ul.innerHTML += `<li><a href="${navLinks[i].url}">${navLinks[i].text}</a></li>`;
};

