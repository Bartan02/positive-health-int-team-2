import User from '../models/User.js';
import { Op, UnknownConstraintError } from '@sequelize/core'

function isInteger(str) {
    // Remove leading and trailing whitespaces
    str = str.trim();
  
    // Check if the string is empty
    if (str === "") {
      return false;
    }
  
    // Check if the string is a valid integer
    return /^[+-]?\d+$/.test(str);
  }

async function findUser(req,res,next){
    const reqPrompt = req.params.prompt;
    if(isInteger(reqPrompt)){
        try{
            const queryFindUser = await User.findOne({where: {id: reqPrompt}, attributes: ['id', 'username', 'email']});
            const foundRecords = {user: queryFindUser};
            return res.status(200).json({foundRecords: foundRecords});
        }catch(error){
            next(error);
        }
    }else{
        try{
            const queryFindUser = await User.findOne({where: {username: reqPrompt}, attributes: ['id', 'username', 'email']});
            const queryFindUsers = await User.findAll({where: {username: { [Op.like]: reqPrompt + '%' }}, attributes: ['id', 'username', 'email']});
            const foundRecords = {user: queryFindUser, users: queryFindUsers}
            return res.status(200).json({foundRecords: foundRecords});
        }catch(error){
            next(error);
        }
    }
}

async function getUsernamesFromTheirIds(req,res,next){
    let allRetrievedRelations = req.body.allRetrievedRelations;
    let allRetrievedRelationsWithUsernames = []
    for (const relation of allRetrievedRelations){
        try{
        const targetFriend = relation.friend_one;
        const queryFindUserWithId = await User.findOne({where: {id: targetFriend}, attributes: ['id', 'username']});
        allRetrievedRelationsWithUsernames.push({...relation, ...queryFindUserWithId.dataValues});
        }catch(e){
            return res.status(500).json(e.message);
        }
    }
    return res.status(200).json({allRetrievedRelations: allRetrievedRelationsWithUsernames});
}

async function getUsernameFromTheirId(req,res,next){
    let allRetrievedRelations = req.body.allRetrievedRelations;
    const friendId = allRetrievedRelations.friend_two;
    let allRetrievedRelationsWithUsernames = []
        try{
        const queryFindUserWithId = await User.findOne({where: {id: friendId}, attributes: ['username']});
        allRetrievedRelationsWithUsernames.push({...allRetrievedRelations, ...queryFindUserWithId.dataValues});
        }catch(e){
            return res.status(500).json(e.message);
        }
    return res.status(200).json({allRetrievedRelations: allRetrievedRelationsWithUsernames});
}

async function getIdFromTheirUsername(req,res,next){
    const username = req.params.username;
    try{
        const queryFindUserWithUsername = await User.findOne({where: {username: username}, attributes: ['id']});
        return res.status(200).json({id: queryFindUserWithUsername.id});
    }catch(e){
        return res.status(500).json(e.message);
    }
}

export default { findUser, getUsernamesFromTheirIds, getUsernameFromTheirId, getIdFromTheirUsername }