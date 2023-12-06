import User from '../models/User.js';

async function findUser(req, res){
    const queryFindUser = await User.findOne({where: {id: req.params.id}, attributes: ['id', 'username', 'email']});
    if(queryFindUser === null) return res.status(401).send({ error: 'Typped email has already been taken. You need to use other email for registration or log in with typped email.' });
    res.status(200).send(queryFindUser);
}

export default { findUser }