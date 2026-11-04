// State Management
let orderState = {
  step: 1,
  container: null, // { name, price, maxFlavors }
  flavors: {},     // { 'Nome': qty }
  toppings: [],    // [ { name, price } ]
  customer: {
    name: '',
    phone: '',
    payment: 'Pix'
  }
};

// Select Base / Container
function selectContainer(name, price, maxFlavors) {
  orderState.container = { name, price, maxFlavors };

  // If previous flavors exceeded new max, clear them
  const totalFlavors = Object.values(orderState.flavors).reduce((a, b) => a + b, 0);
  if (totalFlavors > maxFlavors) {
    orderState.flavors = {};
    resetFlavorUI();
  }

  // Update UI Selection state
  document.querySelectorAll('.container-option').forEach(card => {
    card.classList.remove('border-brand-pink', 'bg-pink-50/30', 'ring-2', 'ring-brand-pink');
  });
  event.currentTarget.classList.add('border-brand-pink', 'bg-pink-50/30', 'ring-2', 'ring-brand-pink');

  // Enable Next Button
  const nextBtn = document.getElementById('btn-step1-next');
  nextBtn.disabled = false;
  nextBtn.classList.remove('bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
  nextBtn.classList.add('bg-brand-pink', 'hover:bg-pink-600', 'text-white', 'shadow-md');

  // Update Max Flavors Indicator for Step 2
  document.getElementById('max-flavors-count').innerText = maxFlavors;

  updateSummary();
}

// Change Quantity of Flavors
function changeFlavorQty(flavorName, delta) {
  if (!orderState.container) return;

  const currentQty = orderState.flavors[flavorName] || 0;
  const totalFlavors = Object.values(orderState.flavors).reduce((a, b) => a + b, 0);

  if (delta > 0) {
    if (totalFlavors < orderState.container.maxFlavors) {
      orderState.flavors[flavorName] = currentQty + 1;
    }
  } else if (delta < 0 && currentQty > 0) {
    orderState.flavors[flavorName] = currentQty - 1;
    if (orderState.flavors[flavorName] === 0) {
      delete orderState.flavors[flavorName];
    }
  }

  // Update UI counter for this specific flavor
  document.getElementById(`qty-${flavorName}`).innerText = orderState.flavors[flavorName] || 0;

  // Update step 2 progress text and button
  const newTotal = Object.values(orderState.flavors).reduce((a, b) => a + b, 0);
  document.getElementById('flavor-counter').innerText = `${newTotal} de ${orderState.container.maxFlavors} selecionados`;

  const btnStep2 = document.getElementById('btn-step2-next');
  if (newTotal > 0) {
    btnStep2.disabled = false;
    btnStep2.classList.remove('bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
    btnStep2.classList.add('bg-brand-pink', 'hover:bg-pink-600', 'text-white', 'shadow-md');
  } else {
    btnStep2.disabled = true;
    btnStep2.classList.add('bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
    btnStep2.classList.remove('bg-brand-pink', 'hover:bg-pink-600', 'text-white', 'shadow-md');
  }

  updateSummary();
}

function resetFlavorUI() {
  document.querySelectorAll('[id^="qty-"]').forEach(el => el.innerText = '0');
  document.getElementById('flavor-counter').innerText = `0 de ${orderState.container ? orderState.container.maxFlavors : 2} selecionados`;
}

// Toggle Toppings
function toggleTopping(name, price, checkbox) {
  if (checkbox.checked) {
    orderState.toppings.push({ name, price });
  } else {
    orderState.toppings = orderState.toppings.filter(t => t.name !== name);
  }
  updateSummary();
}

// Update Side Summary Panel
function updateSummary() {
  const containerNameEl = document.getElementById('summary-container-name');
  const itemsContainerEl = document.getElementById('summary-items-container');
  const priceBaseEl = document.getElementById('price-base');
  const priceToppingsEl = document.getElementById('price-toppings');
  const priceTotalEl = document.getElementById('price-total');

  if (!orderState.container) {
    containerNameEl.innerText = "Nenhum";
    itemsContainerEl.innerHTML = `
    <div class="text-center py-8 text-slate-400 text-xs flex flex-col items-center">
      <i class="fa-solid fa-ice-cream text-3xl mb-2 text-slate-200"></i>
      <span>Selecione a base do seu sorvete para começar</span>
    </div>`;
    priceBaseEl.innerText = "R$ 0,00";
    priceToppingsEl.innerText = "R$ 0,00";
    priceTotalEl.innerText = "R$ 0,00";
    return;
  }

  containerNameEl.innerText = orderState.container.name;
  priceBaseEl.innerText = `R$ ${orderState.container.price.toFixed(2).replace('.', ',')}`;

  // Calculate Toppings Cost
  const toppingsTotal = orderState.toppings.reduce((sum, item) => sum + item.price, 0);
  priceToppingsEl.innerText = `R$ ${toppingsTotal.toFixed(2).replace('.', ',')}`;

  // Calculate Total Cost
  const grandTotal = orderState.container.price + toppingsTotal;
  priceTotalEl.innerText = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;

  // Render Dynamic Items List
  let html = `
  <div class="bg-pink-50/50 p-2.5 rounded-lg border border-pink-100 text-xs">
    <div class="font-bold text-slate-800 flex justify-between">
      <span>${orderState.container.name}</span>
      <span>R$ ${orderState.container.price.toFixed(2).replace('.', ',')}</span>
    </div>
  </div>
            `;

  // Flavors List
  const flavorEntries = Object.entries(orderState.flavors);
  if (flavorEntries.length > 0) {
    html += `<div class="text-xs space-y-1 px-1">
      <span class="text-[10px] uppercase font-bold text-slate-400">Sabores:</span>`;
    flavorEntries.forEach(([flavor, qty]) => {
      html += `
      <div class="flex justify-between text-slate-700">
        <span>• ${flavor}</span>
        <span class="font-semibold text-pink-600">x${qty}</span>
      </div>
                    `;
    });
    html += `</div>`;
  }

  // Toppings List
  if (orderState.toppings.length > 0) {
    html += `<div class="text-xs space-y-1 px-1 pt-1">
      <span class="text-[10px] uppercase font-bold text-slate-400">Adicionais:</span>`;
    orderState.toppings.forEach(top => {
      html += `
      <div class="flex justify-between text-slate-700">
        <span>+ ${top.name}</span>
        <span class="text-slate-500">${top.price > 0 ? 'R$ ' + top.price.toFixed(2).replace('.', ',') : 'Grátis'}</span>
      </div>
                    `;
    });
    html += `</div>`;
  }

  itemsContainerEl.innerHTML = html;

  // Populate Step 4 Review details
  const finalDetails = document.getElementById('final-summary-details');
  if (finalDetails) {
    finalDetails.innerHTML = `
    <p><strong>Recipiente:</strong> ${orderState.container.name}</p>
    <p><strong>Sabores:</strong> ${flavorEntries.map(([f, q]) => `${f} (${q}x)`).join(', ') || 'Nenhum'}</p>
    <p><strong>Adicionais:</strong> ${orderState.toppings.map(t => t.name).join(', ') || 'Nenhum'}</p>
    <p class="pt-1 text-slate-800 font-bold">Total a Pagar: R$ ${grandTotal.toFixed(2).replace('.', ',')}</p>
                `;
  }
}

// Navigation between Steps
function goToStep(stepNumber) {
  orderState.step = stepNumber;

  // Hide all step sections
  document.querySelectorAll('.step-content').forEach(sec => sec.classList.add('hidden'));

  // Show target step section
  document.getElementById(`step-${stepNumber}`).classList.remove('hidden');

  // Update Progress Header Indicators
  for (let i = 1; i <= 4; i++) {
    const indicator = document.getElementById(`step-indicator-${i}`);
    const circle = indicator.querySelector('span:first-child');

    if (i < stepNumber) {
      // Completed step
      indicator.className = "step-indicator flex items-center space-x-2 text-emerald-600 font-semibold";
      circle.className = "w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow";
      circle.innerHTML = '<i class="fa-solid fa-check"></i>';
    } else if (i === stepNumber) {
      // Current step
      indicator.className = "step-indicator flex items-center space-x-2 text-brand-pink font-semibold";
      circle.className = "w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs shadow";
      circle.innerText = i;
    } else {
      // Future step
      indicator.className = "step-indicator flex items-center space-x-2 text-slate-400 font-medium";
      circle.className = "w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs";
      circle.innerText = i;
    }
  }
}

// Submit Order
function submitOrder() {
  const nameInput = document.getElementById('customer-name').value.trim();
  if (!nameInput) {
    alert('Por favor, informe o seu nome para podermos identificar seu pedido.');
    document.getElementById('customer-name').focus();
    return;
  }

  orderState.customer.name = nameInput;
  orderState.customer.phone = document.getElementById('customer-phone').value.trim();
  orderState.customer.payment = document.getElementById('payment-method').value;

  // Generate Random Order ID
  const randomOrderId = Math.floor(100 + Math.random() * 900);
  document.getElementById('order-id').innerText = randomOrderId;
  document.getElementById('success-customer-name').innerText = orderState.customer.name;

  // Hide Form steps and show success
  document.querySelectorAll('.step-content').forEach(sec => sec.classList.add('hidden'));
  document.getElementById('step-success').classList.remove('hidden');
}

// Reset App Form
function resetForm() {
  orderState = {
    step: 1,
    container: null,
    flavors: {},
    toppings: [],
    customer: { name: '', phone: '', payment: 'Pix' }
  };

  // Reset Inputs
  document.getElementById('customer-name').value = '';
  document.getElementById('customer-phone').value = '';
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);

  // Reset Container selection
  document.querySelectorAll('.container-option').forEach(card => {
    card.classList.remove('border-brand-pink', 'bg-pink-50/30', 'ring-2', 'ring-brand-pink');
  });

  // Reset Flavors UI
  resetFlavorUI();

  // Disable Step 1 button
  const nextBtn = document.getElementById('btn-step1-next');
  nextBtn.disabled = true;
  nextBtn.classList.add('bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
  nextBtn.classList.remove('bg-brand-pink', 'hover:bg-pink-600', 'text-white', 'shadow-md');

  // Hide Success Screen
  document.getElementById('step-success').classList.add('hidden');

  // Go to step 1
  goToStep(1);
  updateSummary();
}

