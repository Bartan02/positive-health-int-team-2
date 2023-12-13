import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Token blacklist (for logged-out users)
const tokenBlacklist = [];
let exportUser;
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

async function register(req, res) {
  try {
    const { email, username, password } = req.body;
    if(username === '') return res.status(401).send({ error: 'Please, do not leave username blank.' });
    if(email === '') return res.status(401).send({ error: 'Please, do not leave email blank.' });
    const queryEmail = await User.findOne({where: {email: email}});
    if(queryEmail !== null) return res.status(401).send({ error: 'Typped email has already been taken. You need to use other email for registration or log in with typped email.' });
    const queryUsername = await User.findOne({where: {username: username}});
    if(queryUsername !== null) return res.status(401).send({ error: 'Typped username has already been taken. You need to use other username for registration or log in with typped username.' });
    if(!validateEmail(email)) return res.status(401).send({ error: 'Typped email is invalid. Your email should look like this: email@domain.com' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashedPassword });
    const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
    const userinfo = {
      username: username,
      email: email
    }
    return res.status(200).json({ token, redirect: '/app/home', userinfo: userinfo, userid: user.id });
  } catch (error) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
}

async function login(req, res) {
  try {
  const { email, username, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user === null) return res.status(401).json({ error: 'Invalid username or password' });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid username or password' });
    const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
    const userinfo = {
      username: username,
      email: email
    }
    exportUser = user.id;
    return res.status(200).json({ token, redirect: '/app/home', userid: user.id, userinfo: userinfo});
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

function logout(req, res) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided' });
  }

  // Add the token to the blacklist
  tokenBlacklist.push(token);

  return res.status(200).json({ message: 'Logout successful', redirect: '/'  });
}

async function getUserID(req, res) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, 'secretKey');
    const userId = decoded.userId;
    return res.status(200).json({ userId });
  } catch (error) {
    return res.status(500).json({ error: 'Invalid Token or Internal Server Error' });
  }
}

export default { register, login, logout, getUserId };
export { tokenBlacklist }