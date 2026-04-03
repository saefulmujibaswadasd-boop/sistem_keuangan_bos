// LOGIN HANDLER
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;

      if (user === "admin" && pass === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
      } else {
        alert("Username atau password salah!");
      }
    });
  }
});

// SIMPAN DATA RKAS KE LOCALSTORAGE
document.addEventListener("submit", e => {
  if (e.target.id === "rkasForm") {
    e.preventDefault();
    const judul = document.getElementById("judulRkas").value;
    const file = document.getElementById("fileUpload").files[0]?.name || "Belum ada file";

    let bosData = JSON.parse(localStorage.getItem("bosData")) || [];
    bosData.push({
      no: bosData.length + 1,
      tanggal: new Date().toLocaleDateString("id-ID"),
      ket: judul,
      jumlah: "Rp 0",
      file: file
    });

    localStorage.setItem("bosData", JSON.stringify(bosData));
    alert("Data RKAS tersimpan di browser!");
  }
});

// RENDER TABEL BOS DARI LOCALSTORAGE
function renderBosTable() {
  const tbody = document.getElementById("bosTableBody");
  if (!tbody) return;

  const bosData = JSON.parse(localStorage.getItem("bosData")) || [];
  tbody.innerHTML = bosData.map(item => `
    <tr>
      <td class="border border-blue-400 px-4 py-2">${item.no}</td>
      <td class="border border-blue-400 px-4 py-2">${item.tanggal}</td>
      <td class="border border-blue-400 px-4 py-2">${item.ket}</td>
      <td class="border border-blue-400 px-4 py-2">${item.jumlah}</td>
      <td class="border border-blue-400 px-4 py-2">
        <select class="bg-blue-100 text-black rounded px-2 py-1">
          <option>Triwulan I</option>
          <option>Triwulan II</option>
          <option>Triwulan III</option>
          <option>Triwulan IV</option>
        </select>
      </td>
      <td class="border border-blue-400 px-4 py-2">
        <select class="bg-blue-100 text-black rounded px-2 py-1">
          <option>Masuk</option>
          <option>Keluar</option>
        </select>
      </td>
    </tr>
  `).join("");
}
// === Tambahan navigasi section SIPLAH / Perubahan / BOSDA ===
function hideAllSections() {
  document.getElementById('section-siplah').classList.add('hidden');
  document.getElementById('section-perubahan').classList.add('hidden');
  document.getElementById('section-bosda').classList.add('hidden');
}

document.getElementById('menu-siplah').addEventListener('click', function(e) {
  e.preventDefault();
  hideAllSections();
  document.getElementById('section-siplah').classList.remove('hidden');
});

document.getElementById('menu-perubahan').addEventListener('click', function(e) {
  e.preventDefault();
  hideAllSections();
  document.getElementById('section-perubahan').classList.remove('hidden');
});

document.getElementById('menu-bosda').addEventListener('click', function(e) {
  e.preventDefault();
  hideAllSections();
  document.getElementById('section-bosda').classList.remove('hidden');
});

// Jika ada hash di URL (misalnya siplah.html#bosda), tampilkan section sesuai hash
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (hash === "#bosda") {
    hideAllSections();
    document.getElementById('section-bosda').classList.remove('hidden');
  } else if (hash === "#perubahan") {
    hideAllSections();
    document.getElementById('section-perubahan').classList.remove('hidden');
  } else {
    hideAllSections();
    document.getElementById('section-siplah').classList.remove('hidden');
  }
});

// === Lanjutkan dengan event listener aksi password ===
document.getElementById('laporanBody').addEventListener('change', (e) => {
  ...
});
// EVENT LISTENER AKSI DENGAN PASSWORD
document.getElementById('laporanBody').addEventListener('change', (e) => {
  if (e.target.tagName === 'SELECT') {
    const selected = e.target.value;

    if (selected.includes('✏️') || selected.includes('🗑️')) {
      const lastShown = localStorage.getItem('lastShownSaeful');
      const now = Date.now();

      if (!lastShown || (now - parseInt(lastShown, 10)) > 3600000) {
        pendingAction = selected;
        passwordModal.classList.remove('hidden'); // tampilkan modal password
      } else {
        jalankanAksi(selected); // langsung jalankan kalau masih dalam 1 jam
      }

      e.target.selectedIndex = 0; // reset dropdown
    }
  }
});
