// Affiliate the product with its id

const productId = new URLSearchParams(document.location.search).get("id");
//console.log(productId);

fetch(`http://localhost:3000/api/products/${productId}`)

    .then((response) => response.json())

    .then((selectedProduct) => {
        // Display of api data
        document.title = selectedProduct.name;

        // Display image
        let selectedProductImage = document.createElement("img");
        document.getElementsByClassName("item__img")[0].appendChild(selectedProductImage);
        selectedProductImage.src = selectedProduct.imageUrl;
        selectedProductImage.alt = selectedProduct.altTxt;

        // Dislay other elements
        document.getElementById("title").innerText = selectedProduct.name;
        document.getElementById("price").innerText = selectedProduct.price;
        document.getElementById("description").innerText = selectedProduct.description;

        // Display colors option
        for (let i=0; i<selectedProduct.colors.length; i++) {
            let productColors = document.createElement("option");
            productColors.setAttribute("value", selectedProduct.colors[i]);
            productColors.innerHTML = selectedProduct.colors[i];
            document.getElementById("colors").appendChild(productColors);
        }
    })

    .catch((error) => {
        alert("Une erreur s'est produite, veuillez nous excuser");
        console.log("fetch error in product.js", error);
    });


/*
// Add a product to the cart

const addProductToCartButton = document.getElementById("addToCart");
addProductToCartButton.addEventListener("click", addProductToCart);

function addProductToCart() {

    const color = document.getElementById("colors").value
    const quantity = document.getElementById("quantity").value

    if(color !== "" && 0>quantity<101) {
        const productToBuy = {
            id: selectedProduct._id,
            color: color,
            quantity: Number(quantity),
            name: selectedProduct.name
        }
    }



}
*/
