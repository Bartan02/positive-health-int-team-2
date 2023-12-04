function notAuthenticate(req, res, next) {
    const token = req.header('Authorization');
    if (token) return res.status(401).json({ error: 'Access denied. User currently logged in' });
    next();
  }

export default notAuthenticate;