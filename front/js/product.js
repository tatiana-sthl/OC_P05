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
    const price = document.getElementById("price").textContent;


    if(color !== "" && 0<quantity && quantity<101) {

        const cart = getCart();
        const resultProduct = cart.find((element) => element.id === productId && element.color === color);

        if(resultProduct != undefined) {

            resultProduct.quantity += Number(quantity);  

        } else {
            
            const productToBuy = {
                id: productId,
                color: color,
                quantity: Number(quantity),
                name : document.getElementById("title").textContent,
                price : (+price),
            }

            cart.push(productToBuy);
         
        }

        saveCart(cart);
        alert("Ajouté au panier !");
    } else {
        alert("Veuillez choisir une couleur et/ou choisir un nombre d'articles compris entre 1 et 100");
    }
}

