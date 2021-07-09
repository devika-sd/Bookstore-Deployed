const jwt =require ('jsonwebtoken')
const asyncHandler =require ('express-async-handler')
const User =require ('../../models/users')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
  //startwith is use to give the bearer token
  {
    try {
      //WE ARE USING SPLIT BECAUSE WE JUST WANT THE TOKEN NOT THE BEARER
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      //passing all the data to req.user and not passing the password i.e we will have all the data in req.user to acess in all protected Routes
      req.user = await User.findById(decoded.id).select('-password')
      next()

    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})
// export { protect }
module.exports= { protect }