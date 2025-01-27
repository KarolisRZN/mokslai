const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authorsRouter = require("./routes/authors");
const booksRouter = require("./routes/books");
const authController = require("./controllers/authController");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
