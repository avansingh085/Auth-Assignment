const crypto=require('crypto');
module.exports= function generateSessionId() {
  return crypto.randomBytes(32).toString("hex");
}