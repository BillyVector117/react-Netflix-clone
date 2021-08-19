import User from "../models/User"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const { username, email, password, gender } = req.body;
    const isAdmin = req.body.isAdmin
    const newUser = new User({ username, email, password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(), gender, isAdmin });
    try {
        const user = await newUser.save();
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const login = async (req, res) => {
    const { email } = req.body;
    const passwordBody = req.body.password
    try {
        // Find User in DB and validate data
        const user = await User.findOne({ email });
        !user && res.status(401).json('Wrong credentials or User does not exist!')

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        // console.log(originalText)

        originalText !== passwordBody &&
            res.status(401).json("Wrong credentials :(");

        // Creating a Token
        const myToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "5d" })

        // Excluding password for response
        const { password, ...userProperties } = user._doc;
        res.status(200).header("authtoken", `bearer ${myToken}`).json({ ...userProperties, myToken });
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}