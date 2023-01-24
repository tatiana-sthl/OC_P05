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