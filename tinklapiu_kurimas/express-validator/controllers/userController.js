const pool = require("../db");
const bcrypt = require("bcrypt");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Database error occurred" });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Database error occurred" });
  }
};

// Add a new user
const addUser = async (req, res) => {
  const { email, password, age } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password, age) VALUES ($1, $2, $3) RETURNING *",
      [email, password, age || null]
    );
    res.status(201).json({ message: "User added", user: result.rows[0] });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Database error occurred" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Database error occurred" });
  }
};

const registerUser = async (req, res) => {
  const { email, password, age } = req.body;

  if (!email || !password || age === undefined) {
    return res
      .status(400)
      .json({ error: "Email, password, and age are required" });
  }

  try {
    // Check if the email already exists
    const emailCheck = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, password, age) VALUES ($1, $2, $3) RETURNING *",
      [email, hashedPassword, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Database error occurred" });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
};
