const dbConnection = require("../db/dbconfig");

async function install(req, res) {
  const createuser = `CREATE TABLE IF NOT EXISTS users(
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY(userid)
  )`;

  const createquestions = `CREATE TABLE IF NOT EXISTS questions(
    id INT(20) NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT(20) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(300) NOT NULL,
    tag VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id,questionid),
    FOREIGN KEY (userid) REFERENCES users(userid)
  )`;

  const createanswers = `CREATE TABLE IF NOT EXISTS answers(
    answerid INT(20) NOT NULL AUTO_INCREMENT,
    userid INT(20) NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (answerid),
    FOREIGN KEY (questionid) REFERENCES questions(questionid),
    FOREIGN KEY (userid) REFERENCES users(userid)
  )`;

  try {
    await dbConnection.query(createuser);
    await dbConnection.query(createquestions);
    await dbConnection.query(createanswers);
    return res.status(201).json({ msg: "Tables created" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, try again later" });
  }
}

module.exports = { install };
