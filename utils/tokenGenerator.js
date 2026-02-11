const jwt = require("jsonwebtoken");
const { getSecretFromDB } = require("./mockDb.js");

const generateToken = async (email) => {

  const secrete = await getSecretFromDB();
  
  if (!secrete) {
    throw new Error("JWT_SECRET not defined");
  }

  const token = await jwt.sign(
    { email },
    secrete,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = { generateToken };
