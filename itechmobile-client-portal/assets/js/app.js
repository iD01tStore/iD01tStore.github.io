/**
 * iTechMobile - Client Portal Logic
 * Connected to PHP API Backend
 */

// ============================================
// CONFIGURATION & STATE
// ============================================
const CONFIG = {
    API_URL: '/api', // Relative path handled by .htaccess
    // REPLACE THIS WITH YOUR REAL GOOGLE CLIENT ID
    GOOGLE_CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', 
};

const state = {
    user: null,
    token: localStorage.getItem('auth_token'),
    services: [],
    orders: [],
    currentService: null
};

// ============================================
// API HELPER
// ============================================
async function apiCall(endpoint, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if (state.token) {
        headers['Authorization'] = `Bearer ${state.token}`;
    }

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(`${CONFIG.API_URL}${endpoint}`, options);
        
        if (response.status === 401) {
            handleLogout();
            throw new Error('Session expired');
        }

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'API Request Failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        showToast(error.message, 'danger');
        throw error;
    }
}

// ============================================
// AUTHENTICATION
// ============================================
function initGoogleAuth() {
    if (window.google) {
        google.accounts.id.initialize({
            client_id: CONFIG.GOOGLE_CLIENT_ID,
            callback: handleGoogleLoginResponse
        });
        
        const btnContainer = document.getElementById('googleSignInBtn');
        if (btnContainer) {
            google.accounts.id.renderButton(btnContainer, { 
                theme: 'outline', 
                size: 'large',
                width: 300 
            });
        }
    }
}

async function handleGoogleLoginResponse(response) {
    showLoading(true, 'Signing in...');
    try {
        const data = await apiCall('/auth/google', 'POST', { 
            credential: response.credential 
        });

        if (data.success && data.token) {
            localStorage.setItem('auth_token', data.token);
            state.token = data.token;
            state.user = data.user;
            showToast('Login successful!', 'success');
            initApp();
        }
    } catch (error) {
        showToast('Login failed: ' + error.message, 'danger');
    } finally {
        showLoading(false);
    }
}

function handleLogout() {
    localStorage.removeItem('auth_token');
    state.token = null;
    state.user = null;
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}

// ============================================
// APP INITIALIZATION
// ============================================
async function initApp() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    
    showLoading(true, 'Loading profile...');

    try {
        const profileData = await apiCall('/user/profile');
        state.user = profileData.user;
        updateUserUI(profileData);

        const servicesData = await apiCall('/services');
        state.services = servicesData.services;
        renderServices(state.services);
        renderQuickServices();

        const ordersData = await apiCall('/orders');
        state.orders = ordersData.orders;
        renderOrders(state.orders);
        renderRecentOrders();

        // If user is admin, show admin link (optional)
        // if (state.user.role === 'admin') ... 

        navigateTo('dashboard');
    } catch (error) {
        console.error('Init Error:', error);
    } finally {
        showLoading(false);
    }
}

// ============================================
// UI RENDERING
// ============================================
function updateUserUI(data) {
    const user = data.user;
    const stats = data.stats;

    // Header & Dropdown
    const userName = user.name ? user.name.split(' ')[0] : 'User';
    document.getElementById('headerUserName').textContent = userName;
    document.getElementById('headerUserPhoto').src = user.photo || 'https://via.placeholder.com/32';
    document.getElementById('dropdownUserName').textContent = user.name;
    document.getElementById('dropdownUserEmail').textContent = user.email;
    document.getElementById('headerBalance').textContent = parseFloat(user.balance).toFixed(2);

    // Dashboard Stats
    document.getElementById('welcomeName').textContent = userName;
    document.getElementById('statTotalOrders').textContent = stats.total || 0;
    document.getElementById('statCompleted').textContent = stats.completed || 0;
    document.getElementById('statPending').textContent = stats.pending || 0;
    document.getElementById('statBalance').textContent = parseFloat(user.balance).toFixed(2);
    
    // Add Funds Page
    document.getElementById('addFundsBalance').textContent = parseFloat(user.balance).toFixed(2);

    // Profile Page
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmailDisplay').textContent = user.email;
    document.getElementById('profilePhoto').src = user.photo || 'https://via.placeholder.com/80';
    document.getElementById('profileEmail').value = user.email;
    document.getElementById('profileCreated').value = new Date(user.created_at).toLocaleDateString();
    document.getElementById('profileBalanceInput').value = '$' + parseFloat(user.balance).toFixed(2);
    document.getElementById('profileTotalOrders').value = stats.total || 0;
}

function renderServices(services) {
    const grid = document.getElementById('allServicesGrid');
    if (!grid) return;
    
    grid.innerHTML = services.map(service => `
        <div class="service-card" onclick="openServiceModal(${service.id})">
            <div class="service-icon" style="color: ${service.color}">
                <i class="${service.icon}"></i>
            </div>
            <div class="service-info">
                <h3>${service.name}</h3>
                <p>${service.description.substring(0, 60)}...</p>
                <div class="service-meta">
                    <span class="price">$${parseFloat(service.price).toFixed(2)}</span>
                    <span class="time"><i class="fas fa-clock"></i> ${service.delivery_time}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderQuickServices() {
    const grid = document.getElementById('quickServicesGrid');
    if (!grid) return;
    const topServices = state.services.slice(0, 4);
    
    grid.innerHTML = topServices.map(service => `
        <div class="service-card compact" onclick="openServiceModal(${service.id})">
            <div class="service-icon" style="color: ${service.color}">
                <i class="${service.icon}"></i>
            </div>
            <div class="service-info">
                <h3>${service.name}</h3>
                <span class="price">$${parseFloat(service.price).toFixed(2)}</span>
            </div>
        </div>
    `).join('');
}

function renderOrders(orders) {
    const tbody = document.getElementById('allOrdersBody');
    if (!tbody) return;

    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="table-empty"><i class="fas fa-inbox"></i><p>No orders found</p></td></tr>`;
        return;
    }

    tbody.innerHTML = orders.map(order => `
        <tr>
            <td><span class="badge badge-gray">${order.order_id}</span></td>
            <td>${order.service_name}</td>
            <td>${order.imei}</td>
            <td><span class="badge badge-${getStatusColor(order.status)}">${capitalize(order.status)}</span></td>
            <td>${order.result || '-'}</td>
            <td>${new Date(order.created_at).toLocaleDateString()}</td>
            <td>$${parseFloat(order.amount).toFixed(2)}</td>
        </tr>
    `).join('');
}

function renderRecentOrders() {
    const tbody = document.getElementById('recentOrdersBody');
    if (!tbody) return;
    const recent = state.orders.slice(0, 5);
    
    if (recent.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="table-empty"><i class="fas fa-inbox"></i><p>No orders yet</p></td></tr>`;
        return;
    }

    tbody.innerHTML = recent.map(order => `
        <tr>
            <td><span class="badge badge-gray">${order.order_id}</span></td>
            <td>${order.service_name}</td>
            <td>${order.imei}</td>
            <td><span class="badge badge-${getStatusColor(order.status)}">${capitalize(order.status)}</span></td>
            <td>${new Date(order.created_at).toLocaleDateString()}</td>
            <td>$${parseFloat(order.amount).toFixed(2)}</td>
        </tr>
    `).join('');
}

// ============================================
// SERVICE & ORDER LOGIC
// ============================================
function openServiceModal(serviceId) {
    const service = state.services.find(s => s.id == serviceId);
    if (!service) return;

    state.currentService = service;

    document.getElementById('orderServiceId').value = service.id;
    document.getElementById('orderServiceName').value = service.name;
    document.getElementById('summaryService').textContent = service.name;
    document.getElementById('summaryDelivery').textContent = service.delivery_time;
    document.getElementById('summaryTotal').textContent = '$' + parseFloat(service.price).toFixed(2);
    
    const carrierGroup = document.getElementById('carrierGroup');
    if (service.requires_carrier == 1) {
        carrierGroup.classList.remove('hidden');
        document.getElementById('orderCarrier').required = true;
    } else {
        carrierGroup.classList.add('hidden');
        document.getElementById('orderCarrier').required = false;
    }

    document.getElementById('serviceModal').classList.add('show');
    initPayPalOrderButton(service.price);
}

function closeServiceModal() {
    document.getElementById('serviceModal').classList.remove('show');
    state.currentService = null;
    document.getElementById('orderForm').reset();
    const container = document.getElementById('paypal-button-container');
    if (container) container.innerHTML = '';
}

function initPayPalOrderButton(amount) {
    const container = document.getElementById('paypal-button-container');
    if (!container) return; 
    container.innerHTML = '';

    paypal.Buttons({
        createOrder: async (data, actions) => {
            const res = await apiCall('/paypal/create-order', 'POST', {
                amount: amount,
                description: state.currentService.name
            });
            return res.order_id;
        },
        onApprove: async (data, actions) => {
            showLoading(true, 'Processing Payment...');
            try {
                const captureRes = await apiCall('/paypal/capture-order', 'POST', {
                    order_id: data.orderID
                });
                if (captureRes.success) {
                    await submitOrder(data.orderID);
                }
            } catch (error) {
                showToast('Payment failed: ' + error.message, 'danger');
            } finally {
                showLoading(false);
            }
        },
        onError: (err) => {
            showToast('PayPal Error: ' + err, 'danger');
        }
    }).render('#paypal-button-container');
}

async function submitOrder(paypalOrderId) {
    const orderData = {
        service_id: state.currentService.id,
        imei: document.getElementById('orderIMEI').value,
        carrier: document.getElementById('orderCarrier').value,
        notes: document.getElementById('orderNotes').value,
        paypal_order_id: paypalOrderId
    };

    try {
        const res = await apiCall('/orders', 'POST', orderData);
        if (res.success) {
            showToast(`Order Placed! ID: ${res.order_id}`, 'success');
            closeServiceModal();
            initApp(); // Refresh data
        }
    } catch (error) {
        showToast('Order creation failed: ' + error.message, 'danger');
    }
}

// ============================================
// OTHER ACTIONS
// ============================================
async function checkIMEI(e) {
    e.preventDefault();
    const imei = document.getElementById('imeiCheckInput').value;
    if (imei.length < 8) {
        showToast('Invalid IMEI', 'warning');
        return;
    }
    showLoading(true);
    const resultDiv = document.getElementById('imeiCheckResult');
    try {
        const data = await apiCall('/imei/check', 'POST', { imei: imei });
        const info = data.result.device;
        resultDiv.innerHTML = `
            <div class="result-row"><span class="label">Model:</span><span class="value">${info.model}</span></div>
            <div class="result-row"><span class="label">Brand:</span><span class="value">${info.brand}</span></div>
            <div class="result-row"><span class="label">Color:</span><span class="value">${info.color}</span></div>
            <div class="result-row"><span class="label">Storage:</span><span class="value">${info.storage}</span></div>
            <div class="mt-20 text-center" style="margin-top:15px; font-size:12px; color:#6c757d">
                ${data.result.note}
            </div>
        `;
        resultDiv.classList.remove('hidden');
    } catch (error) {
        showToast(error.message, 'danger');
    } finally {
        showLoading(false);
    }
}

function filterServicesByCategory(category) {
    document.querySelectorAll('.category-tab').forEach(b => b.classList.remove('active'));
    document.querySelector(`button[data-category="${category}"]`).classList.add('active');
    if (category === 'all') {
        renderServices(state.services);
    } else {
        const filtered = state.services.filter(s => s.category === category);
        renderServices(filtered);
    }
}

// ============================================
// UTILITIES
// ============================================
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById('page-' + pageId).classList.remove('hidden');
    document.querySelectorAll('.nav-menu a').forEach(a => {
        a.classList.remove('active');
        if(a.dataset.page === pageId) a.classList.add('active');
    });
    document.getElementById('navMenu').classList.remove('active');
}

function showLoading(show, text = 'Loading...') {
    const el = document.getElementById('loadingOverlay');
    document.getElementById('loadingText').textContent = text;
    if (show) el.classList.add('active');
    else el.classList.remove('active');
}

function showToast(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fas fa-info-circle"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function getStatusColor(status) {
    const map = { 'pending': 'warning', 'processing': 'info', 'completed': 'success', 'failed': 'danger', 'refunded': 'primary' };
    return map[status] || 'gray';
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function toggleUserDropdown() {
    document.getElementById('userDropdown').classList.toggle('active');
}

function toggleMobileMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

function downloadApp() {
    // Link to your APK
    window.location.href = '/app-release.apk';
}

// ============================================
// BOOTSTRAP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('auth_token')) {
        initApp();
    } else {
        initGoogleAuth();
    }
    document.getElementById('imeiCheckForm')?.addEventListener('submit', checkIMEI);
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-dropdown')) {
            document.getElementById('userDropdown')?.classList.remove('active');
        }
    });
});
