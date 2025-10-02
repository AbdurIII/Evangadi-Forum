const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbconfig");

async function postAnswer(req, res) {
  const { answer } = req.body;
  const { questionid } = req.params;

  if (!questionid || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required information" });
  }

  try {
    const userid = req.user.userid;
    await dbConnection.query(
      "INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)",
      [questionid, userid, answer]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "Answer added" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}

async function getAnswer(req, res) {
  const { questionid } = req.params;

  if (!questionid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a question ID." });
  }

  try {
    const [questions] = await dbConnection.query(
      "SELECT questionid FROM questions WHERE questionid = ?",
      [questionid]
    );

    if (questions.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No question found with this ID." });
    }

    const [answer] = await dbConnection.query(
      `SELECT answers.answerid, answers.answer, answers.userid, answers.created_at,
              users.username AS user_name
       FROM answers
       JOIN users ON answers.userid = users.userid
       WHERE questionid = ?`,
      [questionid]
    );

    return res.status(StatusCodes.OK).json({ questionid, answer });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again!" });
  }
}

module.exports = { postAnswer, getAnswer };
