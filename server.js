const express = require("express");
const cookieParser = require("cookie-parser");
const cors=require('cors');
const requestLogger = require("./middleware/logger.js");
const authRoutes=require('./routes/auth.routes.js');
const authProtected=require('./routes/protected.routes.js');

 const app = express();
 const PORT = 3000;

 app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth",authRoutes);
app.use("/protected",authProtected)

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "OK",
    message: "Server is healthy",
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
