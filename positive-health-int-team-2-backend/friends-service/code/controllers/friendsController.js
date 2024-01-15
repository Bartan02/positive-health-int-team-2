import { Op } from "sequelize";
import Friendship from "../models/Friendship.js";

async function addFriend(req,res){
    const friendId = req.body.friendId;
    const yourId = req.body.yourId;
    Friendship.create({friend_one: yourId, friend_two: friendId, status: 1})
    .then(() => {
        return res.status(201).json({message: "Success!"});
    })
    .catch(error => {
        return res.status(500).json({message: error.message});
    });
}

async function getFriendRequests(req,res){
    const yourUserId = Number(req.body.yourUserId);
    let allRelations = await Friendship.findAll({where: {friend_two: yourUserId, status: 1}});
    try{
    const getUsernamesFromTheirIdsFetch = await fetch('http://authentication-service:3020/auth/getUsernamesFromTheirIds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                allRetrievedRelations: allRelations
            })
        });
        if(!getUsernamesFromTheirIdsFetch.ok) throw getUsernamesFromTheirIdsFetch.status;
        const getUsernamesFromTheirIdsResult = await getUsernamesFromTheirIdsFetch.json();
        return res.status(200).json({requestsArray: getUsernamesFromTheirIdsResult.allRetrievedRelations});
    }catch(e){
        return res.status(500).json(e.message);
    }
}

async function acceptFriend(req,res){
    const friendshipId = req.body.friendshipId;
    await Friendship.update({status: 2}, {where: {friendship_id: friendshipId}})
    .then(() => {
        return res.status(200).send('ok');
    })
    .catch(e => {
        return res.status(500).send('error');
    });
}

async function rejectFriend(req,res){
    const friendshipId = req.body.friendshipId;
    await Friendship.destroy({where: {friendship_id: friendshipId}})
    .then(() => {
        return res.status(200).send('ok');
    })
    .catch(e => {
        return res.status(500).send('error');
    });
}

async function getFriendsList(req, res){
    const yourUserId = Number(req.body.yourUserId);
    let friendsList = [];
    let yourFriendRelations = await Friendship.findAll({where: {[Op.or]: [{friend_one: yourUserId}, {friend_two: yourUserId}], status: 2}});
    yourFriendRelations.forEach(relation => {
        if(relation.friend_one === yourUserId){
          const swapVar = relation.friend_one
          relation.friend_one = relation.friend_two;
          relation.friend_two = swapVar;
        }
        friendsList.push({friend_one: relation.friend_one, status: relation.status, friendship_id: relation.friendship_id});
      });
      const getUsernamesFromTheirIdsFetch = await fetch('http://authentication-service:3020/auth/getUsernamesFromTheirIds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                allRetrievedRelations: friendsList
            })
        });
        const getUsernamesFromTheirIdsResult = await getUsernamesFromTheirIdsFetch.json();
        friendsList = getUsernamesFromTheirIdsResult.allRetrievedRelations;
      return res.status(200).json({friendsList: friendsList});
}

export default { addFriend, getFriendRequests, acceptFriend, rejectFriend, getFriendsList }