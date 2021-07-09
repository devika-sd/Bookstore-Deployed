function errorHandler(err, req, res, next) {
  // console.log("error handler invoked", err);

  // Duplicate Error Handling
  if (err.code === 11000) {
    console.log(err);
    let key = Object.keys(err.keyValue)
    // let message1 = ""
    // let message2 = ""
    // message1 = Object.values(err.keyValue) + " user name already exists"
    // message2 = Object.values(err.keyValue) + " is duplicate user name "

    if (key[0].localeCompare("name") === 0) {
      let message = "Name (" + Object.values(err.keyValue) + ") is already exists"
      res.json({ success: false, message })

    }
    else if (key[0].localeCompare("email") === 0) {
      let message = "Email ID (" + Object.values(err.keyValue) + ") is already exists"
      res.json({ success: false, message })

    }
    else if (key[0].localeCompare("phone") === 0) {
      let message = "Contact Number (" + Object.values(err.keyValue) + ") is already exists"
      res.json({ success: false, message })

    }
    else {
      res.json({ success: false, err, message: err.message })
    }
  }
  // validation Error Handing
  else if (err.errors) {
    if (Object.keys(err.errors)[0].localeCompare('name') === 0) {
      let message = err.errors.name.message
      res.json({ success: false, message })

    }
    else if (Object.keys(err.errors)[0].localeCompare('email') === 0) {
      let message = err.errors.email.message
      res.json({ success: false, message })

    }
    else if (Object.keys(err.errors)[0].localeCompare('password') === 0) {
      let message = err.errors.password.message
      res.json({ success: false, message })
    }
    else if (Object.keys(err.errors)[0].localeCompare('phone') === 0) {
      let message = err.errors.phone.message
      res.json({ success: false, message })

    }
    else if (Object.keys(err.errors)[0].localeCompare('address.0.houseNumber') === 0) {
      let message = "Please provide a valid HouseNumber"
      res.json({ success: false, message })
    }
    else if (Object.keys(err.errors)[0].localeCompare('address.0.locality') === 0) {
      let message = "Please provide a valid Locality"
      res.json({ success: false, message })
    }
    else if (Object.keys(err.errors)[0].localeCompare('address.0.city') === 0) {
      let message = "Please provide a valid City"
      res.json({ success: false, message })
    }
    else if (Object.keys(err.errors)[0].localeCompare('address.0.state') === 0) {
      let message = "Please provide a valid State"
      res.json({ success: false, message })
    }
    else if (Object.keys(err.errors)[0].localeCompare('address.0.country') === 0) {
      let message = "Please provide a valid Country"
      res.json({ success: false, message })
    }
    else if (Object.keys(err.errors)[0].localeCompare('address.0.pinCode') === 0) {
      let message = "Please provide a valid Pin Code"
      res.json({ success: false, message })
    }

    else {
      let message = err.message
      res.json({ success: false, message })
    }
  }
  else {
    if (err.name.localeCompare('TokenExpiredError') === 0) {
      let message = "Session Expired at " + Object.values(err)[2]
      res.json({ success: false, message })
    }
    let message = err.message
    res.json({ success: false, message })

  }



}

module.exports = errorHandler;