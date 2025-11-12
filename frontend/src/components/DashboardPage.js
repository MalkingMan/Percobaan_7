import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-5">Dashboard</h1>
      <p className="text-xl mb-3">Selamat Datang di Halaman Dashboard, {user.nama}!</p>
      <div className="mb-5">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <button
        onClick={handleLogout}
        className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-900"
      >
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;