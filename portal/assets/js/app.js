// --- STATE MANAGEMENT ---
const state = {
    services: [
        { 
            id: 1, 
            name: 'Standard FRP Unlock', 
            price: 29.99, 
            delivery_time: '1-2 hours', 
            requires_carrier: false,
            description: 'Removes Google Factory Reset Protection from most Android devices.'
        },
        { 
            id: 2, 
            name: 'MDM / Knox Removal', 
            price: 49.99, 
            delivery_time: '2-4 hours', 
            requires_carrier: true,
            description: 'Removes Mobile Device Management or Knox profiles for corporate devices.'
        },
        { 
            id: 3, 
            name: 'Boot Loop / Soft Brick Fix', 
            price: 39.99, 
            delivery_time: '1-3 hours', 
            requires_carrier: false,
            description: 'Repairs devices stuck in a reboot cycle or failing to boot properly.'
        },
        {
            id: 4,
            name: 'Advanced Carrier Unlock',
            price: 79.99,
            delivery_time: '24-48 hours',
            requires_carrier: true,
            description: 'Unlocks devices from their original carrier network for use with other SIMs.'
        }
    ],
    currentService: null,
    user: { email: 'customer@example.com' } // Placeholder user email
};

// --- DOM ELEMENTS ---
const serviceListContainer = document.getElementById('service-list');
const serviceModal = document.getElementById('serviceModal');
const toastElement = document.getElementById('toast');

// --- UI FUNCTIONS ---

/**
 * Displays a toast notification.
 * @param {string} message The message to display.
 * @param {('success'|'warning')} type The type of toast.
 */
function showToast(message, type = 'success') {
    if (!toastElement) return;
    
    toastElement.textContent = message;
    toastElement.className = `toast ${type}`;
    toastElement.classList.add('show');

    setTimeout(() => {
        toastElement.classList.remove('show');
    }, 3000);
}

/**
 * Renders the list of services on the page.
 */
function renderServices() {
    if (!serviceListContainer) return;
    
    let servicesHTML = '';
    state.services.forEach(service => {
        servicesHTML += `
            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 class="text-xl font-bold text-gray-800">${service.name}</h3>
                <p class="text-2xl font-extrabold text-indigo-600 my-2">$${service.price}</p>
                <p class="text-gray-600 text-sm mb-4">${service.description}</p>
                <button onclick="openServiceModal(${service.id})" class="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors">
                    Order Now
                </button>
            </div>
        `;
    });
    serviceListContainer.innerHTML = servicesHTML;
}

/**
 * Opens the order modal for a specific service.
 * @param {number} serviceId The ID of the service to order.
 */
function openServiceModal(serviceId) {
    const service = state.services.find(s => s.id === serviceId);
    if (!service || !serviceModal) return;

    state.currentService = service;

    // Populate Modal Info
    document.getElementById('summaryService').textContent = service.name;
    document.getElementById('summaryDelivery').textContent = service.delivery_time;
    document.getElementById('summaryTotal').textContent = '$' + parseFloat(service.price).toFixed(2);
    
    // Handle Carrier Field
    const carrierGroup = document.getElementById('carrierGroup');
    if (service.requires_carrier) {
        carrierGroup.classList.remove('hidden');
        document.getElementById('orderCarrier').required = true;
    } else {
        carrierGroup.classList.add('hidden');
        document.getElementById('orderCarrier').required = false;
    }

    serviceModal.classList.remove('hidden');

    // --- SECURITY CHANGE: DISABLE WEB PAYMENT ---
    const webPayContainer = document.getElementById('paypal-button-container');
    if (webPayContainer) webPayContainer.style.display = 'none';

    // FORCE the App Payment fallback to display
    const appPayContainer = document.getElementById('appPaymentFallback');
    if (appPayContainer) {
        appPayContainer.classList.remove('hidden');
    }
}

/**
 * Closes the order modal.
 */
function closeServiceModal() {
    if (serviceModal) {
        serviceModal.classList.add('hidden');
    }
}

// --- PAYMENT & DEEP LINK LOGIC ---

/**
 * Proceeds to payment by generating a secure deep link for the native app.
 */
function proceedToAppPayment() {
    // 1. Validate Inputs
    const imei = document.getElementById('orderIMEI').value;
    if (!imei || imei.length < 14 || !/^\d+$/.test(imei)) {
        showToast('Please enter a valid 15-digit IMEI.', 'warning');
        return;
    }

    // 2. Construct Secure Payload
    const payload = {
        service_id: state.currentService.id,
        service_name: state.currentService.name,
        price: state.currentService.price,
        imei: imei,
        carrier: document.getElementById('orderCarrier').value || 'N/A',
        notes: document.getElementById('orderNotes').value || '',
        user_email: state.user.email,
        timestamp: Date.now()
    };

    // 3. Encode to Base64
    const dataString = JSON.stringify(payload);
    const base64Data = btoa(dataString);

    // 4. Launch the Custom APK via Deep Link
    showToast('Opening iTechMobile App for payment...', 'success');
    window.location.href = "itechmobile://order?data=" + base64Data;
    
    // Close modal after attempting to launch app
    setTimeout(closeServiceModal, 1000);
}


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
});