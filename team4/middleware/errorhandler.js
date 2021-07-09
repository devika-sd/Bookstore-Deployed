function errorHandler (err, req, res, next) {
    console.log('Error handler invoked.....')
    console.log(err.message);
    res.status(500).json({success: false, message: err.message})
}

module.exports = errorHandler;