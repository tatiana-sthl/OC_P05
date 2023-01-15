// Retrieval and transmission of API data

fetch("http://localhost:3000/api/products")

    .then((response) => response.json())

    .then((product) => {
        for(let i=0; i<product.length; i++) {

            let productAnchor = document.createElement("a");
            document.querySelector(".items").appendChild(productAnchor);
            productAnchor.href = `product.html?id=${product[i]._id}`;

            let productArticle = document.createElement("article");
            productAnchor.appendChild(productArticle);

            let productImage = document.createElement("img");
            productArticle.appendChild(productImage);
            productImage.src = product[i].imageUrl;
            productImage.alt = product[i].altTxt;

            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = product[i].name;

            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productDescription");
            productDescription.innerHTML = product[i].description;
        }
    })

    .catch((error) => {
        alert("Une erreur s'est produite, veuillez nous excuser");
        console.log("fetch error in script.js", error);
    })