import { Op } from "sequelize";
import Friendship from "../models/Friendship.js";

async function findPerson(req,res){
  try{
    const responsePeople = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/auth/user/'+req.params.prompt, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
    let result = await responsePeople.json();
    if(!responsePeople.ok) throw "Not found!";
    return res.status(200).json(result);
  } catch(error){
    return res.status(404).json(error.message);
  }
  }

async function findRelationships(req,res){
    const yourUserId = req.params.prompt;
    let relationsArray = [];
    let allRelations = await Friendship.findAll({where: {[Op.or]: [{friend_one: yourUserId}, {friend_two: yourUserId}]}});
    allRelations.forEach(relation => {
      if(relation.friend_two === yourUserId){
        const swapVar = relation.friend_two
        relation.friend_two = relation.friend_one;
        relation.friend_one = swapVar;
      }
      relationsArray.push({friend: relation.friend_two, status: relation.status});
    });
    return res.status(200).json(relationsArray);
}

async function getRelationship(req,res){
  const friendshipId = req.body.friendshipId;
  const yourUserId = req.body.yourUserId;
  const friendship = await Friendship.findOne({where: {friendship_id: friendshipId}});
  if(friendship.friend_two === yourUserId){
    const swapVar = friendship.friend_two
    friendship.friend_two = friendship.friend_one;
    friendship.friend_one = swapVar;
  }
  return res.status(200).json(friendship);
}

export default { findPerson, findRelationships, getRelationship }