// cart.js

document.addEventListener('DOMContentLoaded', () => {
    updateCart();

    document.querySelectorAll('.normal').forEach(button => {
        button.addEventListener('click', addToCart);
    });
});

function addToCart(event) {
    const product = event.target.closest('.single-pro-details');
    const name = product.querySelector('h4').innerText;
    const price = parseFloat(product.querySelector('h2').innerText.replace('$', ''));
    const quantity = parseInt(product.querySelector('input[type="number"]').value);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.name === name);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountContainer = document.getElementById('total-amount');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = 0;

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${itemTotal.toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);
    });

    totalAmountContainer.innerText = totalAmount.toFixed(2);
}
