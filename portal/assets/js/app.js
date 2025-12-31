// State management
const state = {
    services: [
        { id: 1, name: 'Test Service', price: 10.00, delivery_time: '24 hours', requires_carrier: 1 }
    ],
    currentService: null,
    user: { email: 'test@example.com' }
};

// Toast notification placeholder
function showToast(message, type) {
    console.log(`[${type}] ${message}`);
}

function openServiceModal(serviceId) {
    const service = state.services.find(s => s.id == serviceId);
    if (!service) return;

    state.currentService = service;

    // Populate Modal Info
    document.getElementById('orderServiceId').value = service.id;
    document.getElementById('orderServiceName').value = service.name;
    document.getElementById('summaryService').textContent = service.name;
    document.getElementById('summaryDelivery').textContent = service.delivery_time;
    document.getElementById('summaryTotal').textContent = '$' + parseFloat(service.price).toFixed(2);
    
    // Handle Carrier Field
    const carrierGroup = document.getElementById('carrierGroup');
    if (service.requires_carrier == 1) {
        carrierGroup.classList.remove('hidden');
        document.getElementById('orderCarrier').required = true;
    } else {
        carrierGroup.classList.add('hidden');
        document.getElementById('orderCarrier').required = false;
    }

    document.getElementById('serviceModal').classList.remove('hidden');

    // --- SECURITY CHANGE: DISABLE WEB PAYMENT ---
    // Hide the web-based PayPal container
    const webPayContainer = document.getElementById('paypal-button-container');
    if(webPayContainer) webPayContainer.style.display = 'none';

    // FORCE the App Payment fallback to display
    const appPayContainer = document.getElementById('appPaymentFallback');
    if(appPayContainer) {
        appPayContainer.style.display = 'block';
        appPayContainer.classList.remove('hidden'); // Ensure hidden class is gone
    }
    // ---------------------------------------------
}

function proceedToAppPayment() {
    // 1. Validate Inputs
    const imei = document.getElementById('orderIMEI').value;
    if (!imei || imei.length < 8) {
        showToast('Please enter a valid IMEI', 'warning');
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
        user_email: state.user.email, // Pass user email for verification
        timestamp: Date.now()
    };

    // 3. Encode to Base64 (Basic obfuscation for the link)
    const dataString = JSON.stringify(payload);
    const base64Data = btoa(dataString);

    // 4. Launch the Custom APK
    // This will open your app if installed, or do nothing if not.
    window.location.href = "itechmobile://order?data=" + base64Data;
    
    // Optional: Show a message after clicking
    setTimeout(() => {
        showToast('Opening iTechMobile App...', 'success');
    }, 500);
}
