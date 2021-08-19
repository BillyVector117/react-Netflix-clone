import User from "../models/User"
import CryptoJS from "crypto-js"

// GET ONE
export const getOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...moreUserProperties } = user._doc;
        res.status(200).json(moreUserProperties);
    } catch (error) {
        res.status(500).json(error)
    }
}
// GET All
export const getAll = async (req, res) => {
    // req.user is created by jwt (id, isAdmin, iat, exp)
    const query = req.query.limit
    if (req.user.isAdmin) {
        try {
            const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('Only Admin can see all users!')
    }
}
// UPDATE
export const update = async (req, res) => {
    // req.user is created by jwt (id, isAdmin, iat, exp)
    console.log("req.user: ", req.user)
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('Only owner can update this')
    }
}
// UPDATE BEING ADMIN
export const updateBeingAdmin = async (req, res) => {
    // req.user is created by jwt (id, isAdmin, iat, exp)
    /*   console.log("req.user: ", req.user)
      console.log("req.params: ", req.params.id) */
    if (req.user.isAdmin) {
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('Only owner can update this')
    }
}
// DELETE
export const deleteUser = async (req, res) => {
    // req.user is created by jwt (id, isAdmin, iat, exp)
    console.log("req.user: ", req.user)
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted!");
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('Only owner can delete this')
    }
}
// GET USER STATS
export const getStats = async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    try {
        // Return Total Users per Month
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
