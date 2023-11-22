import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Token blacklist (for logged-out users)
const tokenBlacklist = [];

async function register(req, res) {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashedPassword });
    const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ token, redirect: '/logintest' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function login(req, res) {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ token, redirect: '/logintest' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function logout(req, res) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided' });
  }

  // Add the token to the blacklist
  tokenBlacklist.push(token);

  res.status(200).json({ message: 'Logout successful', redirect: '/'  });
}

export default { register, login, logout };
export { tokenBlacklist }