function getCart() {

    const cart = localStorage.getItem("cart");
    
    if(cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

//Display total quantity and price of elements in cart
function getQuantityProduct(){
    let cart = getCart();
    let numberOfPoduct = 0;
    
    for(let product of cart){
        numberOfPoduct += product.quantity;
    }
    
    return numberOfPoduct;
}

function getTotalCartPrice(product, quantity) {
    totalCartPrice += product.price * quantity;
    return totalCartPrice;    
}

//Supports quantity changes
function modifyQuantity(product, quantity) {

    let cart = getCart();

    let productFound = cart.find((p) => p.id == product.id && p.color == product.color);

    if(productFound != undefined) {
        productFound.quantity = quantity;

        if(quantity <= 0) {
            deleteProduct(product);
            alert("Le produit a bien été supprimé");
            location.reload();
        } else if(quantity >= 100) {
            alert("Maximum 100 pour la quantité du produit");
        } else {
            saveCart(cart);
        }
    }
}

function deleteProduct(product){

    let cart = getCart();

    cart = cart.filter(element => element.id !== product.id || element.color !== product.color);
    saveCart(cart);
}

function modifyTotalPrice(product, oldQuantity, newQuantity){

    if(newQuantity > oldQuantity) {
        totalCartPrice += product.price * (newQuantity - oldQuantity);
        return totalCartPrice;
    } else if(newQuantity < oldQuantity) {
        totalCartPrice -= product.price * (oldQuantity - newQuantity);
        return totalCartPrice;
    }
}