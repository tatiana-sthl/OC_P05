// Affiliate the product with its id

const productId = new URLSearchParams(document.location.search).get("id");

fetch(`http://localhost:3000/api/products/${productId}`)

    .then((response) => response.json())

    .then((selectedProduct) => {
        // Display of api data
        document.title = selectedProduct.name;

        // Display image
        const selectedProductImage = document.createElement("img");
        document.getElementsByClassName("item__img")[0].appendChild(selectedProductImage);
        selectedProductImage.src = selectedProduct.imageUrl;
        selectedProductImage.alt = selectedProduct.altTxt;

        // Dislay other elements
        document.getElementById("title").innerText = selectedProduct.name;
        document.getElementById("price").innerText = selectedProduct.price;
        document.getElementById("description").innerText = selectedProduct.description;

        // Display colors option
        for (let i=0; i<selectedProduct.colors.length; i++) {
            const productColors = document.createElement("option");
            productColors.setAttribute("value", selectedProduct.colors[i]);
            productColors.textContent = selectedProduct.colors[i];
            document.getElementById("colors").appendChild(productColors);
        }
    })

    .catch((error) => {
        alert("Une erreur s'est produite, veuillez nous excuser");
        console.log("fetch error in product.js", error);
    })


// Add a product to the cart

const addProductToCartButton = document.getElementById("addToCart");
addProductToCartButton.addEventListener("click", addProductToCart)


function addProductToCart() {

    const productId = new URLSearchParams(document.location.search).get("id");
    const color = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;

    // if the color is defined and the number is between 1 and 100
    if(color !== "" && 0<quantity && quantity<101) {

        // call the function
        const cart = getCart();
        // return the product id and color
        const resultProduct = cart.find((element) => element.id === productId && element.color === color);

        // if the product is defined
        if(resultProduct != undefined) {
            // add the quantity
            resultProduct.quantity += Number(quantity);  

        //if the product is not defined
        } else {
            //defined a product with its id, color, quantity and name
            const productToBuy = {
                id: productId,
                color: color,
                quantity: Number(quantity),
                name : document.getElementById("title").textContent,
            }
            //add to the cart the product and return the new array
            cart.push(productToBuy);
         
        }

        saveCart(cart);
        alert("Ajouté au panier !");
    } else {
        alert("Veuillez choisir une couleur et/ou choisir un nombre d'articles compris entre 1 et 100");
    }
}

