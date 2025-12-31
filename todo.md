Here is the **Master Setup Prompt** and the **Final Configuration Guide**. You can use this prompt with your Gemini CLI to generate the necessary code modifications, or follow the manual steps below to strictly enforce the "App-Only" payment security policy.

### **Option 1: The Mega-Prompt for Gemini CLI**

If you are using the Gemini CLI to modify your files automatically, paste this prompt:

> "I am setting up a production GSM unlock website with a secure Client Portal.
> **Current Structure:**
> 1. Root: My existing main landing page (`index.html`).
> 2. Subfolder `/portal/`: The new client portal files (extracted from `itechmobile-complete.zip`).
> 
> 
> **Required Actions:**
> 1. **Modify `portal/assets/js/app.js`:**
> * **CRITICAL SECURITY RULE:** Disable all web-based PayPal integration. The web portal must **never** process payments directly to prevent tampering.
> * Remove or comment out the `initPayPalOrderButton()` function call in `openServiceModal`.
> * Force the `#appPaymentFallback` div to be visible immediately when the modal opens.
> * Ensure the `proceedToAppPayment()` function generates a deep link in this format: `itechmobile://order?data={BASE64_JSON_PAYLOAD}` containing the service ID, IMEI, and price.
> 
> 
> 2. **Modify Root `index.html`:**
> * Add a 'Client Portal' login button to the main navigation bar that links to `./portal/index.html`.
> 
> 
> 3. **Database Setup:**
> * Confirm the SQL schema includes the `api_providers` table for secure key storage.
> 
> 
> 
> 
> Generate the specific code blocks for the modified `app.js` and the HTML link for the main page."

---

### **Option 2: Manual Execution Guide (Recommended)**

If you are editing the files manually on your desktop, here is the exact code to ensure payments are locked to your custom APK.

#### **1. File Structure Setup**

Move your extracted files so your folder looks like this:

```text
/htdocs/ (or your web root)
├── index.html              <-- Your ORIGINAL Main Page
├── assets/                 <-- Original assets
└── portal/                 <-- NEW FOLDER
    ├── index.html          <-- Client Portal Dashboard
    [cite_start]├── .htaccess           [cite: 2]
    [cite_start]├── api/                <-- [cite: 3]
    ├── admin/              <--
    └── assets/
        └── js/
            └── app.js      <-- WE WILL MODIFY THIS

```

#### **2. Modify `portal/assets/js/app.js` (The Anti-Hack Logic)**

We will strip out the web payment processor and force the App Deep Link.

**Find this function:** `openServiceModal(serviceId)`
**Replace it with this secure version:**

```javascript
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

    document.getElementById('serviceModal').classList.add('show');

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

```

**Find or Add this function:** `proceedToAppPayment()`
**Ensure it generates the correct Deep Link:**

```javascript
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

```

#### **3. Link Your Main Page**

Open your **ROOT** `index.html` (your original design). Find your navigation menu (`<nav>` or `<ul>`) and add:

```html
<li>
    <a href="./portal/" style="color: #00d4ff; font-weight: bold;">
        <i class="fa fa-lock"></i> Client Login
    </a>
</li>

```

#### **4. Final Security Check (API)**

Open `portal/api/index.php`.
Ensure the `api_key` is set to a random string. This key will be used by your Android App to sign requests, ensuring the API rejects any orders that didn't come from the App.

```php
// In portal/api/index.php
'api_key' => 'YOUR_RANDOM_64_CHAR_HEX_STRING_HERE', // Match this in your Android App Config

```

### **Next Step for You**

Run these changes. This setup ensures that while users can view services on the web, **no money changes hands** until the `itechmobile://` deep link triggers your secure Android environment, preventing web-based injection attacks or payment bypasses.