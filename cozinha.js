// cozinha.js

const STORAGE_ORDERS = 'fbsys_orders';
const STORAGE_PRODUCTS = 'fbsys_products';

// Dados iniciais caso não haja nada salvo ainda
const defaultOrders = [
    {
        id: '104',
        customer: 'Ana Beatriz',
        container: 'Copo 300ml',
        flavors: ['Ninho c/ Nutella (2x)', 'Chocolate 70% (1x)'],
        toppings: ['Calda de Chocolate', 'Castanha Triturada'],
        status: 'recebido',
        minutesAgo: 2,
        total: 14.00
    },
    {
        id: '103',
        customer: 'Carlos Eduardo',
        container: 'Cascão Especial',
        flavors: ['Morango Real (2x)', 'Ninho c/ Nutella (1x)'],
        toppings: ['Chantilly Fresco'],
        status: 'preparo',
        minutesAgo: 7, // > 5 min destaca como atrasado
        total: 17.50
    },
    {
        id: '102',
        customer: 'Mariana Silva',
        container: 'Copo 200ml',
        flavors: ['Sorbet de Manga (2x)'],
        toppings: ['Calda de Morango'],
        status: 'pronto',
        minutesAgo: 4,
        total: 8.00
    }
];

const defaultProducts = [
    { id: 1, name: 'Chocolate 70%', category: 'Sabor', tag: 'Artesanal', available: true },
    { id: 2, name: 'Morango Real', category: 'Sabor', tag: 'Sem Glúten', available: true },
    { id: 3, name: 'Ninho c/ Nutella', category: 'Sabor', tag: 'Favorito', available: true },
    { id: 4, name: 'Menta c/ Chips', category: 'Sabor', tag: 'Refrescante', available: true },
    { id: 5, name: 'Sorbet de Manga', category: 'Sabor', tag: '0% Lactose', available: true },
    { id: 6, name: 'Pistache Premium', category: 'Sabor', tag: 'Especial', available: false }
];

function getOrders() {
    const saved = localStorage.getItem(STORAGE_ORDERS);
    if (!saved) {
        localStorage.setItem(STORAGE_ORDERS, JSON.stringify(defaultOrders));
        return defaultOrders;
    }
    return JSON.parse(saved);
}

function saveOrders(orders) {
    localStorage.setItem(STORAGE_ORDERS, JSON.stringify(orders));
}

function getProducts() {
    const saved = localStorage.getItem(STORAGE_PRODUCTS);
    if (!saved) {
        localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(defaultProducts));
        return defaultProducts;
    }
    return JSON.parse(saved);
}

function renderKanban() {
    const orders = getOrders();
    const cols = {
        recebido: document.getElementById('list-recebido'),
        preparo: document.getElementById('list-preparo'),
        pronto: document.getElementById('list-pronto')
    };

    Object.values(cols).forEach(el => el.innerHTML = '');

    const counts = { recebido: 0, preparo: 0, pronto: 0 };

    orders.forEach(order => {
        if (!cols[order.status]) return;
        counts[order.status]++;

        const isDelayed = order.minutesAgo >= 6 && order.status !== 'pronto';
        const ticket = document.createElement('div');
        ticket.className = `order-ticket ${isDelayed ? 'delayed' : ''}`;

        let actionButton = '';
        if (order.status === 'recebido') {
            actionButton = `<button class="btn btn-primary btn-sm" onclick="advanceOrder('${order.id}', 'preparo')">Iniciar Preparo</button>`;
        } else if (order.status === 'preparo') {
            actionButton = `<button class="btn btn-mint btn-sm" onclick="advanceOrder('${order.id}', 'pronto')">Marcar Pronto</button>`;
        } else if (order.status === 'pronto') {
            actionButton = `<button class="btn btn-choco btn-sm" onclick="advanceOrder('${order.id}', 'entregue')">Concluir Entrega</button>`;
        }

        ticket.innerHTML = `
            <div class="ticket-top">
                <span class="ticket-id">Pedido #${order.id}</span>
                <span class="ticket-time">${order.minutesAgo} min</span>
            </div>
            <div class="ticket-customer">${order.customer}</div>
            <div class="ticket-items">
                <div><strong>Base:</strong> ${order.container}</div>
                <div><strong>Sabores:</strong> ${order.flavors.join(', ')}</div>
                <div><strong>Extras:</strong> ${order.toppings.length ? order.toppings.join(', ') : 'Sem adicionais'}</div>
            </div>
            <div class="ticket-actions">
                ${actionButton}
            </div>
        `;

        cols[order.status].appendChild(ticket);
    });

    document.getElementById('count-recebido').innerText = counts.recebido;
    document.getElementById('count-preparo').innerText = counts.preparo;
    document.getElementById('count-pronto').innerText = counts.pronto;
}

function advanceOrder(orderId, nextStatus) {
    let orders = getOrders();
    if (nextStatus === 'entregue') {
        orders = orders.filter(o => o.id !== orderId);
    } else {
        orders = orders.map(o => o.id === orderId ? { ...o, status: nextStatus } : o);
    }
    saveOrders(orders);
    renderKanban();
}

function renderQuickStock() {
    const products = getProducts();
    const container = document.getElementById('quick-stock-list');
    container.innerHTML = '';

    products.forEach(item => {
        const div = document.createElement('div');
        div.className = `stock-item ${item.available ? '' : 'out'}`;
        div.innerHTML = `
            <span>${item.name}</span>
            <button class="toggle-btn" onclick="toggleAvailability(${item.id})">
                ${item.available ? 'Disponível' : 'Esgotado'}
            </button>
        `;
        container.appendChild(div);
    });
}

function toggleAvailability(id) {
    const products = getProducts().map(p =>
        p.id === id ? { ...p, available: !p.available } : p
    );
    localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(products));
    renderQuickStock();
}

function simulateNewOrder() {
    const orders = getOrders();
    const names = ['Lucas Lima', 'Fernanda Rocha', 'João Pedro', 'Camila Alves'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomId = String(Math.floor(105 + Math.random() * 890));

    orders.unshift({
        id: randomId,
        customer: randomName,
        container: 'Copo 300ml',
        flavors: ['Chocolate 70% (2x)', 'Morango Real (1x)'],
        toppings: ['Granulado Premium'],
        status: 'recebido',
        minutesAgo: 0,
        total: 13.00
    });

    saveOrders(orders);
    renderKanban();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderKanban();
    renderQuickStock();
});