import jwt from 'jsonwebtoken';

function authenticate(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided' });
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
