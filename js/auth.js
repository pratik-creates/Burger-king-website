/* =============================================
   BURGER KING - Auth Pages JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Login Form ---- */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!username || !password) {
        showToast('Please enter both username and password.', 'error');
        return;
      }

      // Simulate login success
      showToast('Login successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 1500);
    });
  }

  /* ---- Signup Form ---- */
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullname = document.getElementById('fullname').value.trim();
      const email    = document.getElementById('email').value.trim();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const confirm  = document.getElementById('confirmPassword').value.trim();

      if (!fullname || !email || !username || !password || !confirm) {
        showToast('Please fill in all fields.', 'error');
        return;
      }

      if (password !== confirm) {
        showToast('Passwords do not match.', 'error');
        const errEl = document.getElementById('passwordError');
        if (errEl) { errEl.textContent = 'Passwords do not match.'; errEl.style.display = 'block'; }
        return;
      }

      if (password.length < 6) {
        showToast('Password must be at least 6 characters.', 'error');
        return;
      }

      showToast('Account created! Redirecting to login...', 'success');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1800);
    });

    // Live password match check
    const confirmInput = document.getElementById('confirmPassword');
    if (confirmInput) {
      confirmInput.addEventListener('input', () => {
        const password = document.getElementById('password').value;
        const errEl = document.getElementById('passwordError');
        if (errEl) {
          if (confirmInput.value && confirmInput.value !== password) {
            errEl.textContent = 'Passwords do not match.';
            errEl.style.display = 'block';
          } else {
            errEl.style.display = 'none';
          }
        }
      });
    }
  }

  /* ---- Forgot Password Form ---- */
  const forgotForm = document.getElementById('forgotForm');
  if (forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email    = document.getElementById('email').value.trim();
      const newPass  = document.getElementById('newPassword').value.trim();
      const confirm  = document.getElementById('confirmPassword').value.trim();
      const errEl    = document.getElementById('passwordError');

      if (!email || !newPass || !confirm) {
        showToast('Please fill in all fields.', 'error');
        return;
      }

      if (newPass !== confirm) {
        if (errEl) { errEl.textContent = 'Passwords do not match.'; errEl.style.display = 'block'; }
        showToast('Passwords do not match.', 'error');
        return;
      }

      if (errEl) errEl.style.display = 'none';
      showToast('Password reset successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1800);
    });
  }

});

/* ---- Toast ---- */
function showToast(message, type = '') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}
