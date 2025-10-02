const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbconfig");
const jwt = require("jsonwebtoken");

// Register new user
async function register(req, res) {
  const { username, first_name, last_name, email, password } = req.body;

  if (!email || !password || !first_name || !last_name || !username) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please provide all required fields",
    });
  }

  if (password.length < 8) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Password must be at least 8 characters",
    });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT username,userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (user.length > 0) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, first_name, last_name, email, hashedPassword]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "User registered successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An unexpected error occurred.",
    });
  }
}

// Login
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide all required information" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid, password FROM users WHERE email=?",
      [email]
    );

    if (user.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid credentials" });
    }

    const { username, userid } = user[0];
    const token = jwt.sign({ username, userid }, process.env.JWTSECRET, {
      expiresIn: "1d",
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: "User login successfully", token });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, try again later" });
  }
}

// Validate token user
function checkuser(req, res) {
  const { username, userid } = req.user;
  return res
    .status(StatusCodes.OK)
    .json({ message: "Valid user", username, userid });
}

module.exports = { register, checkuser, login };
