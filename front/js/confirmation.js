//return to a new page with the previously defined id as parameter
const id = new URL(window.location.href).searchParams.get("id");

//filled the input with the id number defined when sending the form
const orderId = document.getElementById('orderId');
orderId.textContent = id;
