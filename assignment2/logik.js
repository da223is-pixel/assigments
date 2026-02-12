import { jewlryProducts } from "./products.js";

const proContainer = document.querySelector("#product-container");

const cartItems = document.querySelector("#cart-items");

let cart = []; //Kundvagenens array.
const cartData = localStorage.getItem("cart");// hämtar det som spard i cart för att vid siduppladning ska den synas (när produkt korten addas och tas bort)
if (cartData) {
    cart = JSON.parse(cartData); // (omvandlas till objekt den den var från början för att kunna använda den igen.)
    renderCarts(cart); // kör den så den sysn på sida.
}

function renderProducts(productsArray) {

    for (let product of productsArray) {

        const div = document.createElement("div");
        const img = document.createElement("img");
        const name = document.createElement("h4");
        const description = document.createElement("p");
        const price = document.createElement("p");
        const id = document.createElement("p");
        const category = document.createElement("p");
        const btnPro = document.createElement("button");


        div.classList.add("productCard");
        img.src = product.image;
        img.alt = product.name;
        name.append(product.name)
        description.append(product.description)
        price.append(product.price)
        price.textContent = (product.price + " kr")
        id.append(product.id)
        category.append(product.category)
        btnPro.textContent = "Lägg i kundvagn";

        div.append(img, name, price, description, category);
        proContainer.append(div)
        div.append(btnPro);

        btnPro.addEventListener("click", () => {
            let isIncart = false;

            for (let i = 0; i < cart.length; i++) {

                if (cart[i].id === product.id) { // antalet ökas om den finns redan
                    cart[i].count += 1;
                    isIncart = true;
                    break;

                }

            }
            if (!isIncart) {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    count: 1

                })// första gången när produkten inte finns i vagnen skapas den.

            }
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCarts(cart)
        })

    }
};

renderProducts(jewlryProducts);



function renderCarts(cart) {
    cartItems.innerHTML = "";
    let total = 0;

    for (let item of cart) {
        const name = document.createElement("h4");
        const priceCount = document.createElement("div");
        const price = document.createElement("p");
        const count = document.createElement("p");
        const itemDiv = document.createElement ("div")


        itemDiv.classList.add ("cart-item")
        name.append(item.name)

        count.textContent = (item.count + " *")

        price.textContent = (item.price + " kr")

        total += (item.price * item.count)

        priceCount.append(count, price);

        priceCount.style.display = "flex";
         
        itemDiv.append(name, priceCount);
        cartItems.append(itemDiv);


    }
    const sum = document.createElement("p");
    sum.textContent = (`Totalsumma: ${total} kr`);
    cartItems.append(sum);
};


const clearItems = document.getElementById("clear-items");
clearItems.textContent = ("Tömma");

clearItems.addEventListener("click", () => {
    cart = [];  // skpar vi en tom array.
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCarts(cart); //innehållet


});

