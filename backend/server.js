const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = 'supersecretkey';
let users = [];

// REGISTER
app.post('/api/auth/register', async (req, res) => {
try {
const { nama, email, password, role } = req.body;
const existing = users.find(u => u.email === email);
if (existing) return res.status(400).json({ message: 'Email sudah digunakan!' });

const hashed = await bcrypt.hash(password, 10);
const newUser = { nama, email, password: hashed, role };
users.push(newUser);
res.json({ message: 'Registrasi berhasil!' });
} catch (e) {
res.status(500).json({ message: 'Terjadi kesalahan server' });
}
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
const { email, password } = req.body;
const user = users.find(u => u.email === email);
if (!user) return res.status(400).json({ message: 'Email tidak ditemukan!' });

const valid = await bcrypt.compare(password, user.password);
if (!valid) return res.status(400).json({ message: 'Password salah!' });

const token = jwt.sign({ nama: user.nama, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
res.json({ token });
});

// GET PROFILE
app.get('/api/auth/me', (req, res) => {
const token = req.headers.authorization?.split(' ')[1];
if (!token) return res.status(401).json({ message: 'Token tidak ditemukan!' });
try {
const decoded = jwt.verify(token, SECRET_KEY);
res.json(decoded);
} catch {
res.status(401).json({ message: 'Token tidak valid!' });
}
});

// UPDATE PROFILE
app.put('/api/auth/profile', async (req, res) => {
const token = req.headers.authorization?.split(' ')[1];
if (!token) return res.status(401).json({ message: 'Token tidak ditemukan!' });
try {
const decoded = jwt.verify(token, SECRET_KEY);
const { nama } = req.body;
const userIndex = users.findIndex(u => u.email === decoded.email);
if (userIndex === -1) return res.status(404).json({ message: 'User tidak ditemukan!' });

users[userIndex].nama = nama;
const newToken = jwt.sign({ nama: users[userIndex].nama, email: users[userIndex].email, role: users[userIndex].role }, SECRET_KEY, { expiresIn: '1h' });
res.json({ message: 'Profile berhasil diupdate!', token: newToken });
} catch (e) {
res.status(401).json({ message: 'Token tidak valid!' });
}
});

app.listen(3001, () => console.log('✅ Backend berjalan di http://localhost:3001'));