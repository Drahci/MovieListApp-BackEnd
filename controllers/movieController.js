const supabase = require("../config/supabaseClient");

const getAllMovies = async (req, res) => {
  try {
    const { data, error } = await supabase.from("movies").select("*");

    if (error) {
      console.error("Error fetching movies:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};

const getMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching movie:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};

const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .ilike("title", `%${query}%`);

    if (error) {
      console.error("Error searching movies:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, description, release_date } = req.body;
    const { data, error } = await supabase
      .from("movies")
      .insert([{ title, description, release_date }]);

    if (error) {
      console.error("Error creating movie:", error);
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, release_date } = req.body;
    const { data, error } = await supabase
      .from("movies")
      .update({ title, description, release_date })
      .eq("id", id);

    if (error) {
      console.error("Error updating movie:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { movie_id, user_id } = req.body;
    const { data, error } = await supabase
      .from("favorites")
      .insert([{ movie_id, user_id }]);

    if (error) {
      console.error("Error adding favorite:", error);
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};

const getFavorites = async (req, res) => {
  try {
    const { user_id } = req.query;
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      console.error("Error fetching favorites:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};

const updateFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const { movie_id, user_id } = req.body;
    const { data, error } = await supabase
      .from("favorites")
      .update({ movie_id, user_id })
      .eq("id", id);

    if (error) {
      console.error("Error updating favorite:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
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
