const API_BASE = 'http://localhost:3000/api';

const adsContainer = document.getElementById('adsContainer');
const adsError = document.getElementById('adsError');

const createSection = document.getElementById('createSection');
const adForm = document.getElementById('adForm');
const adMessage = document.getElementById('adMessage');

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

// =========================
//   UI SEGÚN SESIÓN
// =========================
function actualizarUI() {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  if (token && rol === 'admin') {
    createSection.style.display = 'block';
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else if (token && rol === 'user') {
    createSection.style.display = 'none';
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    createSection.style.display = 'none';
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }
}

// =========================
//   CARGAR ANUNCIOS
// =========================
async function cargarAnuncios() {
  adsError.textContent = '';
  adsContainer.innerHTML = '';

  try {
    const resp = await fetch(`${API_BASE}/ads`);
    console.log('STATUS /api/ads:', resp.status);

    if (!resp.ok) {
      adsError.textContent = 'No se pudieron cargar los anuncios.';
      return;
    }

    const data = await resp.json();
    console.log('DATA /api/ads:', data);

    // Tu backend devuelve un ARRAY directamente: [...]
    if (!Array.isArray(data)) {
      adsError.textContent = 'Formato inesperado de anuncios.';
      console.error('Respuesta de /api/ads no es array:', data);
      return;
    }

    if (data.length === 0) {
      adsContainer.innerHTML = '<p class="text-muted">No hay anuncios todavía.</p>';
      return;
    }

    data.forEach((ad) => {
      const col = document.createElement('div');
      col.className = 'col-md-4';

      const card = document.createElement('div');
      card.className = 'card h-100 p-3';

      const h5 = document.createElement('h5');
      h5.className = 'card-title';
      h5.textContent = ad.titulo;

      const pDesc = document.createElement('p');
      pDesc.className = 'card-text';
      pDesc.textContent = ad.descripcion;

      const spanCat = document.createElement('span');
      spanCat.className = 'badge bg-secondary mb-2';
      spanCat.textContent = ad.categoria;

      const pPrecio = document.createElement('p');
      pPrecio.innerHTML = `<strong>Precio:</strong> ${ad.precio ?? 0}`;

      const pFecha = document.createElement('p');
      pFecha.className = 'text-muted mb-0';
      const fecha = ad.createdAt ? new Date(ad.createdAt) : null;
      pFecha.textContent = fecha ? `Creado: ${fecha.toLocaleString()}` : '';

      card.appendChild(h5);
      card.appendChild(pDesc);
      card.appendChild(spanCat);
      card.appendChild(pPrecio);
      card.appendChild(pFecha);

      col.appendChild(card);
      adsContainer.appendChild(col);
    });
  } catch (err) {
    console.error(err);
    adsError.textContent = 'Error de conexión al cargar anuncios.';
  }
}

// =========================
//   CREAR ANUNCIO (ADMIN)
// =========================
if (adForm) {
  adForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    adMessage.textContent = '';

    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    if (!token || rol !== 'admin') {
      adMessage.textContent = 'Debes iniciar sesión como administrador.';
      return;
    }

    const nuevoAd = {
      titulo: document.getElementById('titulo').value.trim(),
      descripcion: document.getElementById('descripcion').value.trim(),
      categoria: document.getElementById('categoria').value.trim(),
      precio: document.getElementById('precio').value
        ? Number(document.getElementById('precio').value)
        : 0
    };

    try {
      const resp = await fetch(`${API_BASE}/ads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(nuevoAd)
      });

      const data = await resp.json();

      if (!resp.ok) {
        adMessage.textContent = data.message || 'Error al crear anuncio.';
        return;
      }

      adForm.reset();
      await cargarAnuncios();
    } catch (err) {
      console.error(err);
      adMessage.textContent = 'Error de conexión al crear anuncio.';
    }
  });
}

// =========================
//   BOTONES LOGIN / LOGOUT
// =========================
loginBtn.addEventListener('click', () => {
  window.location.href = 'login.html';
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
  localStorage.removeItem('nombre');
  actualizarUI();
  cargarAnuncios();
});

// =========================
//   INICIO
// =========================
actualizarUI();
cargarAnuncios();
