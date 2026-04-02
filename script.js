const products = [
    { id: 1, name: "Kit Festa 1kg", desc: "1kg Bolo + 50 Salgados + 20 Doces", price: 100.00, cat: "kits", img: "/img/kit1.jpg" },
    { id: 2, name: "Kit Festa 2kg", desc: "2kg Bolo + 100 Salgados + 30 Doces", price: 150.00, cat: "kits", img: "/img/kit2.jpg" },
    { id: 3, name: "Kit Festa 3kg", desc: "3kg Bolo + 150 Salgados + 50 Doces", price: 250.00, cat: "kits", img: "/img/kit3.jpg" },
    { id: 4, name: "Bolo Decorado (kg)", desc: "Trabalho artístico personalizado", price: 75.00, cat: "bolos", img: "/img/bolodecorado.jpg" },
    { id: 5, name: "Cento de Salgados", desc: "100 unidades (variados)", price: 50.00, cat: "salgados", img: "/img/cento.jpg" }
];

let cart = [];
const phone = "5598983431318";

function renderMenu(filter = 'todos') {
    const container = document.getElementById('menu');
    container.innerHTML = '';
    const filtered = filter === 'todos' ? products : products.filter(p => p.cat === filter);
    filtered.forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${p.img}" class="product-img">
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p class="product-desc" style="font-size:0.7rem; color:#888; height:30px; overflow:hidden;">${p.desc}</p>
                    <div style="margin-top:10px;">
                        <span style="color:#E60026; font-weight:800;">R$ ${p.price.toFixed(2).replace('.',',')}</span>
                        <button onclick="addToCart(${p.id})" style="background:#FFC107; border:none; padding:5px 12px; border-radius:8px; float:right; font-weight:bold; cursor:pointer;">+</button>
                    </div>
                </div>
            </div>`;
    });
}

function addToCart(id) {
    cart.push(products.find(p => p.id === id));
    updateCart();
    document.getElementById('cart-bar').style.display = 'flex';
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    const total = cart.reduce((acc, p) => acc + p.price, 0);
    document.getElementById('cart-total').innerText = `R$ ${total.toFixed(2).replace('.',',')}`;
    document.getElementById('cart-items-list').innerHTML = cart.map(p => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-weight:600;">
            <span>${p.name}</span>
            <span>R$ ${p.price.toFixed(2).replace('.',',')}</span>
        </div>`).join('');
}

function filterMenu(cat, event) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    if(event) event.target.classList.add('active');
    renderMenu(cat);
}

function toggleModal() {
    const m = document.getElementById('modal-cart');
    const o = document.getElementById('overlay');
    const v = m.style.display === 'block';
    m.style.display = v ? 'none' : 'block';
    o.style.display = v ? 'none' : 'block';
}

function sendWhatsApp() {
    let msg = "🍩 *NOVO PEDIDO ARAÚJO*%0A%0A";
    cart.forEach(p => msg += `• ${p.name} - R$ ${p.price.toFixed(2).replace('.',',')}%0A`);
    const total = cart.reduce((acc, p) => acc + p.price, 0);
    msg += `%0A*TOTAL: R$ ${total.toFixed(2).replace('.',',')}*`;
    window.open(`https://wa.me/${phone}?text=${msg}`);
}

function sendBooking() {
    const name = document.getElementById('book-name').value;
    const date = document.getElementById('book-date').value;
    const type = document.getElementById('book-type').value;
    if(!name || !date || !type) return alert("Por favor, preencha todos os campos do agendamento.");
    const msg = `📅 *NOVO AGENDAMENTO*%0A*Nome:* ${name}%0A*Data:* ${date}%0A*Evento:* ${type}`;
    window.open(`https://wa.me/${phone}?text=${msg}`);
}

// Inicia o menu
renderMenu();