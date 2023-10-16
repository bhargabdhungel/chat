import User from "./models/User.js";

async function Signup(req, res) {

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    const alreadyPresent = await User.findOne({ email: req.body.email });
    if (alreadyPresent) {
        return res.send("🚫 Email already exists");
    }
    
    try {
        await user.save();
        res.send("✅ User saved");
    } catch (err) {
        console.log("🚫 Error saving user", err);
    }
}

export default Signup;