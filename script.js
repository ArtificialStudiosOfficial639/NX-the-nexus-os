// Toggle Password Visibility
function togglePass() {
    const passInput = document.getElementById('passInput');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (passInput.type === 'password') {
        passInput.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passInput.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

// Handle Form Submission with Loading State
document.getElementById('mainLoginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const btn = document.getElementById('loginBtn');
    
    // 1. Add loading class (hides text, shows spinner)
    btn.classList.add('loading');
    
    // 2. Disable button to prevent multiple submissions
    btn.disabled = true;
    
    // 3. Simulate a network delay (e.g., 2 seconds)
    setTimeout(() => {
        // Reset state after "request" finishes
        btn.classList.remove('loading');
        btn.disabled = false;
        
        alert("Authentication Successful! Redirecting to dashboard...");
    }, 2000);
});