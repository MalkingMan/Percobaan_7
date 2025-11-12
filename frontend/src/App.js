import React, { useState, useEffect } from 'react';
// Impor semua yang diperlukan dari react-router-dom dan axios
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfilePage from './components/ProfilePage';

// --- KOMPONEN LOGINPAGE ---
// Kita letakkan semua komponen di satu file untuk mengatasi masalah resolusi
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
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md px-8 py-10 text-left bg-slate-800 shadow-2xl rounded-lg">
        <h3 className="text-3xl font-bold text-center text-white">Login Akun</h3>
        <p className="text-center text-slate-400 mt-2">Selamat datang kembali!</p>
        
        {error && (
          <div className="px-4 py-3 mt-4 text-red-300 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg" role="alert">
            <span className="font-medium">Error!</span> {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mt-4">
            <div>
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
            <div className="flex items-center justify-between mt-6">
              <button className="w-full px-6 py-2 text-slate-900 bg-cyan-500 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all font-semibold">
                Login
              </button>
            </div>
            <div className="mt-6 text-center">
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

// --- KOMPONEN REGISTERPAGE ---
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
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Registrasi gagal');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md px-8 py-10 text-left bg-slate-800 shadow-2xl rounded-lg">
        <h3 className="text-3xl font-bold text-center text-white">Buat Akun Baru</h3>
        <p className="text-center text-slate-400 mt-2">Silakan isi data diri Anda.</p>

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
              <button className="w-full px-6 py-2 text-slate-900 bg-cyan-500 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all font-semibold">
                Register
              </button>
            </div>
            <div className="mt-6 text-center">
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

// --- KOMPONEN DASHBOARDPAGE ---

// --- Icon SVGs ---
const UserIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A1.5 1.5 0 0 1 18 21.75H6a1.5 1.5 0 0 1-1.499-1.632Z" />
  </svg>
);
const CalendarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25m10.5-2.25v2.25M6.75 21h10.5a2.25 2.25 0 0 0 2.25-2.25V7.5a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v11.25a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);
const ClipboardListIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-1.125 0-2.062.938-2.062 2.063v15.375c0 1.125.938 2.063 2.063 2.063h12.75c1.125 0 2.063-.938 2.063-2.063V15.188m-5.625-1.5-2.813-2.813m0 0L8.25 15.188m2.813-2.813L15.188 8.25m-2.813 2.813-2.813 2.813m0 0-2.813-2.813m2.813 2.813 2.813 2.813M15.75 5.25v2.25h2.25m-2.25 0h-2.25v-2.25m2.25 0v2.25m-2.25 0V5.25m0 2.25v-2.25m2.25 0h2.25" />
    <path d="M3.375 12.75h4.125" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.375 16.125h4.125" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LogOutIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3H7.5A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H21" />
  </svg>
);
const BookIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.12 0-2.06.91-2.06 2.06v11.128c0 1.12.94 2.06 2.06 2.06a8.967 8.967 0 0 1 6-2.292m0-14.25a8.967 8.967 0 0 1 6 2.292c1.12 0 2.06.91 2.06 2.06v11.128c0 1.12-.94 2.06-2.06 2.06a8.967 8.967 0 0 0-6-2.292m0-14.25v14.25" />
    </svg>
);
// --- Akhir Icon SVGs ---

// --- Mock Data ---
const jadwalHariIni = [
  { id: 1, nama: 'Pemrograman Web', waktu: '08:00 - 10:00', ruang: 'Lab SI-3' },
  { id: 2, nama: 'Basis Data Lanjut', waktu: '10:00 - 12:00', ruang: 'Teori-7' },
  { id: 3, nama: 'Kecerdasan Buatan', waktu: '13:00 - 15:00', ruang: 'FTI-2.4' },
];
const tugasMendatang = [
  { id: 1, nama: 'Tugas 7 - Pemrograman Web', deadline: '15 Nov 2025' },
  { id: 2, nama: 'Proposal Proyek Basis Data', deadline: '18 Nov 2025' },
];

function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await axios.get('http://localhost:3001/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]); // navigate ditambahkan sebagai dependensi useEffect

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <svg className="animate-spin h-10 w-10 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-lg text-slate-400">Selamat datang kembali, {user.nama}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 mt-4 sm:mt-0 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
          >
            <LogOutIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4">
                <span className="flex items-center justify-center h-16 w-16 rounded-full bg-cyan-600 text-white text-2xl font-bold">
                  {getInitials(user.nama)}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-white">{user.nama}</h2>
                  <p className="text-sm text-slate-400">{user.email}</p>
                </div>
              </div>
              <div className="mt-6 border-t border-slate-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Status:</span>
                  <span className="px-3 py-1 text-sm font-semibold text-cyan-900 bg-cyan-200 rounded-full capitalize">
                    {user.role}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all"
                >
                  Lihat Profile
                </button>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <ClipboardListIcon className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Tugas Mendatang</h2>
              </div>
              <ul className="space-y-4">
                {tugasMendatang.map(tugas => (
                  <li key={tugas.id} className="flex justify-between items-center p-3 bg-slate-700 rounded-md hover:bg-slate-600">
                    <span className="font-medium text-slate-200">{tugas.nama}</span>
                    <span className="text-sm text-red-400 font-semibold">{tugas.deadline}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <CalendarIcon className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Jadwal Kuliah Hari Ini</h2>
              </div>
              <div className="space-y-4">
                {jadwalHariIni.map(jadwal => (
                  <div key={jadwal.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 border-l-4 border-cyan-500">
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-400">{jadwal.nama}</h3>
                      <p className="text-sm text-slate-400">{jadwal.ruang}</p>
                    </div>
                    <span className="mt-2 sm:mt-0 px-3 py-1 text-sm font-medium text-cyan-300 bg-slate-600 rounded-full border border-slate-500">
                      {jadwal.waktu}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4">Info Kampus</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <a href="#" className="flex flex-col items-center p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                  <BookIcon className="w-8 h-8 text-cyan-400 mb-2" />
                  <span className="text-sm font-medium text-slate-200">SIAKAD</span>
                </a>
                <a href="#" className="flex flex-col items-center p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                  <UserIcon className="w-8 h-8 text-cyan-400 mb-2" />
                  <span className="text-sm font-medium text-slate-200">Dosen</span>
                </a>
                <a href="#" className="flex flex-col items-center p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                  <ClipboardListIcon className="w-8 h-8 text-cyan-400 mb-2" />
                  <span className="text-sm font-medium text-slate-200">Perpustakaan</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// --- KOMPONEN APP UTAMA (ROUTER) ---
function App() {
  return (
    // Hapus semua layout global dari sini
    // Biarkan komponen (LoginPage, RegisterPage, DashboardPage)
    // yang mengatur layout-nya sendiri (misal: min-h-screen)
    <Router>
      <Routes>
        {/* Rute-rute ini sekarang akan berfungsi karena LoginPage, RegisterPage, 
          dan DashboardPage didefinisikan dalam file yang sama di atas.
        */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Arahkan rute dasar ke login */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;