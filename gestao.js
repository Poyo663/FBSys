// gestao.js

const STORAGE_PRODUCTS = 'fbsys_products';

const initialProducts = [
    { id: 1, name: 'Chocolate 70%', category: 'Sabor', tag: 'Artesanal', available: true },
    { id: 2, name: 'Morango Real', category: 'Sabor', tag: 'Sem Glúten', available: true },
    { id: 3, name: 'Ninho c/ Nutella', category: 'Sabor', tag: 'Favorito', available: true },
    { id: 4, name: 'Menta c/ Chips', category: 'Sabor', tag: 'Refrescante', available: true },
    { id: 5, name: 'Sorbet de Manga', category: 'Sabor', tag: '0% Lactose', available: true },
    { id: 6, name: 'Pistache Premium', category: 'Sabor', tag: 'Especial', available: false }
];

const analyticsData = {
    hoje: {
        revenue: 'R$ 642,50',
        orders: '48',
        ticket: 'R$ 13,38',
        topFlavor: 'Ninho c/ Nutella',
        flavors: [
            { name: 'Ninho c/ Nutella', pct: 38, style: '' },
            { name: 'Chocolate 70%', pct: 27, style: 'choco' },
            { name: 'Morango Real', pct: 18, style: '' },
            { name: 'Sorbet de Manga', pct: 10, style: 'mint' },
            { name: 'Menta c/ Chips', pct: 7, style: 'mint' }
        ],
        hours: [
            { label: '14h', value: 25, peak: false },
            { label: '15h', value: 40, peak: false },
            { label: '16h', value: 55, peak: false },
            { label: '17h', value: 65, peak: false },
            { label: '18h', value: 80, peak: true },
            { label: '19h', value: 100, peak: true },
            { label: '20h', value: 92, peak: true },
            { label: '21h', value: 50, peak: false }
        ]
    },
    semana: {
        revenue: 'R$ 4.180,00',
        orders: '312',
        ticket: 'R$ 13,40',
        topFlavor: 'Ninho c/ Nutella',
        flavors: [
            { name: 'Ninho c/ Nutella', pct: 40, style: '' },
            { name: 'Chocolate 70%', pct: 25, style: 'choco' },
            { name: 'Morango Real', pct: 16, style: '' },
            { name: 'Menta c/ Chips', pct: 11, style: 'mint' },
            { name: 'Sorbet de Manga', pct: 8, style: 'mint' }
        ],
        hours: [
            { label: '14h', value: 30, peak: false },
            { label: '15h', value: 45, peak: false },
            { label: '16h', value: 60, peak: false },
            { label: '17h', value: 70, peak: false },
            { label: '18h', value: 85, peak: true },
            { label: '19h', value: 100, peak: true },
            { label: '20h', value: 95, peak: true },
            { label: '21h', value: 60, peak: false }
        ]
    },
    mes: {
        revenue: 'R$ 17.920,00',
        orders: '1.340',
        ticket: 'R$ 13,37',
        topFlavor: 'Ninho c/ Nutella',
        flavors: [
            { name: 'Ninho c/ Nutella', pct: 39, style: '' },
            { name: 'Chocolate 70%', pct: 28, style: 'choco' },
            { name: 'Morango Real', pct: 15, style: '' },
            { name: 'Sorbet de Manga', pct: 10, style: 'mint' },
            { name: 'Menta c/ Chips', pct: 8, style: 'mint' }
        ],
        hours: [
            { label: '14h', value: 28, peak: false },
            { label: '15h', value: 42, peak: false },
            { label: '16h', value: 58, peak: false },
            { label: '17h', value: 68, peak: false },
            { label: '18h', value: 88, peak: true },
            { label: '19h', value: 100, peak: true },
            { label: '20h', value: 90, peak: true },
            { label: '21h', value: 55, peak: false }
        ]
    }
};

function getProducts() {
    const saved = localStorage.getItem(STORAGE_PRODUCTS);
    if (!saved) {
        localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(initialProducts));
        return initialProducts;
    }
    return JSON.parse(saved);
}

function saveProducts(list) {
    localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(list));
}

function renderCatalog() {
    const products = getProducts();
    const tbody = document.getElementById('catalog-table-body');
    tbody.innerHTML = '';

    products.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td>${item.category}</td>
            <td>${item.tag}</td>
            <td>
                <span class="badge ${item.available ? 'badge-ok' : 'badge-off'}">
                    ${item.available ? 'Disponível' : 'Esgotado'}
                </span>
            </td>
            <td style="display:flex; gap:0.4rem;">
                <button class="btn btn-outline btn-sm" onclick="toggleProductStatus(${item.id})">
                    ${item.available ? 'Pausar' : 'Ativar'}
                </button>
                <button class="btn btn-outline btn-sm" style="color:#DC2626;" onclick="removeProduct(${item.id})">
                    Excluir
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('prod-name').value.trim();
    const category = document.getElementById('prod-category').value;
    const tag = document.getElementById('prod-tag').value.trim();

    if (!name || !tag) return;

    const products = getProducts();
    products.push({
        id: Date.now(),
        name,
        category,
        tag,
        available: true
    });

    saveProducts(products);
    document.getElementById('product-form').reset();
    renderCatalog();
}

function toggleProductStatus(id) {
    const products = getProducts().map(p =>
        p.id === id ? { ...p, available: !p.available } : p
    );
    saveProducts(products);
    renderCatalog();
}

function removeProduct(id) {
    const products = getProducts().filter(p => p.id !== id);
    saveProducts(products);
    renderCatalog();
}

function updateAnalyticsPeriod() {
    const period = document.getElementById('period-filter').value;
    const data = analyticsData[period];

    document.getElementById('kpi-revenue').innerText = data.revenue;
    document.getElementById('kpi-orders').innerText = data.orders;
    document.getElementById('kpi-ticket').innerText = data.ticket;
    document.getElementById('kpi-top-flavor').innerText = data.topFlavor;

    // Renderizar Gráfico de Sabores
    const flavorsChart = document.getElementById('flavors-chart');
    flavorsChart.innerHTML = data.flavors.map(f => `
        <div class="bar-row">
            <div class="bar-info">
                <span>${f.name}</span>
                <span>${f.pct}%</span>
            </div>
            <div class="bar-track">
                <div class="bar-fill ${f.style}" style="width: ${f.pct}%"></div>
            </div>
        </div>
    `).join('');

    // Renderizar Gráfico de Horários
    const hoursChart = document.getElementById('hours-chart');
    hoursChart.innerHTML = data.hours.map(h => `
        <div class="hour-col">
            <div class="hour-bar ${h.peak ? 'peak' : ''}" style="height: ${h.value}%" title="${h.value}% da capacidade"></div>
            <span class="hour-label">${h.label}</span>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
    updateAnalyticsPeriod();
});