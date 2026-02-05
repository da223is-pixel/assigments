import { jewlryProducts } from "./products.js";

const proContainer = document.querySelector("#product-container");

const cartItems = document.querySelector("#cart-items");

function renderProducts(productsArray) {

    for (let product of productsArray) {

        const div = document.createElement("div");
        const img = document.createElement("img");
        const name= document.createElement("h4");
        const description = document.createElement("p");
        const price = document.createElement("p");
        const id = document.createElement("p");
        const category = document.createElement("p");

        div.classList.add("productCard");
        img.src = product.image;
        img.alt = product.name;
         name.append(product.name)
        description.append(product.description)
        price.append(product.price)
        id.append(product.id)
        category.append(product.category)
        div.append(img, name, price, description, category);
        proContainer.append(div)

        
    }
     
}

}