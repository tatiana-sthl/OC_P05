document.title = "Panier";

//Display and processing of cart products

let cart = getCart();
let totalCartPrice = 0;
let totalPrice = document.getElementById("totalPrice");
let totalProductQuantity = document.getElementById("totalQuantity");
const cartList = document.getElementById("cart__items");
const totalDisplay = document.querySelector(".cart__price p");
const carteHeading = document.querySelector('h1');
const orderForm = document.querySelector(".cart__order");

for(let product of cart) {
    let productId = product.id;
    let productColor = product.color;
    let productName = product.name;
    let productQuantity = product.quantity;

    fetch(`http://localhost:3000/api/products/${productId}`)

    .then((response) => response.json())

    .then((productDetails) => {

        //Display article
        let elementArticle = document.createElement("article");
        elementArticle.className = "cart__item";
        elementArticle.setAttribute("data-id", productId);
        elementArticle.setAttribute("data-color", productColor);

        cartList.appendChild(elementArticle);

        //Display image div
        let elementDivImg = document.createElement("div");
        elementDivImg.className = "cart__item__img";
        elementArticle.appendChild(elementDivImg);

        //Display image
        let elementImg = document.createElement("img");
        elementImg.src = productDetails.imageUrl;
        elementImg.alt = productDetails.altTxt;
        elementDivImg.appendChild(elementImg);

        //Display div content
        let elementItemContent = document.createElement("div");
        elementItemContent.className = "cart__item__content";
        elementArticle.appendChild(elementItemContent);
    
         //Display div
        let elementItemContentTitlePrice = document.createElement("div");
        elementItemContentTitlePrice.className = "cart__item__content__titlePrice";
        elementItemContent.appendChild(elementItemContentTitlePrice);
        
        //Display h2
        let elementTitle = document.createElement("h2");       
        elementTitle.textContent = productName;
        elementItemContentTitlePrice.appendChild(elementTitle);

        //Display color
        let elementColor = document.createElement("p");
        elementColor.textContent = productColor;
        elementTitle.appendChild(elementColor);

        //Display price
        let elementPrice = document.createElement("p");
        elementPrice.textContent = productDetails.price + "€";
        elementItemContentTitlePrice.appendChild(elementPrice);

        //Display div content
        let elementItemContentSettings = document.createElement("div");        
        elementItemContentSettings.className = "cart__item__content__settings";
        elementItemContent.appendChild(elementItemContentSettings);

        //Display div
        let elementItemContentSettingsQuantity = document.createElement("div");
        elementItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        elementItemContentSettings.appendChild(elementItemContentSettingsQuantity);

        //Display quantity
        let elementQuantity = document.createElement("p");
        elementQuantity.textContent = "Quantité : ";
        elementItemContentSettingsQuantity.appendChild(elementQuantity);

        //Display total quantity
        let elementTotalQuantity = document.createElement("input");
        elementTotalQuantity.value = productQuantity;
        elementTotalQuantity.className = "itemQuantity";
        elementTotalQuantity.setAttribute("type", "number");
        elementTotalQuantity.setAttribute("min", "1");
        elementTotalQuantity.setAttribute("max", "100");
        elementTotalQuantity.setAttribute("name", "itemQuantity");
        elementItemContentSettingsQuantity.appendChild(elementTotalQuantity);
      

        //Display div delete
        let elementItemContentSettingsDelete = document.createElement("div");
        elementItemContentSettingsDelete.className = "cart__item__content__settings__delete";
        elementItemContentSettings.appendChild(elementItemContentSettingsDelete);

        //Display total price
        totalPrice.textContent = getTotalCartPrice(productDetails, productQuantity);

        //Display total quantity 
        totalProductQuantity.textContent = getQuantityProduct();

        let oldQuantity = Number(elementTotalQuantity.value);

        elementTotalQuantity.addEventListener("change", () => {
            productQuantity = modifyQuantity(product, Number(elementTotalQuantity.value));
            totalProductQuantity.textContent = getQuantityProduct();
            if(Number(elementTotalQuantity.value)>0 && Number(elementTotalQuantity.value)<= 100) {
                totalPrice.textContent = modifyTotalPrice(productDetails, oldQuantity, Number(elementTotalQuantity.value));
                oldQuantity = Number(elementTotalQuantity.value);
            }
        })
        
        //Display delete 
        let elementDelete = document.createElement("p");
        elementDelete.className = "deleteItem";
        elementDelete.textContent = "Supprimer";
        elementItemContentSettingsDelete.appendChild(elementDelete);
        //Add event on click
        elementDelete.addEventListener("click", () => {
            deleteProduct(product);
            alert("Le produit a bien été supprimé");
            location.reload();
        });              
    })

    .catch((error) => {
        alert("Une erreur s'est produite lors du chargement du panier, veuillez nous excuser" + error);
        console.log("fetch error in cart.js", error);
    })
}

if(cart.length == 0) {
    carteHeading.textContent = "Le panier est vide";
    totalDisplay.innerHTML = '<a href="../html/index.html">Retrouvez nos produits</a>';
    totalDisplay.style.textAlign = "center";
    orderForm.style.display = "none";
}


//Processing of the command form

let form = document.querySelector(".cart__order__form");

let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = /^[a-z0-9éèôöîïûùü' -]{2,50}$/gi;
let mailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

//Listen input in form
form.firstName.addEventListener('change', function() {
    if(firstNameValid(this.value)){
        
    } else {
        this.nextElementSibling.textContent = "Veuillez remplir ce champ";
    }
});

form.lastName.addEventListener('change', function() {
    if(lastNameValid(this.value)){
        
    } else {
        this.nextElementSibling.textContent = "Veuillez remplir ce champ";
    }
});

form.address.addEventListener('change', function() {
    if(addressValid(this.value)){
        
    } else {
        this.nextElementSibling.textContent = "Veuillez remplir ce champ";
    }
});

form.city.addEventListener('change', function() {
    if(cityValid(this.value)){
        
    } else {
        this.nextElementSibling.textContent = "Veuillez remplir ce champ";
    }
});

form.email.addEventListener('change', function() {
    if(mailValid(this.value)){
        
    } else {
        this.nextElementSibling.textContent = "Format d'email invalide";
    }
});

//Define input in form
function firstNameValid(firstName){
    if(charRegExp.test(firstName)) {
        return true
    } else {
        return false
    }
}

function lastNameValid(lastName){
    if(charRegExp.test(lastName)) {
        return true
    } else {
        return false
    }
}

function addressValid(address){
    if(addressRegExp.test(address)) {
        return true
    } else {
        return false
    }
}

function cityValid(city){
    if(charRegExp.test(city)) {
        return true
    } else {
        return false
    }
}

function mailValid(mail){
    if(mailRegExp.test(mail)) {
        return true
    } else {
        return false
    }
}

function postForm() {
    //defines a variable with all the variables present in the form
    const contact = {
      firstName : document.getElementById('firstName').value,
      lastName : document.getElementById('lastName').value,
      address : document.getElementById('address').value,
      city : document.getElementById('city').value,
      email : document.getElementById('email').value
    }

    //define an empty array
    let products = [];
    //for loop which allows to loop on all the products present in the cart
    for (let i = 0; i<cart.length;i++) {
        products.push(cart[i].id);
    }

    //define a variable with the variables present in the form + the products in cart
    const submitData = {
        contact,
        products,
    }

    //define a variable that converts the data to json
    const options = {
        method : 'POST',
        body : JSON.stringify(submitData),
        headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
        }
    };

    if(mailValid(contact.email)==true && products.length>=1){
        fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
            if(data.orderId) {
                document.location.href = 'confirmation.html?id=' + data.orderId;
                localStorage.clear();
            } else {
                alert("Une erreur s'est produite, veuillez réessayer")
            }
        })
        .catch((error) => {
            alert("Une erreur s'est produite lors de l'envoi du formulaire à l'API, veuillez nous excuser" + error);
        })
    }
   
  }

const order = document.getElementById('order');

order.addEventListener('click', (event) => {
    event.preventDefault();
    postForm();
})