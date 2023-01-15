// Retrieval and transmission of API data

fetch("http://localhost:3000/api/products")

    .then((response) => response.json())

    .then((products) => {
        for(let i=0; i<products.length; i++) {

            let productAnchor = document.createElement("a");
            document.querySelector(".items").appendChild(productAnchor);
            productAnchor.href = `products.html?id=${products[i]._id}`;
        }
    })

    .catch((error) => {
        alert("Une erreur s'est produite, veuillez nous excuser");
        console.log("fetch error in index.js", error);
    })