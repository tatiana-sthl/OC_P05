document.title = "Panier";
let productInLocalStorage = JSON.parse(localStorage.getItem("cart"));

//Display elements in local storage

if(productInLocalStorage) {
    for (let i=0; i < productInLocalStorage.length; i++) {

        //Display article
        let elementArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(elementArticle);
        elementArticle.className = "cart__item";
        elementArticle.setAttribute("data-id", productInLocalStorage[i].productId);
        
        /*
        //Display image div
        let elementDivImg = document.createElement("div");
        elementArticle.appendChild(elementDivImg);
        elementDivImg.className = "cart__item__img";

        //Display image
        let elementImg = document.createElement("img");
        elementDivImg.appendChild(elementImg);
        elementImg.src = productInLocalStorage[i].img;
        elementImg.alt = productInLocalStorage[i].altImg;
        */

        //Display div content
        let elementItemContent = document.createElement("div");
        elementArticle.appendChild(elementItemContent);
        elementItemContent.className = "cart__item__content";

        //Display div
        let elementItemContentTitlePrice = document.createElement("div");
        elementItemContent.appendChild(elementItemContentTitlePrice);
        elementItemContentTitlePrice.className = "cart__item__content__titlePrice";

        //Display h2
        let elementTitle = document.createElement("h2");
        elementItemContentTitlePrice.appendChild(elementTitle);
        elementTitle.textContent = productInLocalStorage[i].name;

        //Display color
        let elementColor = document.createElement("p");
        elementTitle.appendChild(elementColor);
        elementColor.textContent = productInLocalStorage[i].color;

        //Display price
        let elementPrice = document.createElement("p");
        elementItemContentTitlePrice.appendChild(elementPrice);
        elementPrice.textContent = productInLocalStorage[i].price + " €";

        //Display div content
        let elementItemContentSettings = document.createElement("div");
        elementItemContent.appendChild(elementItemContentSettings);
        elementItemContentSettings.className = "cart__item__content__settings";

        //Display div
        let elementItemContentSettingsQuantity = document.createElement("div");
        elementItemContentSettings.appendChild(elementItemContentSettingsQuantity);
        elementItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

        //Display quantity
        let elementQuantity = document.createElement("p");
        elementItemContentSettingsQuantity.appendChild(elementQuantity);
        elementQuantity.textContent = "Quantité : ";

        //Display total quantity
        let elementTotalQuantity = document.createElement("input");
        elementItemContentSettingsQuantity.appendChild(elementTotalQuantity);
        elementTotalQuantity.value = productInLocalStorage[i].quantity;
        elementTotalQuantity.className = "itemQuantity";
        elementTotalQuantity.setAttribute("type", "number");
        elementTotalQuantity.setAttribute("min", "1");
        elementTotalQuantity.setAttribute("max", "100");
        elementTotalQuantity.setAttribute("name", "itemQuantity");

        //Display div delete
        let elementItemContentSettingsDelete = document.createElement("div");
        elementItemContentSettings.appendChild(elementItemContentSettingsDelete);
        elementItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        //Display delete 
        let elementDelete = document.createElement("p");
        elementItemContentSettingsDelete.appendChild(elementDelete);
        elementDelete.className = "deleteItem";
        elementDelete.textContent = "Supprimer";
        //Add event on click
        elementDelete.addEventListener("click", (element) => {
            element.preventDefault;
            const deleteId = productInLocalStorage[i].id;
            const deleteColor = productInLocalStorage[i].color;

            productInLocalStorage = productInLocalStorage.filter(element => element.id !== deleteId || element.color !== deleteColor);
            saveCart(productInLocalStorage);
            alert('Article supprimé');

            if(productInLocalStorage.length === 0) {
                localStorage.clear();
            }
            location.reload();
        });
    }
    
} else {
    document.querySelector("h1").textContent = "Le panier est vide";
    document.querySelector(".cart").style.display = "none";
}

//Display total quantity and price of elements in cart

function totalCart() {
    // Déclaration des variables de "Total" en tant que Number
    let totalProducts = 0
    let totalPrice = 0
    // Déclaration + Pointage de tous les éléments ".cart__item"
    const products = document.querySelectorAll(".cart__item")
    // Boucle : pour chaque élément "purchase" des products
    products.forEach((product) => {
        // Récupération des quantités des produits via les dataset
        totalProducts += JSON.parse(product.dataset.quantity)
        // Calcul de prix panier total via les dataset
        totalPrice += product.dataset.quantity * product.dataset.price
    });
    // Affichage des résultats dans le HTML
    document.getElementById("totalQuantity").textContent = totalProducts
    document.getElementById("totalPrice").textContent = totalPrice
}
totalCart();