import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Pastikan 'Link' di-import

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Bersihkan error sebelumnya
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login gagal');
    }
  };

  return (
    // Latar belakang diubah ke slate-900
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      {/* Kartu diubah ke slate-800 dengan shadow-2xl agar lebih menonjol */}
      <div className="w-full max-w-md px-8 py-10 text-left bg-slate-800 shadow-2xl rounded-lg">
        {/* Teks diubah ke warna putih */}
        <h3 className="text-3xl font-bold text-center text-white">Login Akun</h3>
        {/* Teks sekunder diubah ke slate-400 */}
        <p className="text-center text-slate-400 mt-2">Selamat datang kembali!</p>
        
        {/* Pesan error versi dark mode */}
        {error && (
          <div className="px-4 py-3 mt-4 text-red-300 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg" role="alert">
            <span className="font-medium">Error!</span> {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mt-4">
            <div>
              {/* Label diubah ke slate-300 */}
              <label className="block font-medium text-slate-300" htmlFor="email">Email</label>
              {/* Input field versi dark mode */}
              <input id="email" type="email" placeholder="contoh@email.com"
                     className="w-full px-4 py-2 mt-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                     value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mt-4">
              <label className="block font-medium text-slate-300" htmlFor="password">Password</label>
              {/* Input field versi dark mode */}
              <input id="password" type="password" placeholder="Password"
                     className="w-full px-4 py-2 mt-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                     value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="flex items-center justify-between mt-6">
              {/* Tombol diubah ke warna cyan dengan teks gelap untuk kontras */}
              <button className="w-full px-6 py-2 text-slate-900 bg-cyan-500 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all font-semibold">
                Login
              </button>
            </div>
            <div className="mt-6 text-center">
              {/* Link diubah ke warna cyan */}
              <p className="text-sm text-slate-400">
                Belum punya akun?{' '}
                <Link to="/register" className="text-cyan-500 hover:underline font-medium">
                  Daftar di sini
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;