const express = require("express");
const { applySecurity } = require("./middlewares/security.middleware");
const { notFound, errorHandler } = require("./middlewares/error.middleware");
const { setupSwagger } = require("./swagger/swagger");
const authRoutes = require("./routes/auth.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const carroRoutes = require("./routes/carro.routes");
const motoRoutes = require("./routes/moto.routes");
const marcaRoupaRoutes = require("./routes/marcaRoupa.routes");

const app = express();

applySecurity(app);
app.use(express.json({ limit: "10kb" }));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

setupSwagger(app);

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/carros", carroRoutes);
app.use("/motos", motoRoutes);
app.use("/marcas-roupa", marcaRoupaRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

