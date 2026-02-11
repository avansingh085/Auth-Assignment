const jwt = require("jsonwebtoken");
const { getSecretFromDB } = require("../utils/mockDb.js");

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
   const secrete=await getSecretFromDB();
  if (!secrete) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = await jwt.verify(token, secrete);

    req.user = decoded;
   

    next(); 
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
