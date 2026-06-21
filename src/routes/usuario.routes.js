const express = require("express");
const usuarioController = require("../controllers/usuario.controller");
const validate = require("../middlewares/validate.middleware");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const {
  usuarioIdSchema,
  updateUsuarioSchema
} = require("../schemas/usuario.schema");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(authenticate);

router.get("/", authorize("ADMIN"), asyncHandler(usuarioController.list));
router.get("/:id", validate(usuarioIdSchema), asyncHandler(usuarioController.getById));
router.put("/:id", validate(updateUsuarioSchema), asyncHandler(usuarioController.update));
router.delete(
  "/:id",
  authorize("ADMIN"),
  validate(usuarioIdSchema),
  asyncHandler(usuarioController.remove)
);

module.exports = router;

