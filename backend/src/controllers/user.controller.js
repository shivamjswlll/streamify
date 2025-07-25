import User from '../models/User.js';
import FriendRequest from '../models/FriendRequest.js';

export async function getRecommendedUsers(req,res) {
    try{
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $ans:[
                {_id: {$ne: currentUserId}},
                {$id: {$nin: currentUser,friends}},
                {isOnboarded: true},
            ]
        });
        res.status(200).json(recommendedUsers);
    }
    catch(error){
        return res.status(401).json({message: 'Unauthorized'});
    }
}

export async function getMyFriends(req,res){
try{
    const user = await User.findById(req,user.id)
    .select("friends")
    .populate("friends","fullName profilePic nativeLanguage learningLanguage");
    res.status(200).json(user.friends);
}
catch(error){
    console.error("Error in getMyFriends controller");
    return res.status(401).json({message: 'Unauthorized'});
}
}

export async function sendFriendRequest(req,res){
    try{
        const myId = req.user.id;
        const {id:recipientId} = req.params;

        //prevent sending friend request to self
        if(myId === recipientId){
            return res.status(400).json({message: "You can't send friend request to yourself"});
        }

        const recipient = await User.findById(recipientId);
        if(!recipient){
            return res.status(404).json({message: "User not found"});
        }
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message: "You are already friends"});
        }

        //check if a req already exist
        const existingRequest = await FriendRequest.findOne({
            $or:[
                {sender:myId,recipient:recipientId},
                {sender:recipientId,recipient:myId}
            ],
        });

        if(existingRequest){
            return res
            .status(400)
            .json({message: "Friend request already sent"});
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        res.status(201).json(friendRequest);
    }
    catch(error){
        console.error("Error in sendFriendRequest controller");
        return res.status(401).json({message: 'Unauthorized'});
    }
}

export async function acceptFriendRequest(req,res){
    try{
        const {id:requestId} = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if(!friendRequest){
            return res.status(404).json({message: "Friend request not found"});
        }

        if(friendRequest.recipient.toString() !== req.user.id){
            return res.status(403).json({message: "You are not authorized to accept this request"});
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        //add each user to the other's friend's array
        await User.findByIdAndUpdate(friendRequest,sender,{
            $addToSet: {friends: friendRequest.recipient},
        });

        await User.findByIdAndUpdate(friendRequest,recipient,{
            $addToSet: {friends: friendRequest.sender},
        });

        res.status(200).json({message:"Accepted Friend Request"});
    }
    catch(error){
        console.error("Friend request not accepted",error);
        res.status(500).json({message:"Problem with accepting friend request"});
    }
}

export async function getFriendRequests(req,res){
    try{    
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender","fullName profilePic nativeLanguage learningLanguage")
        
        res.status(200).json({message: "Friend Requests"});
    }
    catch(error){
        console.error("error with getFriendRequest",error);
        res.status(500).json({message: "Not able to show friend Request"});
    }
}

export async function getOutgoingFriendReqs(req,res){
    try{
        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status:"pending",
        }).populate("recipient","fullname profilePic nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequests);
    }
    catch(error){
        console.error("error with getOutgoingFriendRequest",error);
        res.status(500).json({message:"problem with getOutgoingFriendRequests"})
    }
}