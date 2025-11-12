import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
try {
const res = await axios.post('http://localhost:3001/api/auth/login', { email, password });
localStorage.setItem('token', res.data.token);
navigate('/dashboard');
} catch (err) {
setError(err.response ? err.response.data.message : 'Login gagal');
}
};

return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold text-center">Login</h3>
      {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <div>
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
          <div className="flex items-baseline justify-between">
            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
);
}
export default LoginPage;