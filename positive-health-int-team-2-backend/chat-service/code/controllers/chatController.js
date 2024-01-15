import Message from "../models/Message.js";

async function redirectToChat(req,res){
    const friendshipId = req.body.friendshipId;
    const redirect = '/app/friends/chat/'+friendshipId;
    return res.status(200).json({redirect: redirect});
}

async function getChatConversation(req,res){
    const friendshipId = req.body.friendshipId;
    const conversation = await Message.findAll({where: {friendship_id: friendshipId}, order: [['createdAt', 'ASC']]});
    return res.status(200).json(conversation);
}

async function sendMessage(req,res){
    const message = req.body.message;
    try{
        Message.create({user_id_sender: message.user_id_sender, user_id_receiver: message.user_id_receiver, content: message.content, sent_datetime: message.sent_datetime, friendship_id: message.friendship_id});
        return res.status(200).send('Success!');
    }catch(error){
        return res.status(500).send('Error!');
    }
}

export default { redirectToChat, getChatConversation, sendMessage }