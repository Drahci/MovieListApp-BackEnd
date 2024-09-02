const axios = require("axios");
const supabase = require("../config/supabaseClient");
const apiKey = "997fc7e026a52c0353e9fe9190f94343";
const baseUrl = "https://api.themoviedb.org/3/movie";
const searchUrl = "https://api.themoviedb.org/3/search/movie";
const imageBaseUrl = "https://image.tmdb.org/t/p/";
const imageSize = "w500";

exports.addFavorite = async (req, res) => {
  try {
    const { id, title, overview, poster_url, is_favorito } = req.body;

    const { data: existingFavorite, error: fetchError } = await supabase
      .from("favorites")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Erro ao buscar filme favorito:", fetchError);
      throw fetchError;
    }

    if (existingFavorite) {
      return res.status(400).json({ message: "Filme já está nos favoritos" });
    }

    const { data: favorite, error } = await supabase
      .from("favorites")
      .insert([
        {
          id,
          title,
          overview,
          poster_url,
          is_favorito,
        },
      ])
      .single();

    if (error) {
      console.error("Erro ao adicionar filme aos favoritos:", error);
      throw error;
    }

    res.status(201).json({
      message: "Filme adicionado aos favoritos com sucesso!",
      favorite,
    });
  } catch (error) {
    console.error("Erro ao adicionar filme aos favoritos:", error);
    res.status(500).json({
      message: "Erro ao adicionar filme aos favoritos",
      error: error.message,
    });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const { data: favorites, error } = await supabase
      .from("favorites")
      .select("*");

    if (error) {
      console.error("Erro ao buscar filmes favoritos:", error);
      throw error;
    }

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Erro ao buscar filmes favoritos:", error);
    res.status(500).json({
      message: "Erro ao buscar filmes favoritos",
      error: error.message,
    });
  }
};

exports.updateFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_favorito } = req.body;

    const { data: favorite, error: fetchError } = await supabase
      .from("favorites")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Erro ao buscar filme favorito:", fetchError);
      throw fetchError;
    }

    if (!favorite) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }

    const { data: updatedFavorite, error: updateError } = await supabase
      .from("favorites")
      .update({ is_favorito })
      .eq("id", id)
      .single();

    if (updateError) {
      console.error("Erro ao atualizar estado de favorito:", updateError);
      throw updateError;
    }

    res.status(200).json({
      message: "Estado de favorito atualizado com sucesso!",
      favorite: updatedFavorite,
    });
  } catch (error) {
    console.error("Erro ao atualizar estado de favorito:", error);
    res.status(500).json({
      message: "Erro ao atualizar estado de favorito",
      error: error.message,
    });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const response = await axios.get(`${baseUrl}/popular?api_key=${apiKey}`);
    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      genre_ids: movie.genre_ids,
      overview: movie.overview,
      poster_url: `${imageBaseUrl}${imageSize}${movie.poster_path}`,
    }));
    res.json(movies);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const response = await axios.get(
      `${baseUrl}/${req.params.id}?api_key=${apiKey}`
    );
    const movie = {
      id: response.data.id,
      title: response.data.title,
      genres: response.data.genres.map((genre) => genre.name),
      overview: response.data.overview,
      poster_url: `${imageBaseUrl}${imageSize}${response.data.poster_path}`,
    };
    res.json(movie);
  } catch (error) {
    console.error("Erro ao buscar filme:", error);
    res.status(500).json({ error: "Erro ao buscar filme" });
  }
};

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
      overview: movie.overview,
      poster_url: `${imageBaseUrl}${imageSize}${movie.poster_path}`,
    }));
    res.json(movies);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
};

exports.createMovie = async (req, res) => {
  res
    .status(501)
    .json({ error: "Criação de filmes não suportada pela API do TMDb" });
};

exports.updateMovie = async (req, res) => {
  res
    .status(501)
    .json({ error: "Atualização de filmes não suportada pela API do TMDb" });
};

exports.deleteMovie = async (req, res) => {
  res
    .status(501)
    .json({ error: "Exclusão de filmes não suportada pela API do TMDb" });
};
