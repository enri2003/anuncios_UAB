const API_BASE = 'http://localhost:3000/api';

// ====== UTILIDADES TOKEN ======
function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}

function clearToken() {
  localStorage.removeItem('token');
}

// ====== LOGIN ======
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('loginMessage');

    msg.textContent = '';

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        msg.textContent = data.message || 'Error al iniciar sesión';
        return;
      }

      setToken(data.token);
      window.location.href = 'index.html';
    } catch (err) {
      msg.textContent = 'Error de conexión con el servidor';
    }
  });
}

// ====== LISTAR ANUNCIOS ======
const adsList = document.getElementById('adsList');
if (adsList) {
  cargarAnuncios();
  configurarAuthUI();
}

async function cargarAnuncios() {
  adsList.innerHTML = '<p>Cargando anuncios...</p>';
  try {
    const res = await fetch(`${API_BASE}/ads`);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      adsList.innerHTML = '<p class="text-muted">No hay anuncios todavía.</p>';
      return;
    }

    adsList.innerHTML = '';
    data.forEach((ad) => {
      const col = document.createElement('div');
      col.className = 'col-md-4';

      col.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${ad.titulo}</h5>
            <p class="card-text">${ad.descripcion}</p>
            <p class="card-text"><span class="badge bg-secondary">${ad.categoria}</span></p>
            <p class="card-text">
              <strong>Precio:</strong> ${ad.precio != null ? ad.precio : 'Gratuito'}
            </p>
            <p class="card-text">
              <small class="text-muted">Creado: ${new Date(ad.creadoEn).toLocaleString()}</small>
            </p>
          </div>
        </div>
      `;
      adsList.appendChild(col);
    });
  } catch (err) {
    adsList.innerHTML = '<p class="text-danger">Error al cargar anuncios.</p>';
  }
}

// ====== CREAR ANUNCIO ======
const adForm = document.getElementById('adForm');
if (adForm) {
  adForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('adMessage');
    msg.textContent = '';

    const token = getToken();
    if (!token) {
      msg.textContent = 'Debes iniciar sesión para crear anuncios.';
      return;
    }

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;
    const precioValue = document.getElementById('precio').value;
    const precio = precioValue ? Number(precioValue) : undefined;

    try {
      const res = await fetch(`${API_BASE}/ads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ titulo, descripcion, categoria, precio })
      });

      const data = await res.json();

      if (!res.ok) {
        msg.textContent = data.mensaje || 'Error al crear anuncio';
        return;
      }

      adForm.reset();
      msg.classList.remove('text-danger');
      msg.classList.add('text-success');
      msg.textContent = 'Anuncio creado correctamente.';
      cargarAnuncios();
    } catch (err) {
      msg.textContent = 'Error de conexión al crear anuncio.';
    }
  });
}

// ====== UI LOGIN / LOGOUT EN NAVBAR ======
function configurarAuthUI() {
  const btnLogout = document.getElementById('btnLogout');
  const btnLogin = document.getElementById('btnLogin');
  if (!btnLogout || !btnLogin) return;

  if (getToken()) {
    btnLogout.classList.remove('d-none');
    btnLogin.classList.add('d-none');
  } else {
    btnLogout.classList.add('d-none');
    btnLogin.classList.remove('d-none');
  }

  btnLogout.addEventListener('click', () => {
    clearToken();
    window.location.reload();
  });
}
