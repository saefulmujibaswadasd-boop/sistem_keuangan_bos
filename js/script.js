<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - SD Negeri Wonokerto</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="css/output.css">
</head>
<body class="bg-gradient-to-br from-blue-900 via-green-800 to-blue-900 min-h-screen flex items-center justify-center">
  <div class="w-md h-auto bg-white/10 p-2 rounded-xl">

    <!-- Card Glassmorphism -->
    <div class="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl w-full max-w-full p-10">
      
      <!-- Logo -->
      <div class="flex justify-center mb-4">
        <div class="bg-gradient-to-tr from-red-200 to-yellow-600 p-1 rounded-full">
          <img src="assets/ks_kartini.png" alt="Logo SD" class="w-20 h-20 rounded-full border-2 border-gray shadow-lg">
        </div>
      </div>

      <!-- Judul -->
      <h1 class="text-2xl font-extrabold text-center text-gray-400 mb-2">PORTAL KEUANGAN BOS</h1>
      <h2 class="text-1xl font-extrabold text-center text-gray-400 mb-12">SD NEGERI WONOKERTO</h2>
      <p class="text-1xl text-center text-gray-400 mb-2">Masuk untuk mengelola data</p>

      <!-- Form -->
      <!-- DIBENAHI: hapus action dan method, ganti dengan id -->
      <form id="loginForm" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-200">Username</label>
          <input type="text" id="username" name="username" placeholder="username"
            class="mt-1 w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none" required>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-200">Password</label>
          <input type="password" id="password" name="password" placeholder="••••••••"
            class="mt-1 w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none" required>
        </div>

        <!-- Tombol -->
        <button type="submit"
          class="w-1/2 block mx-auto bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 py-2 rounded-lg font-bold hover:from-yellow-500 hover:to-yellow-700 transition duration-300 shadow-lg">
          Login
        </button>
      </form>

      <!-- Script -->
      <script src="js/script.js"></script>

      <!-- Link -->
      <div class="mt-6 text-center">
        <a href="#" class="text-red-800 hover:underline">Lupa Password?</a>
      </div>
    </div>
  </div>
</body>
</html>
