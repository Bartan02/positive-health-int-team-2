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


export default { addFriend }