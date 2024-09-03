const supabase = require("../config/supabaseClient");

const getAllMovies = async (req, res) => {
  const { data, error } = await supabase.from("movies").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

const getMovie = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

const searchMovies = async (req, res) => {
  const { query } = req.query;
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .ilike("title", `%${query}%`);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

const createMovie = async (req, res) => {
  const { title, description, release_date } = req.body;
  const { data, error } = await supabase
    .from("movies")
    .insert([{ title, description, release_date }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, description, release_date } = req.body;
  const { data, error } = await supabase
    .from("movies")
    .update({ title, description, release_date })
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

const addFavorite = async (req, res) => {
  const { movie_id, user_id } = req.body;
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ movie_id, user_id }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
};

const getFavorites = async (req, res) => {
  const { user_id } = req.query;
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { movie_id, user_id } = req.body;
  const { data, error } = await supabase
    .from("favorites")
    .update({ movie_id, user_id })
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

module.exports = {
  getAllMovies,
  getMovie,
  searchMovies,
  createMovie,
  updateMovie,
  addFavorite,
  getFavorites,
  updateFavorite,
};
