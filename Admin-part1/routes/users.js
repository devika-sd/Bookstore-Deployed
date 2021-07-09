const express = require('express');
const router = express.Router();
const { blockUser, adminSignin, fetchAllUsers, addUser, updateUserDetails, deleteUsersByEmail } = require('../controllers/users');
const { protect, authorize } = require('../../middleware/auth');
var advancedFind = require('../middleware/Advancedfind');
const Users = require('../../models/users');

router.route('/login')
    .post(adminSignin);//{{admin}}users/login


router.route('/block/:email&:isBlocked')
    .patch(protect, authorize('admin'), blockUser);//{{admin}}users/block/vrushali@gmail.com

router.route('/:email')
    .delete(protect, authorize('admin'), deleteUsersByEmail)

router.route('/')
    .get(protect,authorize('admin'), advancedFind(Users), fetchAllUsers)
    .post(/*protect, authorize(),*/ addUser)

router.route('/:_id')
    .put(protect, authorize('admin'), updateUserDetails);

module.exports = router;