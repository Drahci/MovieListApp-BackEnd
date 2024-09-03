const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const app = express();
const movieRoutes = require("./routes/movieRoutes");

app.use(cors());
app.use(express.json());
app.use("/api", movieRoutes);

const PORT = process.env.PORT || 3002;

sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });
