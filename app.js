require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const movieRoutes = require("./routes/movieRoutes");

app.use(cors());
app.use(express.json());
app.use("/api", movieRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
