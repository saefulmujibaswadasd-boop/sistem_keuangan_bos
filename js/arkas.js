const menuArkas = document.getElementById('menu-arkas');
const inputArkas = document.getElementById('input-arkas');
const fileInput = document.getElementById('fileInput');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const result = document.getElementById('result');
const fileList = document.getElementById('file-list');
const dropArea = document.getElementById('drop-area');

// Klik menu ARKAS → tampilkan form upload
menuArkas.addEventListener('click', () => {
  inputArkas.classList.remove('hidden');
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

  // tampilkan isi file Excel
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
function displayData(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Ambil sheet pertama
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

    // Buat tabel HTML (semua baris)
    let table = '<table class="table-auto border-collapse border border-gray-400 mt-4">';
    rows.forEach(row => {
      table += '<tr>';
      row.forEach(cell => {
        table += `<td class="border border-gray-400 px-2 py-1">${cell}</td>`;
      });
      table += '</tr>';
    });
    table += '</table>';

    result.innerHTML = `
      <h3 class="text-lg font-semibold mb-2">Data ARKAS yang diinput:</h3>
      ${table}
    `;
  };
  reader.readAsArrayBuffer(file);
}
dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.classList.remove('bg-gray-200');
  const file = e.dataTransfer.files[0];
  if (file) simulateUpload(file);
});
