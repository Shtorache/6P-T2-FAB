const express = require("express");
const controller = require("../controllers/moto.controller");
const validate = require("../middlewares/validate.middleware");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  createMotoSchema,
  updateMotoSchema,
  motoIdSchema
} = require("../schemas/moto.schema");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(authenticate);
router.post("/", validate(createMotoSchema), asyncHandler(controller.create));
router.get("/", asyncHandler(controller.list));
router.get("/:id", validate(motoIdSchema), asyncHandler(controller.getById));
router.put("/:id", validate(updateMotoSchema), asyncHandler(controller.update));
router.delete("/:id", validate(motoIdSchema), asyncHandler(controller.remove));

module.exports = router;

