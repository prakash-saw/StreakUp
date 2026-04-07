// StreakUp -- login.js //

let currentTab = 'login';
let showPass = false;

function switchTab(tab){
    currentTab = tab;
    document.getElementById('tab-login').classList.toggle('active', tab === 'login');
    document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
    document.getElementById('name-wrap').classList.toggle('active', tab === 'login');
    document.getElementById('forgot-wrap').classList.toggle('active', tab === 'signup');
    document.getElementById('btn-txt').textContent = tab === 'login' ? 'Sign In' : 'Create Account';
    document.getElementById('switch-txt').innerHTML = tab === 'login'
       ? `Don't have an account? <span class = "clr-orange fw-7" style = "cursor:pointer;" onclick= "switchTab('signup')">Sign Up free</span>`
       : `Already have an account? <span class = "clr-orange fw-7" style= "cursor:pointer;" onclick = "switchTab('login')">Sign in</span>`;
       hideAlerts();
}

function togglePass() {
    showPass = !showPass;
    document.getElementById('password').type = showPass ? 'text' : 'password';
    document.getElementById('eye-ico').innerHTML = showPass
    ? ` <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>`
    : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
}

function hideAlerts() {
    document.getElementById('error-box').classList.add('hidden');
    document.getElementById('success-box').classList.add('hidden');
}

function showError(msg){
    document.getElementById('error-msg').textContent = msg;
    document.getElementById('error-box').classList.remove('hidden');
    document.getElementById('success-box').classList.add('hidden');
}

function showSuccess(msg){
    document.getElementById('success-msg').textContent = msg;
    document.getElementById('success-box').classList.remove('hidden');
    document.getElementById('error-box').classList.add('hidden');
}

function setLoading(on){
    const btn = document.getElementById('submit-btn');
    const txt = document.getElementById('btn-txt');
    const arr = document.getElementById('btn-arraow');
    btn.disabled = on;
    if (on) {
        txt.innerHTML = `<svg class="spin" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>`;
    arr.style.display = 'none';
  } else {
    txt.textContent = currentTab==='login' ? 'Sign In' : 'Create Account';
    arr.style.display = '';
  }
    
}

function handleSubmit(){
    hideAlerts();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const name = document.getElementById('name').value.trim();
    if(!email)  return showError('Please enter your email');
    if(!password) return showError('Please enter your password');
    if (currentTab === 'signup' && !name) return showError('Please enter your name');
    if (password.length < 6) return showError('Password must be at least 6 characters');

    setLoading(true);
}


setTimeout(() => {
    setLoading(false);
    showSuccess(currentTab=== 'login' ? 'Welcome back! Redirecting...' : 'Account created! Let\'s go!');
    setTimeout(() =>  window.location.href = 'dashboard.html', 1200);
    }, 1500);


function googleLogin() {
    showSuccess('Google login coming soon!');
}

function showForgot() {
    alert('Password reset link will be sent to your email!');
}