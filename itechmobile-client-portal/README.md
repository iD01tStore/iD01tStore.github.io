# iTechMobile - Complete GSM Unlock Store

## 🚀 Production-Ready Architecture

```
itechmobile-client-portal/
├── index.html              # Single-page application (SPA)
├── .htaccess              # Apache routing & security
├── assets/
│   ├── css/
│   │   └── style.css      # Complete stylesheet (Dhru Fusion style)
│   └── js/
│       └── app.js         # Full API integration (800+ lines)
├── api/
│   └── index.php          # RESTful PHP API
├── admin/
│   └── index.html         # Admin panel
└── database/
    └── schema.sql         # MySQL schema with services
```

---

## ✅ Frontend-Backend Integration

**FULLY CONNECTED** - No more simulation mode!

| Feature | Frontend (app.js) | Backend (api/index.php) |
|---------|-------------------|------------------------|
| Google Login | `handleGoogleCallback()` → `api.googleAuth()` | `/api/auth/google` |
| Token Verify | `checkAuthState()` → `api.verifyToken()` | `/api/auth/verify` |
| Get Profile | `loadDashboardData()` → `api.getProfile()` | `/api/user/profile` |
| List Services | `loadServices()` → `api.getServices()` | `/api/services` |
| Get Orders | `loadOrders()` → `api.getOrders()` | `/api/orders` |
| Create Order | `proceedToAppPayment()` | Mobile app → `/api/orders` |
| IMEI Check | `performIMEICheck()` → `api.checkIMEI()` | `/api/imei/check` |

---

## 🔒 Payment Security Architecture

**Web Portal → Mobile App → PayPal → API**

Why payments through the mobile app?
1. **Native PayPal SDK** - More secure than JavaScript SDK
2. **Certificate Pinning** - Prevents MITM attacks
3. **Device Verification** - Confirms legitimate device
4. **No API Keys Exposed** - Keys stay server-side

Flow:
```
User selects service
    ↓
Clicks "Pay with iTechMobile App"
    ↓
Deep link: itechmobile://order?data={base64_encoded_order}
    ↓
Android app opens PayPal native payment
    ↓
On success: App calls POST /api/orders with PayPal transaction ID
    ↓
Server verifies PayPal payment and creates order
```

---

## 🛠 Installation

### Step 1: Upload Files
```bash
# Upload via FTP/SFTP to your web root
public_html/
├── index.html
├── .htaccess
├── assets/
├── api/
├── admin/
```

### Step 2: Create Database
```bash
# Via SSH
mysql -u root -p

CREATE DATABASE itechmobile_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'itechmobile'@'localhost' IDENTIFIED BY 'YOUR_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON itechmobile_db.* TO 'itechmobile'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Import schema
mysql -u itechmobile -p itechmobile_db < database/schema.sql
```

### Step 3: Configure API

Edit `api/index.php`:

```php
$config = [
    'db' => [
        'host' => 'localhost',
        'name' => 'itechmobile_db',
        'user' => 'itechmobile',           // Your DB user
        'pass' => 'YOUR_STRONG_PASSWORD'   // Your DB password
    ],
    'google' => [
        'client_id' => 'xxx.apps.googleusercontent.com',  // From Google Cloud
    ],
    'paypal' => [
        'mode' => 'live'  // Change from 'sandbox' to 'live'
    ],
    'api_key' => 'GENERATE_64_CHAR_HEX'  // Run: php -r "echo bin2hex(random_bytes(32));"
];
```

### Step 4: Configure Frontend

Edit `assets/js/app.js`:

```javascript
const CONFIG = {
    API_BASE_URL: '/api',
    GOOGLE_CLIENT_ID: 'xxx.apps.googleusercontent.com',  // From Google Cloud
    APP_DOWNLOAD_URL: 'https://itechmobile.site/download/itechmobile.apk',
};
```

### Step 5: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project "iTechMobile"
3. APIs & Services → Credentials → Create OAuth 2.0 Client ID
4. Application type: Web application
5. Authorized JavaScript origins:
   - `https://itechmobile.site`
   - `http://localhost:8080` (for testing)
6. Copy Client ID to both `api/index.php` and `assets/js/app.js`

### Step 6: PayPal Setup

1. Go to [PayPal Developer](https://developer.paypal.com)
2. Create REST API app
3. Copy Client ID and Secret to `api/index.php`
4. Payments go to: `itechinfomtl@gmail.com`

---

## 📱 Mobile App Integration

The Android APK (from previous session) handles:
- Secure PayPal payments via native SDK
- Deep link handling: `itechmobile://`
- Push notifications for order updates
- Certificate pinning for API calls

**Deep Link Format:**
```
itechmobile://order?data=BASE64_JSON

JSON structure:
{
    "service_id": 1,
    "service_name": "iCloud Bypass",
    "price": 29.99,
    "imei": "353456789012345",
    "carrier": "att",
    "notes": "Customer notes",
    "user_email": "user@email.com",
    "timestamp": 1704067200000
}
```

---

## 🔐 Security Checklist

- [ ] Generate new API secret key: `php -r "echo bin2hex(random_bytes(32));"`
- [ ] Change default database password
- [ ] Enable HTTPS (required for Google Sign-In)
- [ ] Set up SSL certificate (Let's Encrypt)
- [ ] Configure .htaccess security headers
- [ ] Protect `/admin/` with additional authentication
- [ ] Set proper file permissions:
  ```bash
  find . -type f -exec chmod 644 {} \;
  find . -type d -exec chmod 755 {} \;
  chmod 600 api/index.php  # Restrict API config
  ```
- [ ] Enable PayPal live mode
- [ ] Set up PayPal IPN webhook
- [ ] Configure rate limiting (Redis for production)
- [ ] Set up error logging
- [ ] Enable CORS for specific domains only

---

## 📊 API Endpoints Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/google` | Google OAuth login |
| GET | `/api/auth/verify` | Verify JWT token |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get user profile & stats |
| GET | `/api/user/balance` | Get current balance |

### Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | List all services |
| GET | `/api/services?category=apple` | Filter by category |
| GET | `/api/services/{id}` | Get single service |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | List user's orders |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/{id}` | Get order details |

### PayPal (used by mobile app)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/paypal/create-order` | Create PayPal order |
| POST | `/api/paypal/capture-order` | Capture payment |
| POST | `/api/paypal/webhook` | IPN webhook |

### IMEI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/imei/check` | Check IMEI/Serial |

---

## 🎨 Customization

### Change Branding
Edit `assets/css/style.css`:
```css
:root {
    --primary: #1e88e5;      /* Your brand color */
    --primary-dark: #1565c0;
}
```

### Add Services
```sql
INSERT INTO services (name, slug, category, description, price, delivery_time, icon, color, active, created_at)
VALUES ('New Service Name', 'new-service-slug', 'apple', 'Description here', 49.99, '1-3 days', 'fas fa-unlock', '#1e88e5', 1, NOW());
```

### Change PayPal Email
Search and replace `itechinfomtl@gmail.com` in:
- `api/index.php`
- `assets/js/app.js`
- Mobile app source code

---

## 📞 Support

- Email: itechinfomtl@gmail.com
- Website: https://itechmobile.site

---

## Files Summary

| File | Purpose |
|------|---------|
| `index.html` | SPA HTML structure |
| `assets/css/style.css` | Complete Dhru-style CSS |
| `assets/js/app.js` | Full API integration JS |
| `api/index.php` | RESTful PHP backend |
| `database/schema.sql` | MySQL schema + 15 services |
| `admin/index.html` | Admin order management |
| `.htaccess` | Apache routing & security |

**Lightweight and fast!**
