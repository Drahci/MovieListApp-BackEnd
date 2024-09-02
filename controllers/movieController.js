const axios = require("axios");
const apiKey = "997fc7e026a52c0353e9fe9190f94343";
const baseUrl = "https://api.themoviedb.org/3/movie";
const searchUrl = "https://api.themoviedb.org/3/search/movie";
const imageBaseUrl = "https://image.tmdb.org/t/p/";
const imageSize = "w500";

// Listar todos os filmes populares
exports.getAllMovies = async (req, res) => {
  try {
    const response = await axios.get(`${baseUrl}/popular?api_key=${apiKey}`);
    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      genre_ids: movie.genre_ids,
      release_date: movie.release_date,
      overview: movie.overview,
      poster_url: `${imageBaseUrl}${imageSize}${movie.poster_path}`,
    }));
    res.json(movies);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
};

// Buscar um filme específico
exports.getMovie = async (req, res) => {
  try {
    const response = await axios.get(
      `${baseUrl}/${req.params.id}?api_key=${apiKey}`
    );
    const movie = {
      id: response.data.id,
      title: response.data.title,
      genres: response.data.genres.map((genre) => genre.name),
      release_date: response.data.release_date,
      overview: response.data.overview,
      poster_url: `${imageBaseUrl}${imageSize}${response.data.poster_path}`,
    };
    res.json(movie);
  } catch (error) {
    console.error("Erro ao buscar filme:", error);
    res.status(500).json({ error: "Erro ao buscar filme" });
  }
};

// Buscar filmes por título
exports.searchMovies = async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res
      .status(400)
      .json({ error: 'Parâmetro de busca "query" é obrigatório' });
  }

  try {
    const response = await axios.get(
      `${searchUrl}?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    );
    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      genre_ids: movie.genre_ids,
      release_date: movie.release_date,
      overview: movie.overview,
      poster_url: `${imageBaseUrl}${imageSize}${movie.poster_path}`,
    }));
    res.json(movies);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
};

// Criar um novo filme (Nota: Não suportado pela API do TMDb)
exports.createMovie = async (req, res) => {
  res
    .status(501)
    .json({ error: "Criação de filmes não suportada pela API do TMDb" });
};

// Atualizar um filme existente (Nota: Não suportado pela API do TMDb)
exports.updateMovie = async (req, res) => {
  res
    .status(501)
    .json({ error: "Atualização de filmes não suportada pela API do TMDb" });
};

// Deletar um filme (Nota: Não suportado pela API do TMDb)
exports.deleteMovie = async (req, res) => {
  res
    .status(501)
    .json({ error: "Exclusão de filmes não suportada pela API do TMDb" });
};
