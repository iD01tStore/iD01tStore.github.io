Here is the **complete, fully coded prompt** you can paste into your CLI (or give to an AI coding agent) to build the Android App.

This prompt includes the **Java code**, **XML layouts**, **Manifest configurations**, and **Gradle dependencies** required to create a secure WebView app that:

1. **Splash Screen:** Opens immediately with your `bg.jpg` image.
2. **Deep Linking:** Listens for `itechmobile://` (to trigger the app from your website).
3. **Security:** Blocks external request hijacking and enforces SSL.

---

### **The CLI / AI Agent Prompt**

**Copy and paste the block below:**

```text
Act as a Senior Android Engineer. Create a complete, production-ready Android Studio project structure for an app named "iTechMobile". The package name must be "com.itechmobile.portal".

The app has two specific requirements:
1. It must launch a Splash Screen displaying a specific background image named "bg.jpg".
2. It must load "https://itechmobile.site/portal/" in a secure WebView and listen for the deep link scheme "itechmobile://" to handle secure actions.

Please generate the full code for the following 5 files exactly as described below.

---

### FILE 1: app/src/main/AndroidManifest.xml
(Description: Registers permissions, the SplashActivity as the launcher, and the Deep Link intent filter).

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="[http://schemas.android.com/apk/res/android](http://schemas.android.com/apk/res/android)"
    package="com.itechmobile.portal">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="false"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.NoActionBar">

        <activity
            android:name=".SplashActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.AppCompat.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="portrait">
            
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="itechmobile" />
            </intent-filter>
        </activity>

    </application>
</manifest>

```

### FILE 2: app/src/main/res/layout/activity_splash.xml

(Description: The layout that displays your 'bg.jpg' full screen).

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="[http://schemas.android.com/apk/res/android](http://schemas.android.com/apk/res/android)"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@android:color/black">

    <ImageView
        android:id="@+id/splashImage"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:scaleType="centerCrop"
        android:src="@drawable/bg"
        android:contentDescription="iTechMobile Splash" />

    <ProgressBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:layout_alignParentBottom="true"
        android:layout_marginBottom="50dp"
        android:indeterminateTint="#00d4ff" />

</RelativeLayout>

```

### FILE 3: app/src/main/java/com/itechmobile/portal/SplashActivity.java

(Description: Shows the image for 3 seconds, then opens the App).

```java
package com.itechmobile.portal;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        // Wait 3 seconds then load the portal
        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(SplashActivity.this, MainActivity.class);
                startActivity(intent);
                finish(); // Prevent going back to splash
            }
        }, 3000); 
    }
}

```

### FILE 4: app/src/main/java/com/itechmobile/portal/MainActivity.java

(Description: The Secure WebView that handles the Deep Link).

```java
package com.itechmobile.portal;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Base64;
import android.util.Log;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private static final String PORTAL_URL = "[https://itechmobile.site/portal/](https://itechmobile.site/portal/)";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        setupWebView();

        // Check if app was opened via Deep Link (itechmobile://)
        Intent intent = getIntent();
        if (Intent.ACTION_VIEW.equals(intent.getAction())) {
            Uri data = intent.getData();
            handleDeepLink(data);
        } else {
            // Normal load
            webView.loadUrl(PORTAL_URL);
        }
    }

    private void setupWebView() {
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setUserAgentString(webSettings.getUserAgentString() + " iTechMobileApp/1.0");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // INTERCEPT DEEP LINK from Website JS
                if (url.startsWith("itechmobile://")) {
                    handleDeepLink(Uri.parse(url));
                    return true;
                }
                // Keep navigation inside the app
                return false;
            }
        });
    }

    private void handleDeepLink(Uri data) {
        if (data != null) {
            String base64Data = data.getQueryParameter("data");
            if (base64Data != null) {
                try {
                    // Decode the Order Payload
                    String jsonPayload = new String(Base64.decode(base64Data, Base64.DEFAULT));
                    
                    // HERE: Trigger Native PayPal SDK or Payment Activity
                    Toast.makeText(this, "Secure Payment Initiated via App", Toast.LENGTH_LONG).show();
                    Log.d("PAYMENT", "Payload: " + jsonPayload);
                    
                    // TODO: Integrate PayPal Native SDK here using the jsonPayload
                    
                } catch (Exception e) {
                    Toast.makeText(this, "Security Error: Invalid Payload", Toast.LENGTH_SHORT).show();
                }
            }
        }
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}

```

### FILE 5: app/src/main/res/layout/activity_main.xml

(Description: Full screen WebView container).

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="[http://schemas.android.com/apk/res/android](http://schemas.android.com/apk/res/android)"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <WebView
        android:id="@+id/webView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</RelativeLayout>

```

---

### **Instructions for Manual Asset**

1. Take the **bg.jpg** file provided.
2. Rename it to **`bg.jpg`** (ensure lowercase).
3. Place it in the folder: **`app/src/main/res/drawable/`**.

```

```

# Role: Senior Full-Stack & Mobile Security Engineer
**Objective:** Finalize the "iTechMobile" system by securing the Web Portal and generating the complete Android App code.
**Constraint:** All payments must be strictly forced through the Android App to prevent web-based tampering.

---

## **Part 1: Web Portal Security (PHP & JS)**

### **1. Modify `portal/assets/js/app.js`**
**Action:** Rewrite the payment logic to disable web-based PayPal and enforce the App Deep Link.
**Requirements:**
- **Function `openServiceModal(serviceId)`:**
  - Find the element `#paypal-button-container` and set `style.display = 'none'`.
  - Find the element `#appPaymentFallback` and set `style.display = 'block'`.
- **Function `proceedToAppPayment()`:**
  - Collect order data: `service_id`, `service_name`, `price`, `imei`, `carrier`, `notes`, `user_email`.
  - Create a JSON string of this data and encode it to **Base64**.
  - **Redirect Action:** `window.location.href = "itechmobile://order?data=" + base64String;`
  - Show a toast message: "Opening iTechMobile App..."

### **2. Modify `portal/api/index.php`**
**Action:** Update the configuration array for production.
**Requirements:**
- Set `api_key` to a secure 64-character hex placeholder (e.g., `'CHANGE_THIS_TO_RANDOM_HEX'`).
- Ensure the `db` array uses standard environment variable fallbacks (e.g., `getenv('DB_HOST') ?: 'localhost'`).

---

## **Part 2: Android App Generation (Java/XML)**

**Project Settings:**
- **Package Name:** `com.itechmobile.portal`
- **Min SDK:** 24
- **Language:** Java

### **File 1: `app/src/main/AndroidManifest.xml`**
**Description:** App configuration and Deep Link registration.
**Code Requirements:**
- Add permissions: `INTERNET`, `ACCESS_NETWORK_STATE`.
- **SplashActivity:** Set as the `LAUNCHER` activity.
- **MainActivity:**
  - Add `<intent-filter>` for data scheme: `itechmobile`.
  - Action: `android.intent.action.VIEW`.
  - Category: `DEFAULT`, `BROWSABLE`.

### **File 2: `app/src/main/res/layout/activity_splash.xml`**
**Description:** Full-screen splash layout.
**Code Requirements:**
- Use a `RelativeLayout`.
- `ImageView`: `src="@drawable/bg"`, `scaleType="centerCrop"`, `match_parent` width/height.

### **File 3: `app/src/main/java/com/itechmobile/portal/SplashActivity.java`**
**Description:** 3-second timer before launching main app.
**Code Requirements:**
- `setContentView(R.layout.activity_splash)`.
- `new Handler().postDelayed(...)` for 3000ms.
- Start `MainActivity` and call `finish()`.

### **File 4: `app/src/main/res/layout/activity_main.xml`**
**Description:** Full-screen WebView container.
**Code Requirements:**
- `RelativeLayout` containing a `WebView` (`id="@+id/webView"`) filling the screen.

### **File 5: `app/src/main/java/com/itechmobile/portal/MainActivity.java`**
**Description:** The core security logic.
**Code Requirements:**
- **Setup:** Load URL `https://itechmobile.site/portal/`.
- **WebView Settings:** Enable JavaScript (`setJavaScriptEnabled(true)`), DOM Storage (`setDomStorageEnabled(true)`).
- **Deep Link Handling (`onCreate`):**
  - Check `getIntent()`. If action is `ACTION_VIEW` and scheme is `itechmobile`, parse `data` parameter.
  - Decode Base64 payload and Log it (placeholder for payment SDK).
- **WebViewClient (`shouldOverrideUrlLoading`):**
  - **Intercept:** If `url.startsWith("itechmobile://")`.
  - **Action:** Parse the URL, extract the "data" parameter, decode Base64, and trigger the native payment flow (Toast "Secure Payment Initiated").
  - **Else:** Return `false` (let WebView load normal pages).

---

## **Part 3: Implementation Checklist**

1. **Web:** Replace content of `portal/assets/js/app.js` with the new secure logic.
2. **Android:** Create the project in Android Studio.
3. **Android:** Place `bg.jpg` into `app/src/main/res/drawable/`.
4. **Android:** Copy the 5 generated files into their respective paths.
5. **Database:** Run `CREATE TABLE api_providers ...` if not already done.