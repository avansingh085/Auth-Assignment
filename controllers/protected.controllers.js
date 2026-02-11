const crypto = require('crypto');
const authProtected = async (req, res) => {
    if (!req.user || !req.user.email) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const email = req.user.email;

    const successFlag = crypto
        .createHash("sha256")
        .update(email)
        .digest("hex")
        .slice(0, 16);

    res.json({
        message: "Access granted",
        user: req.user,
        success_flag: successFlag,
    });
};

module.exports={authProtected}