document.title = "Panier";
const productInLocalStorage = JSON.parse(localStorage.getItem("cart"));


if(productInLocalStorage) {
    for (let i=0; i < productInLocalStorage.length; i++) {

        //Display article
        let elementArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(elementArticle);
        elementArticle.className = "cart__item";
        elementArticle.setAttribute("data-id", productInLocalStorage[i].productId);

        //Display image div
        let elementDivImg = document.createElement("div");
        elementArticle.appendChild(elementDivImg);
        elementDivImg.className = "cart__item__img";

        //Display image
            
    }
    

} else {
    document.querySelector("h1").textContent = "Le panier est vide";
    document.querySelector(".cart").style.display = "none";
}