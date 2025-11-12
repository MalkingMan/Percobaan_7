import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
const [nama, setNama] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState('mahasiswa');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
try {
await axios.post('http://localhost:3001/api/auth/register', { nama, email, password, role });
alert('Registrasi berhasil!');
navigate('/login');
} catch (err) {
setError(err.response ? err.response.data.message : 'Registrasi gagal');
}
};

return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold text-center">Register</h3>
      {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <div>
            <label className="block" htmlFor="nama">Nama</label>
            <input id="nama" type="text" placeholder="Nama"
                   className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                   value={nama} onChange={(e) => setNama(e.target.value)} required />
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Email"
                   className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                   value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Password"
                   className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                   value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="role">Role</label>
            <select
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="dosen">Dosen</option>
            </select>
          </div>
          <div className="flex items-baseline justify-between">
            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Register</button>
          </div>
        </div>
      </form>
    </div>
  </div>
);
}
export default RegisterPage;