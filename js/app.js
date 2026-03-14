document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("aside nav a");
  const content = document.getElementById("content");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("data-page");

      // INPUT RKAS
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
              <input type="file" id="fileUpload" class="w-full p-2 rounded bg-blue-100 text-black">
            </div>
            <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
              Simpan
            </button>
          </form>
        `;
      }

      // LAPORAN BOS
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
            <tbody id="bosTableBody"></tbody>
          </table>
        `;

        // panggil renderBosTable dari script.js
        setTimeout(renderBosTable, 100);
      }

      // SIPLAH
      else if (page === "siplah") {
        content.innerHTML = `
          <h2 class="text-xl font-bold mb-4">SIPLAH</h2>
          <p class="text-gray-200">Integrasi belanja sekolah melalui SIPLAH.</p>
          <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4">
            Tambah Transaksi SIPLAH
          </button>
        `;
      }

      // PERUBAHAN
      else if (page === "perubahan") {
        content.innerHTML = `
          <h2 class="text-xl font-bold mb-4">PERUBAHAN</h2>
          <form class="space-y-4">
            <div>
              <label class="block mb-2">Jenis Perubahan</label>
              <select class="w-full p-2 rounded bg-blue-100 text-black">
                <option>Tambah Anggaran</option>
                <option>Kurangi Anggaran</option>
                <option>Revisi Kegiatan</option>
              </select>
            </div>
            <div>
              <label class="block mb-2">Keterangan</label>
              <textarea class="w-full p-2 rounded bg-blue-100 text-black" rows="4"></textarea>
            </div>
            <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
              Simpan Perubahan
            </button>
          </form>
        `;
      }
    });
  });
});
