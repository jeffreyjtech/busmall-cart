/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// Done: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tBodyElem = document.querySelector('tbody');
  while (tBodyElem.firstChild){
    tBodyElem.removeChild(tBodyElem.lastChild);
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  let tBodyElem = document.querySelector('tbody');

  // TODO: Iterate over the items in the cart
  for (let i in cart){
    // TODO: Create a TR
    let trElem = document.createElement('tr');

    // TODO: Create a TD for the delete link, quantity,  and the item
    let tdElemDelete = document.createElement('td');
    let tdElemQty = document.createElement('td');
    let tdElemItem = document.createElement('td');
    tdElemDelete.textContent = 'x';
    tdElemDelete.id = `delete-${i}`;
    tdElemQty.textContent = cart.items[i].quantity;
    tdElemItem.textContent = cart.items[i].name;
    trElem.appendChild(tdElemDelete);
    trElem.appendChild(tdElemQty);
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    trElem.appendChild(tdElemItem);
    tBodyElem.appendChild(trElem);
  }

}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  console.log(event.target);
  cart.removeItem(event.target.name);
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();
