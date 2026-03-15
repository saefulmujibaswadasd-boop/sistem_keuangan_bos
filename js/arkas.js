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
      fileList.innerHTML = `<li>${file.name}</li>`;
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

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.classList.remove('bg-gray-200');
  const file = e.dataTransfer.files[0];
  if (file) simulateUpload(file);
});