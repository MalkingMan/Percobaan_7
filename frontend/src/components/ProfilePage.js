import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ArrowLeftIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [nama, setNama] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
        setNama(res.data.nama);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put('http://localhost:3001/api/auth/profile', 
        { nama },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      localStorage.setItem('token', res.data.token);
      setSuccess('Profile berhasil diupdate!');
      setUser({ ...user, nama });
      setIsEditing(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Gagal mengupdate profile');
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase().substring(0, 2);
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

  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Kembali ke Dashboard</span>
          </button>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 px-6 py-8">
              <div className="flex items-center space-x-4">
                <span className="flex items-center justify-center h-20 w-20 rounded-full bg-white text-cyan-800 text-3xl font-bold">
                  {getInitials(user.nama)}
                </span>
                <div>
                  <h1 className="text-3xl font-bold text-white">Profile Saya</h1>
                  <p className="text-cyan-100 mt-1">Kelola informasi akun Anda</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="mx-6 mt-4 px-4 py-3 text-red-300 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg" role="alert">
                <span className="font-medium">Error!</span> {error}
              </div>
            )}

            {success && (
              <div className="mx-6 mt-4 px-4 py-3 text-green-300 bg-green-900 bg-opacity-50 border border-green-700 rounded-lg" role="alert">
                <span className="font-medium">Sukses!</span> {success}
              </div>
            )}

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nama Lengkap
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      required
                    />
                  ) : (
                    <p className="px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-md">
                      {user.nama}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <p className="px-4 py-2 bg-slate-700 border border-slate-600 text-slate-400 rounded-md">
                    {user.email}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Email tidak dapat diubah</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Role
                  </label>
                  <p className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-md">
                    <span className="px-3 py-1 text-sm font-semibold text-cyan-900 bg-cyan-200 rounded-full capitalize">
                      {user.role}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Role tidak dapat diubah</p>
                </div>

                <div className="flex gap-4 pt-4">
                  {isEditing ? (
                    <>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-2 text-slate-900 bg-cyan-500 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all font-semibold"
                      >
                        Simpan Perubahan
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setNama(user.nama);
                          setError('');
                          setSuccess('');
                        }}
                        className="flex-1 px-6 py-2 text-slate-100 bg-slate-700 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all font-semibold"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="w-full px-6 py-2 text-slate-900 bg-cyan-500 rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all font-semibold"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
