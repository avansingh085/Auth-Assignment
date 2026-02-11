const express = require("express");
const cookieParser = require("cookie-parser");
const cors=require('cors');
const requestLogger = require("./middleware/logger.js");
const authRoutes=require('./routes/auth.routes.js');

 const app = express();
 const PORT = 3000;

 app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/",authRoutes);

app.get("/",(req,res)=>{
  return res.send(`kkkk`)
})
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
