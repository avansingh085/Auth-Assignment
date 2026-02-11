
const generateSessionId = require("../utils/generateSession.js");

const { generateToken } = require("../utils/tokenGenerator.js");

const generateOTP = require("../utils/generateOTP.js");


const loginSessions = {};
const verifiedSessions = {};
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || password !== "password123") {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const loginSessionId = generateSessionId();
    const otp = generateOTP();

    loginSessions[loginSessionId] = {
        email,
        otp,
        verified: false,
    };

    console.log(`[OTP] Session ${loginSessionId} generated: ${otp}`);

    res.json({ loginSessionId });
};


const verifyOtp = async (req, res) => {
    const { loginSessionId, otp } = req.body;

    const session = loginSessions[loginSessionId];

    if (!session) {
        return res.status(400).json({ message: "Invalid session" });
    }


    if (session.otp !== String(otp)) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    session.verified = true;

    const sessionToken = await generateSessionId();

    verifiedSessions[sessionToken] = {
        email: session.email,
    };


    res.cookie("session_token", sessionToken, {
        httpOnly: true,
    });

    res.json({ message: "OTP verified" });
};

const authToken = async (req, res) => {
    const sessionToken = req.cookies.session_token;

    if (!sessionToken) {
        return res.status(401).json({ message: "No session cookie found" });
    }

    const session = verifiedSessions[sessionToken];

    if (!session) {
        return res.status(401).json({ message: "Invalid session" });
    }

    const token = await generateToken(session.email);

    res.json({ access_token: token });
};






module.exports = { login, verifyOtp, authToken }



