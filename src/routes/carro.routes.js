const express = require("express");
const controller = require("../controllers/carro.controller");
const validate = require("../middlewares/validate.middleware");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  createCarroSchema,
  updateCarroSchema,
  carroIdSchema
} = require("../schemas/carro.schema");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(authenticate);
router.post("/", validate(createCarroSchema), asyncHandler(controller.create));
router.get("/", asyncHandler(controller.list));
router.get("/:id", validate(carroIdSchema), asyncHandler(controller.getById));
router.put("/:id", validate(updateCarroSchema), asyncHandler(controller.update));
router.delete("/:id", validate(carroIdSchema), asyncHandler(controller.remove));

module.exports = router;

