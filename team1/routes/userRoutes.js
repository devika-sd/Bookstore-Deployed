const express = require('express')
const router = express.Router()

const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  uploadProfilePic,
  forgotPassword,
  resetPassword,
} = require( '../controllers/userController')
const { protect } = require( '../middleware/authMiddleware')

router.route('/').post(registerUser)

router.post('/login', authUser)
router.post('/forgotPassword', forgotPassword)
router.put('/resetPassword/:token', resetPassword)
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

router.route('/upload/:id').put(uploadProfilePic)

// export default router
module.exports = router