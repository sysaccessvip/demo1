// auth.js: autenticación demo con localStorage
// Demo credentials:
// admin / password123

(function(){
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const toRegister = document.getElementById('toRegister');
  const toLogin = document.getElementById('toLogin');
  const authMsg = document.getElementById('authMsg');

  function showMsg(text, timeout=3000){
    if (!authMsg) return;
    authMsg.textContent = text;
    setTimeout(()=> authMsg.textContent = '', timeout);
  }

  // Switch forms
  toRegister && toRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });
  toLogin && toLogin.addEventListener('click', () => {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });

  // Helper: store users in localStorage as objeto {user: password}
  function getUsers(){
    const raw = localStorage.getItem('agenciaweb_users');
    return raw ? JSON.parse(raw) : { admin: 'password123' }; // cuenta demo por defecto
  }
  function saveUsers(u){ localStorage.setItem('agenciaweb_users', JSON.stringify(u)); }

  // Registro
  document.getElementById('doRegister') && document.getElementById('doRegister').addEventListener('click', () => {
    const user = document.getElementById('regUser').value.trim();
    const pass = document.getElementById('regPass').value.trim();
    if (!user || !pass) { showMsg('Completa usuario y contraseña'); return; }
    const users = getUsers();
    if (users[user]) { showMsg('Usuario ya existe'); return; }
    users[user] = pass;
    saveUsers(users);
    showMsg('Registro exitoso. Ahora inicia sesión.');
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });

  // Login
  loginForm && loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    const users = getUsers();
    if (users[user] && users[user] === pass){
      // crea token demo
      localStorage.setItem('agenciaweb_token', btoa(user + ':' + Date.now()));
      localStorage.setItem('agenciaweb_user', user);
      showMsg('Acceso correcto. Redirigiendo...');
      setTimeout(() => window.location.href = 'dashboard.html', 600);
    } else {
      showMsg('Credenciales inválidas', 4000);
    }
  });

})();
