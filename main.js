// main.js

const STORAGE_ORDERS = 'fbsys_orders';
const STORAGE_PRODUCTS = 'fbsys_products';

const fallbackProducts = [
    { id: 1, name: 'Chocolate 70%', category: 'Sabor', tag: 'Artesanal', available: true },
    { id: 2, name: 'Morango Real', category: 'Sabor', tag: 'Sem Glúten', available: true },
    { id: 3, name: 'Ninho c/ Nutella', category: 'Sabor', tag: 'Favorito', available: true },
    { id: 4, name: 'Menta c/ Chips', category: 'Sabor', tag: 'Refrescante', available: true },
    { id: 5, name: 'Sorbet de Manga', category: 'Sabor', tag: '0% Lactose', available: true },
    { id: 6, name: 'Pistache Premium', category: 'Sabor', tag: 'Especial', available: false }
];

let orderState = {
    step: 1,
    container: null,
    flavors: {},
    toppings: [],
    customer: {
        name: '',
        phone: '',
        payment: 'Pix'
    }
};

function getCatalogFlavors() {
    const saved = localStorage.getItem(STORAGE_PRODUCTS);
    const list = saved ? JSON.parse(saved) : fallbackProducts;
    if (!saved) {
        localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(fallbackProducts));
    }
    return list.filter(item => item.category === 'Sabor');
}

function renderFlavorCards() {
    const container = document.getElementById('flavors-container');
    const flavors = getCatalogFlavors();
    container.innerHTML = '';

    flavors.forEach(item => {
        const currentQty = orderState.flavors[item.name] || 0;
        const card = document.createElement('div');
        card.className = `flavor-card ${item.available ? '' : 'unavailable'}`;

        if (item.available) {
            card.innerHTML = `
                <div>
                    <div class="flavor-name">${item.name}</div>
                    <span class="flavor-tag">${item.tag}</span>
                </div>
                <div class="flavor-controls">
                    <span class="container-info">Disponível</span>
                    <div class="qty-group">
                        <button type="button" class="qty-btn" onclick="changeFlavorQty('${item.name}', -1)">-</button>
                        <span id="qty-${item.name}" class="qty-value">${currentQty}</span>
                        <button type="button" class="qty-btn add" onclick="changeFlavorQty('${item.name}', 1)">+</button>
                    </div>
                </div>
            `;
        } else {
            card.innerHTML = `
                <div>
                    <div class="flavor-name">${item.name}</div>
                    <span class="flavor-tag">Esgotado</span>
                </div>
                <div class="flavor-controls">
                    <span class="container-info">Indisponível</span>
                    <button type="button" class="qty-btn" disabled>+</button>
                </div>
            `;
        }

        container.appendChild(card);
    });
}

function selectContainer(name, price, maxFlavors, cardElement) {
    orderState.container = { name, price, maxFlavors };

    const totalFlavors = Object.values(orderState.flavors).reduce((a, b) => a + b, 0);
    if (totalFlavors > maxFlavors) {
        orderState.flavors = {};
        resetFlavorUI();
    }

    document.querySelectorAll('.container-option').forEach(card => {
        card.classList.remove('selected');
    });
    cardElement.classList.add('selected');

    document.getElementById('btn-step1-next').disabled = false;
    document.getElementById('max-flavors-count').innerText = maxFlavors;
    document.getElementById('flavor-counter').innerText = `0 de ${maxFlavors} selecionados`;

    updateSummary();
}

function changeFlavorQty(flavorName, delta) {
    if (!orderState.container) return;

    const currentQty = orderState.flavors[flavorName] || 0;
    const totalFlavors = Object.values(orderState.flavors).reduce((a, b) => a + b, 0);

    if (delta > 0 && totalFlavors < orderState.container.maxFlavors) {
        orderState.flavors[flavorName] = currentQty + 1;
    } else if (delta < 0 && currentQty > 0) {
        orderState.flavors[flavorName] = currentQty - 1;
        if (orderState.flavors[flavorName] === 0) {
            delete orderState.flavors[flavorName];
        }
    }

    const qtyEl = document.getElementById(`qty-${flavorName}`);
    if (qtyEl) qtyEl.innerText = orderState.flavors[flavorName] || 0;

    const newTotal = Object.values(orderState.flavors).reduce((a, b) => a + b, 0);
    document.getElementById('flavor-counter').innerText = `${newTotal} de ${orderState.container.maxFlavors} selecionados`;
    document.getElementById('btn-step2-next').disabled = newTotal === 0;

    updateSummary();
}

function resetFlavorUI() {
    document.querySelectorAll('[id^="qty-"]').forEach(el => el.innerText = '0');
    const max = orderState.container ? orderState.container.maxFlavors : 2;
    document.getElementById('flavor-counter').innerText = `0 de ${max} selecionados`;
    document.getElementById('btn-step2-next').disabled = true;
}

function toggleTopping(name, price, checkbox) {
    if (checkbox.checked) {
        orderState.toppings.push({ name, price });
    } else {
        orderState.toppings = orderState.toppings.filter(t => t.name !== name);
    }
    updateSummary();
}

function updateSummary() {
    const containerNameEl = document.getElementById('summary-container-name');
    const itemsContainerEl = document.getElementById('summary-items-container');
    const priceBaseEl = document.getElementById('price-base');
    const priceToppingsEl = document.getElementById('price-toppings');
    const priceTotalEl = document.getElementById('price-total');

    if (!orderState.container) {
        containerNameEl.innerText = 'Nenhum';
        itemsContainerEl.innerHTML = '<div class="summary-empty">Selecione a base do seu sorvete para começar</div>';
        priceBaseEl.innerText = 'R$ 0,00';
        priceToppingsEl.innerText = 'R$ 0,00';
        priceTotalEl.innerText = 'R$ 0,00';
        return;
    }

    containerNameEl.innerText = orderState.container.name;
    priceBaseEl.innerText = `R$ ${orderState.container.price.toFixed(2).replace('.', ',')}`;

    const toppingsTotal = orderState.toppings.reduce((sum, item) => sum + item.price, 0);
    priceToppingsEl.innerText = `R$ ${toppingsTotal.toFixed(2).replace('.', ',')}`;

    const grandTotal = orderState.container.price + toppingsTotal;
    priceTotalEl.innerText = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;

    let html = `
        <div class="summary-base-box">
            <span>${orderState.container.name}</span>
            <span>R$ ${orderState.container.price.toFixed(2).replace('.', ',')}</span>
        </div>
    `;

    const flavorEntries = Object.entries(orderState.flavors);
    if (flavorEntries.length > 0) {
        html += '<div><div class="summary-group-title">Sabores</div>';
        flavorEntries.forEach(([flavor, qty]) => {
            html += `
                <div class="summary-line">
                    <span>${flavor}</span>
                    <strong>x${qty}</strong>
                </div>
            `;
        });
        html += '</div>';
    }

    if (orderState.toppings.length > 0) {
        html += '<div><div class="summary-group-title">Adicionais</div>';
        orderState.toppings.forEach(top => {
            html += `
                <div class="summary-line">
                    <span>${top.name}</span>
                    <span>${top.price > 0 ? 'R$ ' + top.price.toFixed(2).replace('.', ',') : 'Grátis'}</span>
                </div>
            `;
        });
        html += '</div>';
    }

    itemsContainerEl.innerHTML = html;

    const finalDetails = document.getElementById('final-summary-details');
    if (finalDetails) {
        finalDetails.innerHTML = `
            <div><strong>Recipiente:</strong> ${orderState.container.name}</div>
            <div><strong>Sabores:</strong> ${flavorEntries.map(([f, q]) => `${f} (${q}x)`).join(', ') || 'Nenhum'}</div>
            <div><strong>Adicionais:</strong> ${orderState.toppings.map(t => t.name).join(', ') || 'Nenhum'}</div>
            <div><strong>Total a Pagar:</strong> R$ ${grandTotal.toFixed(2).replace('.', ',')}</div>
        `;
    }
}

function goToStep(stepNumber) {
    orderState.step = stepNumber;

    document.querySelectorAll('.step-content').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(`step-${stepNumber}`).classList.remove('hidden');

    for (let i = 1; i <= 4; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`);
        const circle = indicator.querySelector('.step-circle');

        indicator.classList.remove('active', 'done');
        if (i < stepNumber) {
            indicator.classList.add('done');
            circle.innerHTML = '<i class="fa-solid fa-check"></i>';
        } else if (i === stepNumber) {
            indicator.classList.add('active');
            circle.innerText = i;
        } else {
            circle.innerText = i;
        }
    }
}

function submitOrder() {
    const nameInput = document.getElementById('customer-name').value.trim();
    if (!nameInput) {
        alert('Por favor, informe o nome do cliente para identificar o pedido.');
        document.getElementById('customer-name').focus();
        return;
    }

    orderState.customer.name = nameInput;
    orderState.customer.phone = document.getElementById('customer-phone').value.trim();
    orderState.customer.payment = document.getElementById('payment-method').value;

    const randomOrderId = String(Math.floor(105 + Math.random() * 890));
    const toppingsTotal = orderState.toppings.reduce((sum, item) => sum + item.price, 0);
    const grandTotal = orderState.container.price + toppingsTotal;

    // Salva na fila da cozinha (cozinha.html)
    const existingOrders = JSON.parse(localStorage.getItem(STORAGE_ORDERS) || '[]');
    existingOrders.unshift({
        id: randomOrderId,
        customer: orderState.customer.name,
        container: orderState.container.name,
        flavors: Object.entries(orderState.flavors).map(([f, q]) => `${f} (${q}x)`),
        toppings: orderState.toppings.map(t => t.name),
        status: 'recebido',
        minutesAgo: 0,
        total: grandTotal
    });
    localStorage.setItem(STORAGE_ORDERS, JSON.stringify(existingOrders));

    document.getElementById('order-id').innerText = randomOrderId;
    document.getElementById('success-customer-name').innerText = orderState.customer.name;

    document.querySelectorAll('.step-content').forEach(sec => sec.classList.add('hidden'));
    document.getElementById('step-success').classList.remove('hidden');
}

function resetForm() {
    orderState = {
        step: 1,
        container: null,
        flavors: {},
        toppings: [],
        customer: { name: '', phone: '', payment: 'Pix' }
    };

    document.getElementById('customer-name').value = '';
    document.getElementById('customer-phone').value = '';
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('.container-option').forEach(card => card.classList.remove('selected'));

    resetFlavorUI();
    renderFlavorCards();

    document.getElementById('btn-step1-next').disabled = true;
    document.getElementById('step-success').classList.add('hidden');

    goToStep(1);
    updateSummary();
}

document.addEventListener('DOMContentLoaded', () => {
    renderFlavorCards();
    updateSummary();
});