//Return the cart from the local storage
function getCart() {
    // defines a variable that stores the return value of "cart"
    const cart = localStorage.getItem("cart");
    
    //if the cart is emty
    if(cart == null) {
        //return an empty array
        return [];
    } else {
        //constructs the value of cart
        return JSON.parse(cart);
    }
}

//Save the cart from the local storage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

//Display total quantity and price of elements in cart
function getQuantityProduct(){
    //call the cart from the local storage
    let cart = getCart();
    //define a variable for a product number
    let numberOfPoduct = 0;
    
    //for the product in the cart
    for(let product of cart){
        //increments the number of products according to the quantity of the product
        numberOfPoduct += product.quantity;
    }
    
    return numberOfPoduct;
}

//Display total price of the cart
function getTotalCartPrice(product, quantity) {
    totalCartPrice += product.price * quantity;
    return totalCartPrice;    
}

//Delete product
function deleteProduct(product){

    //call the cart from the local storage
    let cart = getCart();

    //create and return a new array if the element id or color is different from the product
    cart = cart.filter(element => element.id !== product.id || element.color !== product.color);

    //save the new cart
    saveCart(cart);
}

//Supports quantity changes
function modifyQuantity(product, quantity) {

    //call the cart from the local storage
    let cart = getCart();
    //return the value of the product
    let productFound = cart.find((p) => p.id == product.id && p.color == product.color);

    //if the product is defined
    if(productFound != undefined) {
        //defined its quantity
        productFound.quantity = quantity;

        //if the quantity is under 0
        if(quantity <= 0) {
            //delete the product
            deleteProduct(product);
            //set an alert
            alert("Le produit a bien été supprimé");
            //reload the page
            location.reload();

        //if the quantity is over 100
        } else if(quantity >= 100) {
            //set an alert
            alert("Maximum 100 pour la quantité du produit");
        } else {
            //save the cart with the new quantity
            saveCart(cart);
        }
    }
}

//Modify the total price of all products
function modifyTotalPrice(product, oldQuantity, newQuantity){
    // if the new quantity is higher than the old quantity
    if(newQuantity > oldQuantity) {
        //add to the total cart price the product price times the new quantity minus old quantity
        totalCartPrice += product.price * (newQuantity - oldQuantity);
        return totalCartPrice;
    // if the new quantity is lower than the old quantity
    } else if(newQuantity < oldQuantity) {
        //remove to the total cart price the product price times the old quantity minus new quantity
        totalCartPrice -= product.price * (oldQuantity - newQuantity);
        return totalCartPrice;
    }
}