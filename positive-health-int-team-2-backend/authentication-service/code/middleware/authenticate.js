import jwt from 'jsonwebtoken';
import { tokenBlacklist } from '../controllers/authController.js';

function authenticate(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided' });
  }

  // Check if the token is in the blacklist
  if (tokenBlacklist.includes(token)) {
    return res.status(401).json({ error: 'Access denied. Token has been invalidated (logged out)' });
  }

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export default authenticate;
