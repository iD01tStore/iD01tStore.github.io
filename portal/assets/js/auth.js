document.addEventListener('DOMContentLoaded', () => {
    const googleLoginButton = document.getElementById('google-login-btn');

    if (googleLoginButton) {
        googleLoginButton.addEventListener('click', () => {
            // --- MOCK LOGIN ---
            // In a real application, this would initiate the Google OAuth flow.
            // For this demo, we'll just simulate a successful login and redirect.
            
            console.log('Simulating Google login...');

            // We can store a mock "logged in" status in sessionStorage.
            // sessionStorage is cleared when the browser tab is closed.
            sessionStorage.setItem('isLoggedIn', 'true');
            
            // Redirect to the dashboard.
            window.location.href = './dashboard.html';
        });
    }

    // Check login status on protected pages
    const bodyId = document.body.id;
    if (bodyId === 'dashboard-page' || bodyId === 'orders-page' || bodyId === 'profile-page') {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            // If not logged in, redirect to the login page.
            window.location.href = './login.html';
        }
    }
    
    const logoutButton = document.getElementById('logout-btn');
    if(logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('isLoggedIn');
            window.location.href = './login.html';
        });
    }
});
