// Referensi elemen
const laporanBody = document.getElementById('laporanBody');
const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const cancelBtn = document.getElementById('cancelBtn');
const submitBtn = document.getElementById('submitBtn');

let pendingAction = null;

// 🔐 Event listener dropdown Aksi
laporanBody.addEventListener('change', (e) => {
  if (e.target.tagName === 'SELECT') {
    const selected = e.target.value.trim();

    if (selected === '✏️ Edit' || selected === '🗑️ Hapus') {
      const lastShown = localStorage.getItem('lastShownSaeful');
      const now = Date.now();

      // pertama kali klik → modal password muncul
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

// tombol batal
cancelBtn.addEventListener('click', () => {
  passwordModal.classList.add('hidden');
  passwordInput.value = "";
  pendingAction = null;
});

// tombol submit
submitBtn.addEventListener('click', () => {
  if (passwordInput.value === "saeful") {
    alert("Password benar. Lanjut ke aksi: " + pendingAction);
    localStorage.setItem('lastShownSaeful', Date.now());
    jalankanAksi(pendingAction);
    passwordModal.classList.add('hidden');
    passwordInput.value = "";
    pendingAction = null;
  } else {
    alert("Password salah!");
  }
});

// fungsi aksi edit/hapus
function jalankanAksi(action) {
  if (action === "✏️ Edit") {
    console.log("Lakukan proses edit...");
    // tambahkan logika edit di sini (misalnya buka form edit)
  } else if (action === "🗑️ Hapus") {
    console.log("Lakukan proses hapus...");
    const tbody = document.getElementById("laporanBody");
    if (tbody.lastChild) {
      tbody.removeChild(tbody.lastChild);
    }
  }
}
