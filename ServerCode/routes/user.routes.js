const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
router.route("/api/user").get(userCtrl.list).post(userCtrl.create);

router
  .route("/api/user/:userId")
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);
router.param("userId", userCtrl.userById);
module.exports = router;
