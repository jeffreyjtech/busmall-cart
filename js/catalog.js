/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  // DONE: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let optionElement = document.createElement('option');
    optionElement.textContent = Product.allProducts[i].name;
    optionElement.value = Product.allProducts[i].name;
    selectElement.appendChild(optionElement);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // DONE: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

// DONE: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // DONE: suss out the item picked from the select list
  const selectElement = document.getElementById('items')
  let selectedItem = selectElement.value;

  // DONE: get the quantity
  const quantityElement = document.getElementById('quantity');
  let selectedQty = +quantityElement.value;
  // DONE: using those, add one item to the Cart
  cart.addItem(selectedItem, selectedQty);
}

// DONE: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let itemCountElem = document.getElementById('itemCount');
  let totalQty = 0;
  for (let i in cart.items) {
    totalQty += cart.items[i].quantity;
    console.log(totalQty);
    itemCountElem.innerText = totalQty;
  }
}

// DONE: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // cart preview div = cartContents
  let cartContentsElem = document.getElementById('cartContents');
  // DONE: Get the item and quantity from the form
  const selectElement = document.getElementById('items')
  let selectedItem = selectElement.value;

  const quantityElement = document.getElementById('quantity');
  let selectedQty = +quantityElement.value;

  let ulElem;

  if (ulElem === undefined) {
    ulElem = document.createElement('ul');
    cartContentsElem.appendChild(ulElem);
  }
  // DONE: Add a new element to the cartContents div with that information
  let liElem = document.createElement('li');
  liElem.innerText = `${selectedItem}: ${selectedQty}`
  ulElem.appendChild(liElem);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
