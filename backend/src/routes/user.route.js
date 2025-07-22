import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getRecommendedUsers,getMyFriends,getOutgoingFriendReqs,sendFriendRequest,getFriendRequests ,acceptFriendRequest } from '../controllers/user.controller.js';

const router = express.Router();

//check if user is logged in
router.use(protectRoute);

router.get('/',getRecommendedUsers);
router.get('/friends',getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests",getFriendRequests);
router.get("/outgoing-friend-requests",getOutgoingFriendReqs);


export default router