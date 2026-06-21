const express = require("express");
const controller = require("../controllers/marcaRoupa.controller");
const validate = require("../middlewares/validate.middleware");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  createMarcaRoupaSchema,
  updateMarcaRoupaSchema,
  marcaRoupaIdSchema
} = require("../schemas/marcaRoupa.schema");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(authenticate);
router.post("/", validate(createMarcaRoupaSchema), asyncHandler(controller.create));
router.get("/", asyncHandler(controller.list));
router.get("/:id", validate(marcaRoupaIdSchema), asyncHandler(controller.getById));
router.put("/:id", validate(updateMarcaRoupaSchema), asyncHandler(controller.update));
router.delete("/:id", validate(marcaRoupaIdSchema), asyncHandler(controller.remove));

module.exports = router;

