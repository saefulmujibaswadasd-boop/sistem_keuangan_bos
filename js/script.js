// Contoh data BOS (bisa diganti hasil upload/localStorage)
const bosData = [
  { no: 1, tanggal: "01/01/2026", ket: "Pembelian Buku", jumlah: "Rp 2.000.000" },
  { no: 2, tanggal: "15/02/2026", ket: "Perbaikan Meja", jumlah: "Rp 1.500.000" }
];

function renderBosTable() {
  const tbody = document.getElementById("bosTableBody");
  if (!tbody) return;

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

// panggil saat menu BOS diklik
document.addEventListener("click", e => {
  if (e.target.matches("[data-page='laporan-bos']")) {
    setTimeout(renderBosTable, 100); // delay sedikit agar table sudah ada
  }
});
