const menuArkas = document.getElementById('menu-arkas');
const inputArkas = document.getElementById('input-arkas');
const fileInput = document.getElementById('fileInput');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const result = document.getElementById('result');
const fileList = document.getElementById('file-list');
const dropArea = document.getElementById('drop-area');

const menuLaporanBos = document.querySelector('a[href="#laporan-bos"]');
const laporanSection = document.getElementById('laporan-bos');

const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const cancelBtn = document.getElementById('cancelBtn');
const submitBtn = document.getElementById('submitBtn');
let pendingAction = null; // simpan aksi yang dipilih

document.getElementById('laporanBody').addEventListener('change', (e) => {
  if (e.target.tagName === 'SELECT') {
    const selected = e.target.value;

    if (selected.includes('Edit') || selected.includes('Hapus')) {
      const lastShown = localStorage.getItem('lastShownSaeful');
      const now = Date.now();

      // cek apakah sudah lebih dari 1 jam (3600000 ms)
      if (!lastShown || (now - parseInt(lastShown, 10)) > 3600000) {
        pendingAction = selected;
        passwordModal.classList.remove('hidden'); // tampilkan modal password
      } else {
        // langsung jalankan aksi tanpa password
        jalankanAksi(selected);
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
  if (action.includes("Edit")) {
    console.log("Lakukan proses edit...");
    // tambahkan logika edit di sini
  } else if (action.includes("Hapus")) {
    console.log("Lakukan proses hapus...");
    // tambahkan logika hapus di sini
  }
}

// fungsi bantu untuk sembunyikan semua section
function hideAllSections() {
  inputArkas.classList.add('hidden');
  laporanSection.classList.add('hidden');
}

// Klik menu ARKAS → tampilkan form upload
menuArkas.addEventListener('click', () => {
  hideAllSections();
  inputArkas.classList.remove('hidden');
});

// Klik menu LAPORAN BOS → tampilkan tabel BOS
menuLaporanBos.addEventListener('click', (e) => {
  e.preventDefault();
  hideAllSections();
  laporanSection.classList.remove('hidden');
});

// Fungsi simulasi upload
function simulateUpload(file) {
  progressContainer.classList.remove('hidden');
  let progress = 0;

  const interval = setInterval(() => {
    progress += 10;
    progressBar.style.width = progress + '%';
    progressBar.textContent = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      result.classList.remove('hidden');
      displayData(file); // tampilkan isi file Excel
    }
  }, 300);
}

// Event pilih file
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) simulateUpload(file);
});

// Event drag & drop
dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.classList.add('bg-gray-200');
});

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('bg-gray-200');
});

// Fungsi tampilkan isi file Excel
function displayData(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: "" });

    let table = `
      <div class="overflow-x-auto">
        <table class="table-auto border-collapse border border-gray-400 mt-4 w-full text-sm">
          <thead class="bg-blue-200 text-black font-bold">
            <tr>
              ${rows[0].map(cell => `<th class="border border-gray-400 px-2 py-1">${cell}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
    `;

    rows.slice(1).forEach((row, idx) => {
      table += `<tr class="${idx % 2 === 0 ? 'bg-white text-black' : 'bg-gray-100 text-black'}">`;
      row.forEach(cell => {
        let value = cell;
        if (typeof cell === "number") {
          value = cell.toLocaleString("id-ID"); // format ribuan
        }
        table += `<td class="border border-gray-400 px-2 py-1">${value}</td>`;
      });
      table += '</tr>';
    });

    table += `</tbody></table></div>`;

    result.innerHTML = `
      <h3 class="text-lg font-semibold mb-2">Data ARKAS yang diinput:</h3>
      ${table}
    `;
  };
  reader.readAsArrayBuffer(file);
}

function tambahLaporanBos(rowData) {
  const laporanBody = document.getElementById('laporanBody');
  const noUrut = laporanBody.querySelectorAll('tr').length + 1;

  laporanBody.innerHTML += `
    <tr>
      <td class="border px-2 py-1">${noUrut}</td>
      <td class="border px-2 py-1">${rowData[0] || '-'}</td> <!-- Kode Rek -->
      <td class="border px-2 py-1">${rowData[1] || '-'}</td> <!-- Uraian -->
      <td class="border px-2 py-1">${rowData[2] || '-'}</td> <!-- Vol -->
      <td class="border px-2 py-1">${rowData[3] || '-'}</td> <!-- Sat -->
      <td class="border px-2 py-1">${rowData[4] || '-'}</td> <!-- H.Sat -->
      <td class="border px-2 py-1">${rowData[5] || '-'}</td> <!-- Jumlah -->
      <td class="border px-2 py-1">${rowData[6] || '-'}</td> <!-- Total -->
      <td class="border px-2 py-1">
        <select class="bg-blue-100 text-black rounded px-2 py-1">
          <option>Masuk</option>
          <option>Keluar</option>
        </select>
      </td>
      <td class="border px-2 py-1">
        <select class="bg-blue-100 text-black rounded px-2 py-1">
          <option>✏️ Edit</option>
          <option>🗑️ Hapus</option>
        </select>
      </td>
    </tr>
  `;
}

function displayData(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: "" });

    let table = `
      <div class="overflow-x-auto">
        <table class="table-auto border-collapse border border-gray-400 mt-4 w-full text-sm">
          <thead class="bg-blue-200 text-black font-bold">
            <tr>
              ${rows[0].map(cell => `<th class="border border-gray-400 px-2 py-1">${cell}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
    `;

    rows.slice(1).forEach((row, idx) => {
      table += `<tr class="${idx % 2 === 0 ? 'bg-white text-black' : 'bg-gray-100 text-black'}">`;
      row.forEach(cell => {
        let value = cell;
        if (typeof cell === "number") {
          value = cell.toLocaleString("id-ID"); // format ribuan
        }
        table += `<td class="border border-gray-400 px-2 py-1">${value}</td>`;
      });
      table += '</tr>';

      // 🚀 Masukkan otomatis ke Laporan BOS
      tambahLaporanBos(row);
    });

    table += `</tbody></table></div>`;

    result.innerHTML = `
      <h3 class="text-lg font-semibold mb-2">Data ARKAS yang diinput:</h3>
      ${table}
    `;
  };
  reader.readAsArrayBuffer(file);
}
// Tangani aksi di tabel Laporan BOS
document.getElementById('laporanBody').addEventListener('change', (e) => {
  if (e.target.tagName === 'SELECT') {
    const selected = e.target.value;

    if (selected.includes('Edit') || selected.includes('Hapus')) {
      const lastShown = localStorage.getItem('lastShownSaeful');
      const now = Date.now();

      // cek apakah sudah lebih dari 1 jam (3600000 ms)
      if (!lastShown || (now - parseInt(lastShown, 10)) > 3600000) {
        
        // tampilkan field password
const inputPass = prompt("Masukkan password untuk melanjutkan:");
if (inputPass === "saeful") {
  alert("Password benar. Lanjut ke aksi: " + selected);
  localStorage.setItem('lastShownSaeful', now);
  // di sini kamu bisa panggil fungsi edit/hapus sesuai pilihan
} else {
  alert("Password salah!");
}
          // di sini kamu bisa panggil fungsi edit/hapus sesuai pilihan
        } else {
          alert("Password salah!");
        }
      } else {
        console.log("Password sudah dimasukkan, tunggu 1 jam lagi.");
      }

      // reset dropdown ke default
      e.target.selectedIndex = 0;
    }
  }
});
