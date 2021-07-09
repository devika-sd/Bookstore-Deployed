const express = require('express')
const app = express()
const cors = require('cors')
require('colors')
const errorHandler = require('./Admin-part1/middleware/errorhandler')
const {
	notFound_1,
	errorHandler_1,
} = require('./team1/middleware/errorMiddleware')
const {
	notFound_5,
	errorHandler_5,
} = require('./team5/middleware/errorMiddleware')
const fileupload = require('express-fileupload')
const databaseConnection = require('./db')

/**********************************Route Import Area******************************************/
//team1
const userRoutes = require('./team1/routes/userRoutes')
const orderRoutesTeam1 = require('./team1/routes/orderRoutes')
const wishlistRoutes = require('./team1/routes/wishlistRoutes')

//team2,4
const addressUser = require('./team2/routes/address')
const couponRoutes = require('./team2/routes/coupon')
const orderRoutes = require('./team2/routes/order')
const cartItemRoutes = require('./team2/routes/cartItem')
const wishItemRoutes = require('./team2/routes/wishItem')

const searchpageRoute = require('./team4/routes/newsearch')
const wishlistRoute = require('./team4/routes/wishlist')
const cartlistRoute = require('./team4/routes/cart')

//team3
const userRoute = require('./Admin-part1/routes/users')
const orderRoute = require('./Admin-part1/routes/orders')

//team5
const bookRoute = require('./Admin-part2/routes/book')

/***********************************************************************************************/

require('dotenv').config()

app.use(cors())

app.use(express.json())

app.use(fileupload())
app.use('/dp', express.static('team1/public/uploads'))

//for User app (running frontend and backend in same port) use: http://localhost:8080/user
app.use('/', express.static('public/User'))
app.use('/profile', express.static('public/User'))
app.use('/User', express.static('public/User'))

//for Admin app (running frontend and backend in same port) use: http://localhost:8080/admin
app.use('/', express.static('public/Admin'))
app.use('/Admin', express.static('public/Admin/'))

databaseConnection()
/**********************************Route Area**************************************************/
//team1
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutesTeam1)
app.use('/api/wishlists', wishlistRoutes)
//team2,4

app.use('/books', searchpageRoute)
app.use('/api/wishlist', wishlistRoute)
app.use('/api/cartlist', cartlistRoute)

app.use('/api/v1/adr', addressUser)
app.use('/api/v1/coupons', couponRoutes)
app.use('/api/v1/cart_orders', orderRoutes)
app.use('/api/v1/cartItems', cartItemRoutes)
app.use('/api/v1/wishItems', wishItemRoutes)

//team 3
app.use('/api/v1/users', userRoute)
app.use('/api/v1/orders', orderRoute)

//team 5
app.use('/api/v1/book', bookRoute)
/***********************************************************************************************/

/**********************************Error Handler Area*******************************************/
//team1
app.use(notFound_1)
app.use(errorHandler_1)
//team5
app.use(notFound_5)
app.use(errorHandler_5)
//team3,5 - Admin App
app.use(errorHandler)

/***********************************************************************************************/

app.listen(process.env.PORT, () => {
	console.log('listening to the port 8080')
})
