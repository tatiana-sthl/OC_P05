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
            productColors.innerHTML = selectedProduct.colors[i];
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

    const color = document.getElementById("colors").value
    const quantity = document.getElementById("quantity").value

    if(color !== "" && 0>quantity<101) {

        if(localStorage.getItem("cart")) {
            const productInCart = JSON.parse(localStorage.getItem("cart"));
            const productId = new URLSearchParams(document.location.search).get("id");
            const productColor = document.getElementById("colors").value
            const productQuantity = document.getElementById("quantity").value 

            const resultProduct = productInCart.find((element) => element.productId === productId && element.productColor === productColor);
            
            if(resultProduct) {
                const productQuantityUpdate = parseInt(productQuantity) + parseInt(resultProduct.productQuantity);
                resultProduct.productQuantity = productQuantityUpdate
                localStorage.setItem("cart", JSON.stringify(productInCart));
            } else {
                
                const productToBuy = {
                    id: productId,
                    color: color,
                    quantity: Number(quantity),
                    name : document.getElementById("title").textContent,
                }
            
                productInCart.push(productToBuy);
            
                const productInCartStingify = JSON.stringify(productInCart);
                localStorage.setItem("cart", productInCartStingify);
            
                alert("Ajouté au panier !");
            }
        } else {

            const productToBuy = {
                id: selectedProduct._id,
                color: color,
                quantity: Number(quantity),
                name: selectedProduct.name
            }
        
            productInCart.push(productToBuy);
        
            const productInCartStingify = JSON.stringify(productInCart);
            localStorage.setItem("cart", productInCartStingify);
        
            alert("Ajouté au panier !");
        }
    }
}

