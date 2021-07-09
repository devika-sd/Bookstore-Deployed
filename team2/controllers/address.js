const AddressUser = require("../../models/users");
const asyncHandler = require("../middleware/async");
const { log } = require("console");

const fetchAllAddressesUser = asyncHandler(async (req, res, next) => {
    try {
        query = {
            email: req.params.email,
        };
        let docfetch = await AddressUser.find(query);
        let name = docfetch[0].name;
        let phone = docfetch[0].phone;
        let result = docfetch[0].addresses;
        let response = [];
        for (let index = 0; index < result.length; index++) {
            response.push({ ...result[index]._doc, name: name, phone: phone });
        }
        res.status(201).json({ message: "success", res: response });
    }
    catch (error) {
        res.status(404).send(error)
    }

});

const addAddressesUser = asyncHandler(async (req, res, next) => {
    try {
        query = { email: req.body.email };
        let finduser = await AddressUser.find(query)

        if (finduser.length !== 0) {

            const AddressRes = await AddressUser.updateMany({ email: req.body.email },
                {
                    $push: {
                        addresses: req.body.addresses
                    }
                }, { new: true })


            res.status(200).send(AddressRes)
        }

        else {
            const address = {
                pinCode: req.body.addresses.pinCode, houseNumber: req.body.addresses.houseNumber, locality: req.body.addresses.locality, city: req.body.addresses.city, state: req.body.addresses.state
            }
            let item = await AddressUser.create({
                email: req.body.email,
                addresses: [address],
                name: req.body.name,
                phone: req.body.phone
            }
            )
            res.json({ message: true, res: item });

        }
    }
    catch (err) {
        res.status(400).send(error)
    }
});


const delAddressesUser = asyncHandler(async (req, res, next) => {
    try {
        let id = req.body.id;
        let response = [];
        let query = { email: req.body.email };
        let docadd = await AddressUser.find(query).then((item) => {
            let audioIndex = item[0].addresses.map((item) => item._id).indexOf(id);
            item[0].addresses.splice(audioIndex, 1);
            item[0].save();
            let name = item[0].name;
            let phone = item[0].phone;
            let result = item[0].addresses
            for (let index = 0; index < result.length; index++) {
                response.push({ ...result[index]._doc, name: name, phone: phone });
            }
            res.status(201).json({ message: "success", res: response });
        });
    }
    catch (err) {
        res.status(400).send(error)
    }

});

const patchAddressUser = asyncHandler(async (req, res, next) => {
    try {
        let id = req.body.id; //req.body
        let query = { email: req.body.email }; //req.body
        let patch = req.body.address;
        let docadd = await AddressUser.find(query).then((item) => {
            let audioIndex = item[0].addresses.map((item) => item._id).indexOf(id);
            item[0].addresses[audioIndex] = patch;
            item[0].save();
            res.status(201).json({ message: "success", res: item[0].addresses });
        });

    }
    catch (err) {
        res.status(400).send(error)
    }
});

module.exports = {
    fetchAllAddressesUser,
    addAddressesUser,
    delAddressesUser,
    patchAddressUser,
};