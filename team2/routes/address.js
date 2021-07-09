var express = require("express");
var app = express();
var router = express.Router();
const Address = require("../../models/addresses");

const {
  fetchAllAddressesUser,
  addAddressesUser,
  delAddressesUser,
  patchAddressUser,
} = require("../controllers/address");


router.get("/:email", fetchAllAddressesUser)
router.post("/", addAddressesUser);

router.delete("/", delAddressesUser);
router.patch("/", patchAddressUser);

module.exports = router;
