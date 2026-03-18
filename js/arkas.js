// Referensi elemen
const menuArkas = document.getElementById('menu-arkas');
const inputArkas = document.getElementById('input-arkas');
const fileInput = document.getElementById('fileInput');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const result = document.getElementById('result');
const dropArea = document.getElementById('drop-area');

const menuLaporanBos = document.querySelector('a[href="#laporan-bos"]');
const laporanSection = document.getElementById('laporan-bos');

// Modal password
const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const cancelBtn = document.getElementById('cancelBtn');
const submitBtn = document.getElementById('submitBtn');
let pendingAction = null;

// Fungsi sembunyikan semua section
function hideAllSections() {
  inputArkas.classList.add('hidden');
  laporanSection.classList.add('hidden');
}

// Klik menu ARKAS
menuArkas.addEventListener('click', () => {
  hideAllSections();
  inputArkas.classList.remove('hidden');
});

// Klik menu LAPORAN BOS
menuLaporanBos.addEventListener('click', (e) => {
  e.preventDefault();
  hideAllSections();
  laporanSection.classList.remove('hidden');
});

// Simulasi upload
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
      displayData(file);
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

// Tampilkan isi file Excel + masukkan ke Laporan BOS
function displayData(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: "" });
    rows.slice(1).forEach((row) => {
      tambahLaporanBos(row);
    });
  };
  reader.readAsArrayBuffer(file);
}

// Tambah baris ke Laporan BOS
function tambahLaporanBos(rowData) {
  const laporanBody = document.getElementById('laporanBody');
  const noUrut = laporanBody.querySelectorAll('tr').length + 1;
  const jumlah = volVal * hSatVal;
  cells[7].textContent = jumlah.toLocaleString("id-ID");
  cells[9].textContent = jumlah.toLocaleString("id-ID");
}

  function formatAngka(val) {
    return val && !isNaN(val) ? parseFloat(val).toLocaleString("id-ID") : val || '-';
  }

  laporanBody.innerHTML += `
    <tr>
      <td class="border px-2 py-1">${noUrut}</td>
      <td class="border px-2 py-1">${rowData[0] || '-'}</td>
      <td class="border px-2 py-1">${rowData[1] || '-'}</td>
      <td class="border px-2 py-1">${formatAngka(rowData[2])}</td>
      <td class="border px-2 py-1">${rowData[3] || '-'}</td>
      <td class="border px-2 py-1">${formatAngka(rowData[4])}</td>
      <td class="border px-2 py-1">${formatAngka(rowData[5])}</td>
      <td class="border px-2 py-1">
        <select class="bg-blue-100 text-black rounded px-2 py-1">
          <option>Masuk</option>
          <option>Keluar</option>
      <td class="border px-2 py-1">${formatAngka(rowData[6])}</td>
      <td class="border px-2 py-1">
        <select class="bg-blue-100 text-black rounded px-2 py-1">
          <option>Pilih</option>
          <option>✏️ Edit</option>
          <option>🗑️ Hapus</option>
      <td class="border px-2 py-1">
        <select class="bg-blue-100 text-black rounded px-2 py-1">
          <option>I</option>
          <option>II</option>
          <option>III</option>
          <option>IV</option>
        </select>
     <td class="border px-2 py-1">
        <select class="bg-blue-100 text-black rounded px-2 py-1">
          <option>Kwitansi</option>
          <option>Dinas</option>
          <option>Nota</option>
          <option>Lainnya</option>
        </select>
        </tr>
`;
}

// 🔐 Event listener dropdown Aksi
document.getElementById('laporanBody').addEventListener('change', (e) => {
  if (e.target.tagName === 'SELECT') {
    const selected = e.target.value.trim();
    if (selected === '✏️ Edit' || selected === '🗑️ Hapus') {
      const lastShown = localStorage.getItem('lastShownSaeful');
      const now = Date.now();

      // cek apakah sudah lewat 1 jam
      if (!lastShown || (now - parseInt(lastShown, 10)) > 3600000) {
        pendingAction = { action: selected, row: e.target.closest('tr') };
        passwordModal.classList.remove('hidden'); // tampilkan modal password
      } else {
        jalankanAksi(selected, e.target.closest('tr')); // langsung jalankan
      }

      e.target.selectedIndex = 0;
    }
  }
});

// tombol batal
cancelBtn.addEventListener('click', () => {
  passwordModal.classList.add('hidden');
  passwordInput.value = "";
  pendingAction = null;
});

// tombol submit modal
submitBtn.addEventListener('click', () => {
  if (passwordInput.value === "saeful") {
    // simpan waktu terakhir password benar
    localStorage.setItem('lastShownSaeful', Date.now());

    jalankanAksi(pendingAction.action, pendingAction.row);
    passwordModal.classList.add('hidden');
    passwordInput.value = "";
    pendingAction = null;
  } else {
    alert("Password salah!");
  }
});

// fungsi aksi edit/hapus
function jalankanAksi(action, row) {
  if (action === "✏️ Edit") {
    const cells = row.querySelectorAll('td');
    const kodeRek = cells[1].textContent;
    const uraian = cells[2].textContent;
    const vol = cells[3].textContent.replace(/\./g,'').replace(/,/g,''); // ambil angka mentah
    const sat = cells[4].textContent;
    const hSat = cells[5].textContent.replace(/\./g,'').replace(/,/g,'');

    // tampilkan form edit di bawah baris
   row.insertAdjacentHTML('afterend', `
      <tr class="bg-yellow-100">
        <td colspan="10">
          <div class="p-2 space-x-2 text-gray-800">
            <label>Kode Rek: 
              <input id="editKode" value="${kodeRek}" 
                     class="border px-2 py-1 text-gray-800">
            </label>
            <label>Uraian: 
              <input id="editUraian" value="${uraian}" 
                     class="border px-2 py-1 text-gray-800">
            </label>
            <label>Vol: 
              <input id="editVol" type="number" value="${vol}" 
                     class="border px-2 py-1 text-gray-800">
            </label>
            <label>Sat: 
              <input id="editSat" value="${sat}" 
                     class="border px-2 py-1 text-gray-800">
            </label>
            <label>H.Sat: 
              <input id="editHsat" type="number" value="${hSat}" 
                     class="border px-2 py-1 text-gray-800">
            </label>
            <button id="saveEdit" 
                    class="bg-green-500 text-white px-3 py-1 rounded">
              Simpan
            </button>
          </div>
        </td>
      </tr>
    `);

    // hitung otomatis Jumlah saat Vol/H.Sat berubah
    document.getElementById('editVol').addEventListener('input', updateJumlah);
    document.getElementById('editHsat').addEventListener('input', updateJumlah);

    function updateJumlah() {
      const volVal = parseFloat(document.getElementById('editVol').value) || 0;
      const hSatVal = parseFloat(document.getElementById('editHsat').value) || 0;
      cells[6].textContent = (volVal * hSatVal).toLocaleString("id-ID");
    }

    // tombol simpan edit
    document.getElementById('saveEdit').addEventListener('click', () => {
      cells[1].textContent = document.getElementById('editKode').value;
      cells[2].textContent = document.getElementById('editUraian').value;
      cells[3].textContent = parseFloat(document.getElementById('editVol').value).toLocaleString("id-ID");
      cells[4].textContent = document.getElementById('editSat').value;
      cells[5].textContent = parseFloat(document.getElementById('editHsat').value).toLocaleString("id-ID");
      updateJumlah();
      row.nextElementSibling.remove(); // hapus form edit
    });

  } else if (action === "🗑️ Hapus") {
    row.remove(); // langsung hapus baris
  }
}
