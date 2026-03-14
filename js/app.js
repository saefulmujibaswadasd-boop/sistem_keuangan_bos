document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("aside nav a");
  const content = document.getElementById("content");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("data-page");

      if (page === "input-rkas") {
        content.innerHTML = `
          <h2 class="text-xl font-bold mb-4">INPUT RKAS</h2>
          <form id="rkasForm" class="space-y-4">
            <div>
              <label class="block mb-2">Judul RKAS</label>
              <input type="text" id="judulRkas" class="w-full p-2 rounded bg-blue-100 text-black" placeholder="Masukkan judul RKAS">
            </div>
            <div>
              <label class="block mb-2">Upload File RKAS</label>
              <div id="dropArea" class="border-2 border-dashed border-blue-400 rounded-lg p-6 text-center cursor-pointer">
                <p class="text-gray-600">Drag & Drop file di sini atau klik untuk upload</p>
                <input type="file" class="hidden" id="fileUpload">
              </div>
            </div>
            <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
              Simpan
            </button>
          </form>
        `;
      }

      else if (page === "laporan-bos") {
        content.innerHTML = `
          <h2 class="text-xl font-bold mb-4">LAPORAN BOS</h2>
          <table class="w-full border-collapse border border-blue-400 text-black bg-white">
            <thead class="bg-blue-200">
              <tr>
                <th class="border border-blue-400 px-4 py-2">No</th>
                <th class="border border-blue-400 px-4 py-2">Tanggal</th>
                <th class="border border-blue-400 px-4 py-2">Keterangan</th>
                <th class="border border-blue-400 px-4 py-2">Jumlah</th>
                <th class="border border-blue-400 px-4 py-2">Triwulan</th>
                <th class="border border-blue-400 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody id="bosTableBody">
              <!-- Data akan dimasukkan lewat script.js -->
            </tbody>
          </table>
        `;
      }
    });
  });
});
