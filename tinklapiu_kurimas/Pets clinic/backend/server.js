const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// postgres
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Failed to authenticate token" });
  }
};


app.get("/api/check-auth", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// register user
app.post("/api/register", async (req, res) => {
  console.log("POST /api/register");
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (role !== "user" && role !== "admin") {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    // check if user already exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const existingUser = result.rows[0];

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // chash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    // request to create a new user
    const newUser = await pool.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
      [email, hashedPassword, role]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Error during registration");
  }
});

// login
app.post("/api/login", async (req, res) => {
  console.log("POST /api/login");
  const { email, password } = req.body;

  try {
    // search email in the database
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    console.log("Stored hashed password:", user.password);
    console.log("Entered password:", password);

    // check password 
    const validPassword = await bcrypt.compare(password, user.password);
    console.log("Password match:", validPassword);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // generate JWT token
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
});

// all appointments
app.get("/api/appointments", verifyToken, async (req, res) => {
  console.log("GET /api/appointments");
  try {
    let query = "SELECT * FROM appointments";
    let values = [];

    if (req.user.role !== "admin") {
      query = "SELECT * FROM appointments WHERE user_id = $1";
      values = [req.user.userId];
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Error fetching appointments" });
  }
});

// create appointment
app.post("/api/appointments", verifyToken, async (req, res) => {
  console.log("POST /api/appointments");
  const { pet_name, pet_owner, description, date, time } = req.body;

  if (!pet_name || !pet_owner || !description || !date || !time) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO appointments (pet_name, pet_owner, description, date, time, user_id, status) VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING *",
      [pet_name, pet_owner, description, date, time, req.user.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error during appointment creation:", error);
    res.status(500).json({ error: "Error during appointment creation" });
  }
});

// search id appointment
app.put("/api/appointments/:id", verifyToken, async (req, res) => {
  console.log("PUT /api/appointments/:id");
  const { id } = req.params;
  const { pet_name, pet_owner, description, date, time, status } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM appointments WHERE id = $1",
      [id]
    );
    const appointment = result.rows[0];

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (req.user.role !== "admin" && appointment.user_id !== req.user.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const updatedResult = await pool.query(
      "UPDATE appointments SET pet_name = $1, pet_owner = $2, description = $3, date = $4, time = $5, status = $6 WHERE id = $7 RETURNING *",
      [pet_name, pet_owner, description, date, time, status, id]
    );

    res.json(updatedResult.rows[0]);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Error updating appointment" });
  }
});

// delete appointment 
app.delete("/api/appointments/:id", verifyToken, async (req, res) => {
  console.log("DELETE /api/appointments/:id");
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM appointments WHERE id = $1",
      [id]
    );
    const appointment = result.rows[0];

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (req.user.role !== "admin" && appointment.user_id !== req.user.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    await pool.query("DELETE FROM appointments WHERE id = $1", [id]);
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Error deleting appointment" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
