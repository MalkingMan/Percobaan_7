import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Pastikan 'Link' di-import

function RegisterPage() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mahasiswa');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Bersihkan error sebelumnya
    try {
      await axios.post('http://localhost:3001/api/auth/register', { nama, email, password, role });
      // Gunakan alert kustom jika ada, atau alert bawaan untuk sementara
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (err) {
      // Ini adalah perbaikan: Logika error seharusnya ada di dalam catch block
      setError(err.response ? err.response.data.message : 'Registrasi gagal');
    }
  };

  return (
    // Latar belakang diubah ke slate-900
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      {/* Kartu diubah ke slate-800 */}
      <div className="w-full max-w-md px-8 py-10 text-left bg-slate-800 shadow-2xl rounded-lg">
        {/* Teks diubah ke warna putih */}
        <h3 className="text-3xl font-bold text-center text-white">Buat Akun Baru</h3>
        {/* Teks sekunder diubah ke slate-400 */}
        <p className="text-center text-slate-400 mt-2">Silakan isi data diri Anda.</p>

        {/* Pesan error versi dark mode (Lokasi ini sudah benar, di dalam JSX) */}
        {error && (
          <div className="px-4 py-3 mt-4 text-red-300 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg" role="alert">
            <span className="font-medium">Error!</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mt-4">
            <div>
              <label className="block font-medium text-slate-300" htmlFor="nama">Nama Lengkap</label>
              <input id="nama" type="text" placeholder="Nama Anda"
                     className="w-full px-4 py-2 mt-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                     value={nama} onChange={(e) => setNama(e.target.value)} required />
            </div>
            <div className="mt-4">
              <label className="block font-medium text-slate-300" htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="contoh@email.com"
                     className="w-full px-4 py-2 mt-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                     value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mt-4">
              <label className="block font-medium text-slate-300" htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Password"
                     className="w-full px-4 py-2 mt-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                     value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mt-4">
              <label className="block font-medium text-slate-300" htmlFor="role">Role</label>
              {/* Select field versi dark mode */}
              <select
                id="role"
                className="w-full px-4 py-2 mt-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="mahasiswa">Mahasiswa</option>
                <option value="dosen">Dosen</option>
              </select>
            </div>
            <div className="flex items-baseline justify-between mt-6">
              {/* Tombol diubah ke warna cyan */}
              <button className="w-full px-6 py-2 text-slate-900 bg-cyan-500 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all font-semibold">
                Register
              </button>
            </div>
            <div className="mt-6 text-center">
              {/* Link diubah ke warna cyan */}
              <p className="text-sm text-slate-400">
                Sudah punya akun?{' '}
                <Link to="/login" className="text-cyan-500 hover:underline font-medium">
                  Login di sini
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;