const mongoose = require("mongoose");

const schema = mongoose.Schema;

const AddressSchema = new schema({
    houseNumber: {
        type: Number,
        required: [true, 'Please provide a HouseNumber'],
        match: [/^[0-9]/, 'Please provide a valid HouseNumber']
    },
    locality: {
        type: String,
        required: [true, 'Please provide a Locality'],
        match: [/[a-zA-Z]/, 'Please provide a valid Locality']
    },
    city: {
        type: String,
        required: [true, 'Please provide a city'],
        match: [/[a-zA-Z]/, 'Please provide a valid City']
    },
    state: {
        type: String,
        enum: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
            "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
            "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
            "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
            "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
        required: [true, 'Please provide a State'],
        match: [/[a-zA-Z]/, 'Please provide a valid State']
    },
    country: {
        type: String,
        required: [true, 'Please provide a Country'],
        match: [/[a-zA-Z]/, 'Please provide a valid Country'],
        default:'India'
    },
    pinCode: {
        type: Number,
        required: [true, 'Please provide a Pin Code'],
        match: [/^[0-9]{6}$/, 'Please provide a valid Pin Code']
    }
})

module.exports = AddressSchema;