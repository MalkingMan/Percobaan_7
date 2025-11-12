# Laporan Tugas 7 - Pengembangan Aplikasi Web

## Screenshot Aplikasi

### Halaman Login
![Halaman Login](https://via.placeholder.com/800x600.png?text=Screenshot+Halaman+Login)
*(Silakan ganti placeholder ini dengan screenshot halaman login Anda)*

### Halaman Registrasi
![Halaman Registrasi](https://via.placeholder.com/800x600.png?text=Screenshot+Halaman+Registrasi)
*(Silakan ganti placeholder ini dengan screenshot halaman registrasi Anda)*

### Halaman Dashboard
![Halaman Dashboard](https://via.placeholder.com/800x600.png?text=Screenshot+Halaman+Dashboard)
*(Silakan ganti placeholder ini dengan screenshot halaman dashboard Anda)*

## Penjelasan Singkat Integrasi React ↔ Node.js ↔ JWT

Aplikasi ini menggunakan arsitektur klien-server modern dengan frontend yang dibangun menggunakan **React** dan backend yang dibangun menggunakan **Node.js** dengan framework **Express**. Otentikasi pengguna dikelola menggunakan **JSON Web Tokens (JWT)**.

Berikut adalah alur kerja integrasinya:

1.  **Registrasi Pengguna (Frontend → Backend):**
    *   Pengguna mengisi formulir registrasi di aplikasi React.
    *   Ketika formulir dikirim, React menggunakan `axios` untuk mengirim permintaan `POST` ke endpoint `/api/auth/register` di server Node.js.
    *   Server menerima data (nama, email, password), mengenkripsi password menggunakan `bcryptjs`, dan menyimpannya dalam array `users` (dalam aplikasi nyata, ini akan menjadi database).

2.  **Login Pengguna (Frontend → Backend → Frontend):**
    *   Pengguna memasukkan email dan password di halaman login React.
    *   React mengirimkan permintaan `POST` ke endpoint `/api/auth/login` di server.
    *   Server memverifikasi kredensial: mencari pengguna berdasarkan email dan membandingkan hash password menggunakan `bcryptjs`.
    *   Jika kredensial valid, server membuat JWT menggunakan `jsonwebtoken`. Token ini berisi informasi pengguna (payload) dan ditandatangani dengan kunci rahasia (`SECRET_KEY`).
    *   Server mengirimkan token ini kembali ke aplikasi React.

3.  **Akses Halaman Terproteksi (Frontend ↔ Backend):**
    *   Setelah login berhasil, aplikasi React menyimpan JWT di `localStorage` browser.
    *   Ketika pengguna mencoba mengakses halaman yang dilindungi (misalnya, Dashboard), React mengambil token dari `localStorage`.
    *   Token tersebut disertakan dalam *header* `Authorization` dari permintaan `GET` ke endpoint `/api/auth/me`.
    *   Server menerima permintaan, mengekstrak token dari header, dan memverifikasinya menggunakan `jwt.verify()`.
    *   Jika token valid, server mengirimkan kembali data profil pengguna yang ada di dalam token. Jika tidak, server akan mengirimkan status error (misalnya, 401 Unauthorized).
    *   Aplikasi React kemudian menampilkan data pengguna di halaman Dashboard atau mengarahkan pengguna kembali ke halaman login jika token tidak valid.

4.  **Logout:**
    *   Pengguna mengklik tombol logout di frontend.
    *   Aplikasi React menghapus token dari `localStorage`, secara efektif "mengakhiri sesi" di sisi klien.
    *   Pengguna diarahkan kembali ke halaman login.

Dengan cara ini, frontend dan backend dapat berkomunikasi secara aman dan efisien, memisahkan logika antarmuka pengguna dari logika bisnis dan otentikasi.
