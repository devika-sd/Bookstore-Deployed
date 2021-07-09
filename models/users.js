const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AddressSchema = require('./addresses');
const crypto = require('crypto')
const schema = mongoose.Schema;

const UsersSchema = new schema({
    name: {
        type: String,
        unique: false,
        lowercase: true,
        trim: true,
        required: [true, 'Please provide a Name'],
        match: [/[a-zA-Z]{4,}/, 'Please provide a valid Name'],
        index: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please provide a Email'],
        match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Please provide a valid Email Address'],
        index: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please provide a Password'],
        //match: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    addresses: {
        type: [AddressSchema]
    },
    phone: {
        type: Number,
        max: 9999999999,
        min: 1000000000,
        unique: true,
        required: [true, 'Please provide a Contact Number']
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    photo:{
        type:String,
        default:'no-photo.jpg'
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    }
},
{
    timestamps: true,
});
UsersSchema.index({name: 'text', email: 'text'});
UsersSchema.methods.generateToken = async function () {
    let token = await jwt.sign({ _id: this._id, isAdmin: this.isAdmin, isBlocked: this.isBlocked }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
    return token;
}

UsersSchema.methods.checkpassword = async function (rawpassword) {
    console.log("Inside a match password");
    return await bcrypt.compare(rawpassword, this.password);
}

UsersSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex')
	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex')
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000
	console.log({ resetToken }, this.passwordResetToken)
	return resetToken
}

UsersSchema.pre('save', async function (next) {
    console.log(this)
    if (!this.isModified('password')) {
		next()
	}
    console.log("before save operation  " + this.password);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("after save method  ", this.password);
    const user = this
})

UsersSchema.pre('save', function (next) {
	if (!this.isModified('password') || this.isNew) {
		next()
	}
	this.timestamps = true
	next()
})

const Users = new mongoose.model('user', UsersSchema);
module.exports = Users;