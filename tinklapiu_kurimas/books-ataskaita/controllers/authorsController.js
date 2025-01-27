const pool = require("../db");

// get all authors
const getAllAuthors = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM authors");
    res.status(200).json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting authors", error: err.message });
  }
};

// get auhtor by id
const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM authors WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting author", error: err.message });
  }
};

// create author
const createAuthor = async (req, res) => {
  const { name, bio } = req.body;

  // Ensure req.user is defined and has a role property
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO authors (name, bio) VALUES ($1, $2) RETURNING *",
      [name, bio]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating author", error: err.message });
  }
};

// update author by id
const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, birth_date, biography } = req.body;

  try {
    const result = await pool.query(
      "UPDATE authors SET name = $1, birth_date = $2, biography = $3 WHERE id = $4 RETURNING *",
      [name, birth_date, biography, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating author", error: err.message });
  }
};

// delete author by id
const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM authors WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "Author deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting author", error: err.message });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
