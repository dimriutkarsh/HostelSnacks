// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems();
});

function displayMenuItems() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = menuItems.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p class="price">₹${item.price}</p>
                <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Please add items to your cart first!');
        return;
    }

    const modal = document.getElementById('checkoutModal');
    const orderSummary = document.getElementById('orderSummary');
    
    orderSummary.innerHTML = `
        <h3>Order Summary</h3>
        ${cart.map(item => `
            <div class="cart-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `).join('')}
        <div class="cart-total">
            <span>Total:</span>
            <span>₹${getTotal()}</span>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').style.display = 'none';
}

function submitOrder(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const room = document.getElementById('room').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    const orderDetails = cart.map(item => 
        `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');
    
    const total = getTotal();
    const message = `New Order!\n\nCustomer: ${name}\nRoom: ${room}\nPhone: ${phone}\nPayment: ${paymentMethod}\n\nOrder Details:\n${orderDetails}\n\nTotal: ₹${total}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    cart = [];
    updateCart();
    closeCheckoutModal();
    
    alert('Order placed successfully! Redirecting to WhatsApp...');
}