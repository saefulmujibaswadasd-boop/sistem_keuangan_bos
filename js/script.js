// script.js
function validateForm() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // Validasi kosong
  if (user === "" || pass === "") {
    alert("Username dan Password wajib diisi!");
    return false;
  }

  // Validasi login sementara
  if (user === "admin" && pass === "1234") {
    alert("Login berhasil sebagai admin!");
    window.location.href = "dashboard.html"; // redirect ke dashboard
    return false; // cegah submit default
  } else {
    alert("Username atau Password salah!");
    return false;
  }
}