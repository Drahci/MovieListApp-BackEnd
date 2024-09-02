const express = require("express");
const cors = require("cors"); // Importar o pacote cors
const app = express();
const movieRoutes = require("./routes/movieRoutes");

app.use(cors()); // Usar o middleware cors
app.use(express.json());
app.use("/api", movieRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
