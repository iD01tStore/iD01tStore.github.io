<?php
/**
 * iTechMobile - Backend API
 * Complete GSM Unlock Store with External API Integration
 * Currency: CAD
 */

// ============================================
// CONFIGURATION
// ============================================
// SECURITY: Generate new secrets with: bin2hex(random_bytes(32))
$config = [
    'db' => [
        'host' => getenv('DB_HOST') ?: 'localhost',
        'name' => getenv('DB_NAME') ?: 'itechmobile_db',
        'user' => getenv('DB_USER') ?: 'your_db_user',
        'pass' => getenv('DB_PASS') ?: 'your_db_password'
    ],
    'google' => [
        'client_id' => getenv('GOOGLE_CLIENT_ID') ?: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
        'client_secret' => getenv('GOOGLE_CLIENT_SECRET') ?: 'YOUR_GOOGLE_CLIENT_SECRET'
    ],
    'paypal' => [
        'client_id' => getenv('PAYPAL_CLIENT_ID') ?: 'YOUR_PAYPAL_CLIENT_ID',
        'client_secret' => getenv('PAYPAL_CLIENT_SECRET') ?: 'YOUR_PAYPAL_CLIENT_SECRET',
        'email' => 'itechinfomtl@gmail.com',
        'mode' => getenv('PAYPAL_MODE') ?: 'sandbox' // 'live' for production
    ],
    'site_url' => getenv('SITE_URL') ?: 'https://itechmobile.site',
    'currency' => 'CAD',
    // CRITICAL: Change this to a random 64-character hex string for production
    'api_key' => getenv('API_SECRET_KEY') ?: 'CHANGE_THIS_TO_RANDOM_64_CHAR_HEX_STRING_FOR_PRODUCTION',
    
    // EXTERNAL API PROVIDERS (Keys encrypted - stored in DB in production)
    // DO NOT hardcode real keys here - use environment variables or encrypted DB storage
    'external_apis' => [
        'iphoneunlockingstore' => [
            'url' => 'https://iphoneunlockingstore.com/api/',
            'key' => getenv('IPHONEUNLOCK_API_KEY') ?: '', // Set via env or DB
            'secret' => getenv('IPHONEUNLOCK_API_SECRET') ?: '',
            'enabled' => true
        ]
    ]
];

// ============================================
// EXTERNAL API CLIENT CLASS (Hidden from frontend)
// ============================================
class ExternalAPIClient {
    private $config;
    private $db;
    
    public function __construct($config, $db) {
        $this->config = $config;
        $this->db = $db;
    }
    
    /**
     * Get API credentials from database (more secure than config file)
     */
    private function getAPICredentials($providerSlug) {
        // First check environment variables
        $envKey = strtoupper(str_replace('-', '_', $providerSlug)) . '_API_KEY';
        $envSecret = strtoupper(str_replace('-', '_', $providerSlug)) . '_API_SECRET';
        
        if (getenv($envKey) && getenv($envSecret)) {
            return [
                'key' => getenv($envKey),
                'secret' => getenv($envSecret)
            ];
        }
        
        // Then check database
        $provider = $this->db->fetch(
            "SELECT api_key, api_secret FROM api_providers WHERE slug = ? AND active = 1",
            [$providerSlug]
        );
        
        if ($provider && $provider['api_key']) {
            // In production, decrypt these values
            return [
                'key' => $this->decrypt($provider['api_key']),
                'secret' => $this->decrypt($provider['api_secret'])
            ];
        }
        
        return null;
    }
    
    /**
     * Decrypt API credentials (implement proper encryption in production)
     */
    private function decrypt($encryptedValue) {
        // In production, use proper encryption like:
        // return openssl_decrypt($encryptedValue, 'aes-256-cbc', $this->config['api_key'], 0, $iv);
        return $encryptedValue; // Placeholder - implement encryption
    }
    
    /**
     * Submit order to iPhoneUnlockingStore API
     */
    public function submitToIPhoneUnlockingStore($serviceId, $imei, $carrier = null) {
        $credentials = $this->getAPICredentials('iphoneunlockingstore');
        
        if (!$credentials) {
            return ['success' => false, 'error' => 'API not configured'];
        }
        
        $url = 'https://iphoneunlockingstore.com/api/';
        
        $postData = [
            'api_key' => $credentials['key'],
            'action' => 'place_order',
            'service_id' => $serviceId,
            'imei' => $imei
        ];
        
        if ($carrier) {
            $postData['carrier'] = $carrier;
        }
        
        // Add signature for security
        $postData['signature'] = hash_hmac('sha256', json_encode($postData), $credentials['secret']);
        
        $response = $this->makeSecureRequest($url, $postData);
        
        return $response;
    }
    
    /**
     * Check order status on external API
     */
    public function checkOrderStatus($apiOrderId) {
        $credentials = $this->getAPICredentials('iphoneunlockingstore');
        
        if (!$credentials) {
            return ['success' => false, 'error' => 'API not configured'];
        }
        
        $url = 'https://iphoneunlockingstore.com/api/';
        
        $postData = [
            'api_key' => $credentials['key'],
            'action' => 'check_order',
            'order_id' => $apiOrderId
        ];
        
        return $this->makeSecureRequest($url, $postData);
    }
    
    /**
     * Check IMEI info via external API
     */
    public function checkIMEI($imei, $serviceType = 'gsx') {
        $credentials = $this->getAPICredentials('iphoneunlockingstore');
        
        if (!$credentials) {
            // Return mock data if API not configured
            return $this->getMockIMEIData($imei);
        }
        
        $url = 'https://iphoneunlockingstore.com/api/';
        
        $postData = [
            'api_key' => $credentials['key'],
            'action' => 'check_imei',
            'imei' => $imei,
            'type' => $serviceType
        ];
        
        $response = $this->makeSecureRequest($url, $postData);
        
        if (!$response['success']) {
            return $this->getMockIMEIData($imei);
        }
        
        return $response;
    }
    
    /**
     * Make secure HTTP request to external API
     */
    private function makeSecureRequest($url, $data) {
        $ch = curl_init();
        
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query($data),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/x-www-form-urlencoded',
                'User-Agent: iTechMobile/1.0'
            ]
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        
        if ($error) {
            // Log error securely (never expose to frontend)
            error_log("External API Error: " . $error);
            return ['success' => false, 'error' => 'Service temporarily unavailable'];
        }
        
        $decoded = json_decode($response, true);
        
        if (!$decoded) {
            return ['success' => false, 'error' => 'Invalid API response'];
        }
        
        return $decoded;
    }
    
    /**
     * Mock IMEI data for demo/testing
     */
    private function getMockIMEIData($imei) {
        $models = ['iPhone 15 Pro Max', 'iPhone 14 Pro', 'iPhone 13', 'Samsung Galaxy S24', 'Google Pixel 8'];
        $colors = ['Space Black', 'Silver', 'Gold', 'Deep Purple', 'Blue Titanium'];
        $storages = ['128GB', '256GB', '512GB', '1TB'];
        
        $hash = crc32($imei);
        
        return [
            'success' => true,
            'imei' => $imei,
            'device' => [
                'model' => $models[$hash % count($models)],
                'brand' => substr($imei, 0, 2) === '35' ? 'Apple' : 'Samsung',
                'color' => $colors[$hash % count($colors)],
                'storage' => $storages[$hash % count($storages)]
            ],
            'note' => 'For complete GSX report (carrier, iCloud, blacklist), purchase our Full IMEI Check service.',
            'demo' => true
        ];
    }
}

// Rate limiting (FILE-BASED - works across requests)
function checkRateLimit($identifier, $maxRequests = 60, $windowSeconds = 60) {
    $dir = sys_get_temp_dir() . '/itechmobile_ratelimit';
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
    
    $file = $dir . '/' . md5($identifier) . '.json';
    $now = time();
    
    // Read existing data
    $data = null;
    if (file_exists($file)) {
        $content = file_get_contents($file);
        $data = json_decode($content, true);
    }
    
    // Reset if window expired or no data
    if (!$data || $now > $data['reset']) {
        $data = ['count' => 1, 'reset' => $now + $windowSeconds];
    } else {
        $data['count']++;
    }
    
    // Check limit
    if ($data['count'] > $maxRequests) {
        http_response_code(429);
        header('Retry-After: ' . ($data['reset'] - $now));
        echo json_encode(['error' => 'Too many requests. Please try again in ' . ($data['reset'] - $now) . ' seconds.']);
        exit;
    }
    
    // Save updated count
    file_put_contents($file, json_encode($data), LOCK_EX);
    
    // Cleanup old files (every 100 requests approximately)
    if (rand(1, 100) === 1) {
        cleanupRateLimitFiles($dir, $windowSeconds * 2);
    }
}

// Cleanup expired rate limit files
function cleanupRateLimitFiles($dir, $maxAge) {
    $files = glob($dir . '/*.json');
    $now = time();
    foreach ($files as $file) {
        if ($now - filemtime($file) > $maxAge) {
            @unlink($file);
        }
    }
}

// ============================================
// HEADERS
// ============================================
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// ============================================
// DATABASE CONNECTION
// ============================================
class Database {
    private $pdo;
    
    public function __construct($config) {
        try {
            $dsn = "mysql:host={$config['host']};dbname={$config['name']};charset=utf8mb4";
            $this->pdo = new PDO($dsn, $config['user'], $config['pass'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
        } catch (PDOException $e) {
            die(json_encode(['error' => 'Database connection failed']));
        }
    }
    
    public function query($sql, $params = []) {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }
    
    public function fetch($sql, $params = []) {
        return $this->query($sql, $params)->fetch();
    }
    
    public function fetchAll($sql, $params = []) {
        return $this->query($sql, $params)->fetchAll();
    }
    
    public function insert($table, $data) {
        $keys = array_keys($data);
        $fields = implode(', ', $keys);
        $placeholders = ':' . implode(', :', $keys);
        $sql = "INSERT INTO {$table} ({$fields}) VALUES ({$placeholders})";
        $this->query($sql, $data);
        return $this->pdo->lastInsertId();
    }
    
    public function update($table, $data, $where, $whereParams = []) {
        $set = [];
        foreach ($data as $key => $value) {
            $set[] = "{$key} = :{$key}";
        }
        $sql = "UPDATE {$table} SET " . implode(', ', $set) . " WHERE {$where}";
        $this->query($sql, array_merge($data, $whereParams));
    }
}

// ============================================
// API ROUTER
// ============================================
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true) ?? [];

// Initialize database
$db = new Database($config['db']);

// Route handling
switch (true) {
    // Auth routes
    case preg_match('#^/api/auth/google$#', $uri) && $method === 'POST':
        handleGoogleAuth($db, $config, $input);
        break;
    
    case preg_match('#^/api/auth/verify$#', $uri) && $method === 'GET':
        verifyToken($db);
        break;
    
    // User routes
    case preg_match('#^/api/user/profile$#', $uri) && $method === 'GET':
        getUserProfile($db);
        break;
    
    case preg_match('#^/api/user/balance$#', $uri) && $method === 'GET':
        getUserBalance($db);
        break;
    
    // Services routes
    case preg_match('#^/api/services$#', $uri) && $method === 'GET':
        getServices($db);
        break;
    
    case preg_match('#^/api/services/(\d+)$#', $uri, $matches) && $method === 'GET':
        getService($db, $matches[1]);
        break;
    
    // Orders routes
    case preg_match('#^/api/orders$#', $uri) && $method === 'GET':
        getOrders($db);
        break;
    
    case preg_match('#^/api/orders$#', $uri) && $method === 'POST':
        createOrder($db, $config, $input);
        break;
    
    case preg_match('#^/api/orders/(\d+)$#', $uri, $matches) && $method === 'GET':
        getOrder($db, $matches[1]);
        break;
    
    // PayPal routes
    case preg_match('#^/api/paypal/create-order$#', $uri) && $method === 'POST':
        createPayPalOrder($db, $config, $input);
        break;
    
    case preg_match('#^/api/paypal/capture-order$#', $uri) && $method === 'POST':
        capturePayPalOrder($db, $config, $input);
        break;
    
    case preg_match('#^/api/paypal/webhook$#', $uri) && $method === 'POST':
        handlePayPalWebhook($db, $config, $input);
        break;
    
    // IMEI Check
    case preg_match('#^/api/imei/check$#', $uri) && $method === 'POST':
        checkIMEI($db, $input);
        break;
    
    // ============================================
    // ADMIN ROUTES (require admin role)
    // ============================================
    case preg_match('#^/api/admin/orders$#', $uri) && $method === 'GET':
        requireAuth($db, $config);
        getAdminOrders($db);
        break;
    
    case preg_match('#^/api/admin/orders/(\d+)$#', $uri, $matches) && $method === 'PUT':
        requireAuth($db, $config);
        updateAdminOrder($db, $matches[1], $input);
        break;
    
    case preg_match('#^/api/admin/users$#', $uri) && $method === 'GET':
        requireAuth($db, $config);
        getAdminUsers($db);
        break;
    
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
}

// ============================================
// AUTH FUNCTIONS
// ============================================
function handleGoogleAuth($db, $config, $input) {
    $idToken = $input['credential'] ?? '';
    
    if (empty($idToken)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing credential']);
        return;
    }
    
    // Verify Google token
    $googleUser = verifyGoogleToken($idToken, $config['google']['client_id']);
    
    if (!$googleUser) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid Google token']);
        return;
    }
    
    // Check if user exists
    $user = $db->fetch("SELECT * FROM users WHERE google_id = ?", [$googleUser['sub']]);
    
    if (!$user) {
        // Create new user
        $userId = $db->insert('users', [
            'google_id' => $googleUser['sub'],
            'email' => $googleUser['email'],
            'name' => $googleUser['name'],
            'photo' => $googleUser['picture'] ?? '',
            'balance' => 0,
            'created_at' => date('Y-m-d H:i:s')
        ]);
        
        $user = $db->fetch("SELECT * FROM users WHERE id = ?", [$userId]);
    }
    
    // Generate JWT token
    $token = generateJWT($user, $config['api_key']);
    
    echo json_encode([
        'success' => true,
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['name'],
            'photo' => $user['photo'],
            'balance' => floatval($user['balance'])
        ]
    ]);
}

function verifyGoogleToken($idToken, $clientId) {
    $url = "https://oauth2.googleapis.com/tokeninfo?id_token=" . urlencode($idToken);
    $response = file_get_contents($url);
    
    if ($response === false) {
        return null;
    }
    
    $data = json_decode($response, true);
    
    if (isset($data['error']) || $data['aud'] !== $clientId) {
        return null;
    }
    
    return $data;
}

function generateJWT($user, $secret) {
    $header = base64_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = base64_encode(json_encode([
        'user_id' => $user['id'],
        'email' => $user['email'],
        'exp' => time() + (7 * 24 * 60 * 60) // 7 days
    ]));
    $signature = base64_encode(hash_hmac('sha256', "$header.$payload", $secret, true));
    return "$header.$payload.$signature";
}

function verifyToken($db) {
    $user = getAuthUser($db);
    if ($user) {
        echo json_encode(['valid' => true, 'user' => $user]);
    } else {
        http_response_code(401);
        echo json_encode(['valid' => false]);
    }
}

function getAuthUser($db) {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    
    if (!preg_match('/Bearer\s+(.+)/', $authHeader, $matches)) {
        return null;
    }
    
    $token = $matches[1];
    $parts = explode('.', $token);
    
    if (count($parts) !== 3) {
        return null;
    }
    
    $payload = json_decode(base64_decode($parts[1]), true);
    
    if (!$payload || $payload['exp'] < time()) {
        return null;
    }
    
    return $db->fetch("SELECT * FROM users WHERE id = ?", [$payload['user_id']]);
}

// ============================================
// USER FUNCTIONS
// ============================================
function getUserProfile($db) {
    $user = getAuthUser($db);
    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }
    
    // Get order stats
    $stats = $db->fetch("
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
            SUM(CASE WHEN status IN ('pending', 'processing') THEN 1 ELSE 0 END) as pending
        FROM orders WHERE user_id = ?
    ", [$user['id']]);
    
    echo json_encode([
        'user' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['name'],
            'photo' => $user['photo'],
            'balance' => floatval($user['balance']),
            'created_at' => $user['created_at']
        ],
        'stats' => $stats
    ]);
}

function getUserBalance($db) {
    $user = getAuthUser($db);
    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }
    
    echo json_encode(['balance' => floatval($user['balance'])]);
}

// ============================================
// SERVICES FUNCTIONS
// ============================================
function getServices($db) {
    $category = $_GET['category'] ?? null;
    
    $sql = "SELECT * FROM services WHERE active = 1";
    $params = [];
    
    if ($category) {
        $sql .= " AND category = ?";
        $params[] = $category;
    }
    
    $sql .= " ORDER BY sort_order ASC";
    
    $services = $db->fetchAll($sql, $params);
    echo json_encode(['services' => $services]);
}

function getService($db, $id) {
    $service = $db->fetch("SELECT * FROM services WHERE id = ? AND active = 1", [$id]);
    
    if (!$service) {
        http_response_code(404);
        echo json_encode(['error' => 'Service not found']);
        return;
    }
    
    echo json_encode(['service' => $service]);
}

// ============================================
// ORDERS FUNCTIONS
// ============================================
function getOrders($db) {
    $user = getAuthUser($db);
    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }
    
    // Allow Admin to see all orders
    if (isset($user['role']) && $user['role'] === 'admin') {
        $orders = $db->fetchAll("
            SELECT o.*, s.name as service_name, s.category, u.email as user_email, u.name as user_name
            FROM orders o 
            JOIN services s ON o.service_id = s.id 
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
        ");
    } else {
        // Regular user only sees their own orders
        $orders = $db->fetchAll("
            SELECT o.*, s.name as service_name, s.category 
            FROM orders o 
            JOIN services s ON o.service_id = s.id 
            WHERE o.user_id = ? 
            ORDER BY o.created_at DESC
        ", [$user['id']]);
    }
    
    echo json_encode(['orders' => $orders]);
}

function getOrder($db, $id) {
    $user = getAuthUser($db);
    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }
    
    $order = $db->fetch("
        SELECT o.*, s.name as service_name, s.category, s.delivery_time
        FROM orders o 
        JOIN services s ON o.service_id = s.id 
        WHERE o.id = ? AND o.user_id = ?
    ", [$id, $user['id']]);
    
    if (!$order) {
        http_response_code(404);
        echo json_encode(['error' => 'Order not found']);
        return;
    }
    
    echo json_encode(['order' => $order]);
}

function createOrder($db, $config, $input) {
    $user = getAuthUser($db);
    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }
    
    $serviceId = $input['service_id'] ?? 0;
    $imei = $input['imei'] ?? '';
    $carrier = $input['carrier'] ?? null;
    $notes = $input['notes'] ?? '';
    $paypalOrderId = $input['paypal_order_id'] ?? '';
    
    // Validate
    if (empty($serviceId) || empty($imei)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }
    
    // Get service
    $service = $db->fetch("SELECT * FROM services WHERE id = ? AND active = 1", [$serviceId]);
    if (!$service) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid service']);
        return;
    }
    
    // Generate order ID
    $orderId = 'ORD' . strtoupper(substr(md5(uniqid()), 0, 8));
    
    // Create order
    $id = $db->insert('orders', [
        'order_id' => $orderId,
        'user_id' => $user['id'],
        'service_id' => $serviceId,
        'imei' => $imei,
        'carrier' => $carrier,
        'notes' => $notes,
        'amount' => $service['price'],
        'status' => 'pending',
        'paypal_order_id' => $paypalOrderId,
        'created_at' => date('Y-m-d H:i:s')
    ]);
    
    // Send notification email
    sendOrderNotification($user, $orderId, $service, $imei);
    
    echo json_encode([
        'success' => true,
        'order_id' => $orderId,
        'message' => 'Order placed successfully'
    ]);
}

// ============================================
// PAYPAL FUNCTIONS
// ============================================
function getPayPalAccessToken($config) {
    $mode = $config['paypal']['mode'];
    $baseUrl = $mode === 'live' 
        ? 'https://api-m.paypal.com' 
        : 'https://api-m.sandbox.paypal.com';
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "$baseUrl/v1/oauth2/token",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => 'grant_type=client_credentials',
        CURLOPT_USERPWD => $config['paypal']['client_id'] . ':' . $config['paypal']['client_secret'],
        CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded']
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $data = json_decode($response, true);
    return $data['access_token'] ?? null;
}

function createPayPalOrder($db, $config, $input) {
    $user = getAuthUser($db);
    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }
    
    $amount = floatval($input['amount'] ?? 0);
    $description = $input['description'] ?? 'iTechMobile Service';
    
    if ($amount <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid amount']);
        return;
    }
    
    $accessToken = getPayPalAccessToken($config);
    if (!$accessToken) {
        http_response_code(500);
        echo json_encode(['error' => 'PayPal authentication failed']);
        return;
    }
    
    $mode = $config['paypal']['mode'];
    $baseUrl = $mode === 'live' 
        ? 'https://api-m.paypal.com' 
        : 'https://api-m.sandbox.paypal.com';
    
    $orderData = [
        'intent' => 'CAPTURE',
        'purchase_units' => [[
            'amount' => [
                'currency_code' => 'USD',
                'value' => number_format($amount, 2, '.', '')
            ],
            'description' => $description,
            'payee' => [
                'email_address' => $config['paypal']['email']
            ]
        ]]
    ];
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "$baseUrl/v2/checkout/orders",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($orderData),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            "Authorization: Bearer $accessToken"
        ]
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $data = json_decode($response, true);
    
    if (isset($data['id'])) {
        echo json_encode([
            'success' => true,
            'order_id' => $data['id']
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create PayPal order']);
    }
}

function capturePayPalOrder($db, $config, $input) {
    $user = getAuthUser($db);
    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }
    
    $paypalOrderId = $input['order_id'] ?? '';
    
    if (empty($paypalOrderId)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing order ID']);
        return;
    }
    
    $accessToken = getPayPalAccessToken($config);
    if (!$accessToken) {
        http_response_code(500);
        echo json_encode(['error' => 'PayPal authentication failed']);
        return;
    }
    
    $mode = $config['paypal']['mode'];
    $baseUrl = $mode === 'live' 
        ? 'https://api-m.paypal.com' 
        : 'https://api-m.sandbox.paypal.com';
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "$baseUrl/v2/checkout/orders/$paypalOrderId/capture",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            "Authorization: Bearer $accessToken"
        ]
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $data = json_decode($response, true);
    
    if (isset($data['status']) && $data['status'] === 'COMPLETED') {
        // Log transaction
        $db->insert('transactions', [
            'user_id' => $user['id'],
            'paypal_order_id' => $paypalOrderId,
            'amount' => $data['purchase_units'][0]['payments']['captures'][0]['amount']['value'],
            'status' => 'completed',
            'created_at' => date('Y-m-d H:i:s')
        ]);
        
        echo json_encode([
            'success' => true,
            'transaction_id' => $data['id']
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to capture payment']);
    }
}

function handlePayPalWebhook($db, $config, $input) {
    // Verify webhook signature in production
    $eventType = $input['event_type'] ?? '';
    
    if ($eventType === 'PAYMENT.CAPTURE.COMPLETED') {
        $resource = $input['resource'] ?? [];
        $paypalOrderId = $resource['supplementary_data']['related_ids']['order_id'] ?? '';
        
        if ($paypalOrderId) {
            // Update order status
            $db->update('orders', 
                ['status' => 'processing', 'updated_at' => date('Y-m-d H:i:s')],
                'paypal_order_id = ?',
                ['paypal_order_id' => $paypalOrderId]
            );
        }
    }
    
    echo json_encode(['received' => true]);
}

// ============================================
// IMEI CHECK
// ============================================
function checkIMEI($db, $input) {
    global $config;
    
    $imei = $input['imei'] ?? '';
    
    if (empty($imei) || strlen($imei) < 8) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid IMEI']);
        return;
    }
    
    // Basic IMEI validation - clean input
    $imei = preg_replace('/[^0-9A-Za-z]/', '', $imei);
    
    // Use external API client for IMEI check
    $apiClient = new ExternalAPIClient($config, $db);
    $result = $apiClient->checkIMEI($imei);
    
    if ($result['success']) {
        echo json_encode(['result' => $result]);
    } else {
        // Fallback to basic response
        $fallback = [
            'imei' => $imei,
            'valid' => true,
            'device' => [
                'model' => 'Unknown Model',
                'brand' => substr($imei, 0, 2) === '35' ? 'Apple' : 'Android',
                'color' => 'Unknown',
                'storage' => 'Unknown'
            ],
            'note' => 'For full device info (carrier, iCloud, blacklist), purchase our GSX Check service.'
        ];
        echo json_encode(['result' => $fallback]);
    }
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

/**
 * Get all orders for admin panel
 */
function getAdminOrders($db) {
    global $currentUser;
    
    // TODO: Add admin role check - for now, allow any authenticated user
    // In production, add: if ($currentUser['role'] !== 'admin') { ... }
    
    $orders = $db->fetchAll("
        SELECT o.*, 
               s.name as service_name, 
               s.category as service_category,
               u.name as user_name,
               u.email as user_email
        FROM orders o
        LEFT JOIN services s ON o.service_id = s.id
        LEFT JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
        LIMIT 500
    ");
    
    echo json_encode(['orders' => $orders]);
}

/**
 * Update order status and result (admin)
 */
function updateAdminOrder($db, $orderId, $input) {
    global $currentUser;
    
    // Get existing order
    $order = $db->fetch("SELECT * FROM orders WHERE id = ?", [$orderId]);
    
    if (!$order) {
        http_response_code(404);
        echo json_encode(['error' => 'Order not found']);
        return;
    }
    
    // Prepare update data
    $updateData = [];
    
    if (isset($input['status'])) {
        $validStatuses = ['pending', 'processing', 'completed', 'failed', 'refunded'];
        if (in_array($input['status'], $validStatuses)) {
            $updateData['status'] = $input['status'];
        }
    }
    
    if (isset($input['result'])) {
        $updateData['result'] = $input['result'];
    }
    
    if (isset($input['admin_notes'])) {
        $updateData['admin_notes'] = $input['admin_notes'];
    }
    
    if (empty($updateData)) {
        http_response_code(400);
        echo json_encode(['error' => 'No valid fields to update']);
        return;
    }
    
    $updateData['updated_at'] = date('Y-m-d H:i:s');
    
    // Build UPDATE query
    $setClauses = [];
    $params = [];
    foreach ($updateData as $key => $value) {
        $setClauses[] = "$key = ?";
        $params[] = $value;
    }
    $params[] = $orderId;
    
    $sql = "UPDATE orders SET " . implode(', ', $setClauses) . " WHERE id = ?";
    $db->query($sql, $params);
    
    // If completed, send notification to customer
    if (isset($updateData['status']) && $updateData['status'] === 'completed') {
        sendOrderCompletedNotification($db, $order);
    }
    
    echo json_encode(['success' => true, 'message' => 'Order updated successfully']);
}

/**
 * Get all users for admin panel
 */
function getAdminUsers($db) {
    global $currentUser;
    
    $users = $db->fetchAll("
        SELECT u.*, 
               COUNT(o.id) as order_count,
               COALESCE(SUM(CASE WHEN o.status = 'completed' THEN o.amount ELSE 0 END), 0) as total_spent
        FROM users u
        LEFT JOIN orders o ON u.id = o.user_id
        GROUP BY u.id
        ORDER BY u.created_at DESC
        LIMIT 500
    ");
    
    // Remove sensitive data
    foreach ($users as &$user) {
        unset($user['google_id']);
    }
    
    echo json_encode(['users' => $users]);
}

/**
 * Send notification when order is completed
 */
function sendOrderCompletedNotification($db, $order) {
    $user = $db->fetch("SELECT * FROM users WHERE id = ?", [$order['user_id']]);
    if (!$user) return;
    
    $service = $db->fetch("SELECT * FROM services WHERE id = ?", [$order['service_id']]);
    $serviceName = $service ? $service['name'] : 'Unknown Service';
    
    $to = $user['email'];
    $subject = "Order Completed: " . $order['order_id'];
    $message = "
        Hello {$user['name']},
        
        Your order has been completed!
        
        Order ID: {$order['order_id']}
        Service: {$serviceName}
        IMEI: {$order['imei']}
        
        Result:
        {$order['result']}
        
        Thank you for choosing iTechMobile!
        
        ---
        iTechMobile
        https://itechmobile.site
    ";
    
    $headers = "From: noreply@itechmobile.site\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    @mail($to, $subject, $message, $headers);
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function sendOrderNotification($user, $orderId, $service, $imei) {
    $to = 'itechinfomtl@gmail.com';
    $subject = "New Order: $orderId";
    $message = "
        New order received:
        
        Order ID: $orderId
        Customer: {$user['name']} ({$user['email']})
        Service: {$service['name']}
        IMEI: $imei
        Amount: \${$service['price']}
        
        Please process this order.
    ";
    
    $headers = "From: noreply@itechmobile.site\r\n";
    $headers .= "Reply-To: {$user['email']}\r\n";
    
    @mail($to, $subject, $message, $headers);
}
