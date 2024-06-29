import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";





export const register = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword, gender } = req.body;
        if (!fullname || !username || !password || !confirmpassword || !gender) {
            return res.status(400).json({ message: "All feilds are required" })
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Password not matched!" })
        }

        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ message: "username already exist. " })
        }

        const hashpassword = await bcrypt.hash(password, 10)// this is used for hasing the password

        //Profilephoto api and implimentation
        const maleprofile = `https://i.pinimg.com/736x/9a/bb/94/9abb9492b3743a8d65b3052b969a9221.jpg? ${username}`
        const femaleprofile = `https://i.pinimg.com/736x/d4/47/ac/d447acd5bb05fb1b469e354b7b093019.jpg? ${username}`
        await User.create({
            fullname,
            username,
            password: hashpassword,
            profilephoto: gender === "male" ? maleprofile : femaleprofile,
            gender
        })
        console.log('account created successfully');

        return res.status(201).json({
            message: `account created successfully`,
            success: true

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal error!" });
    }

};
export const login = async (req, res) => {
    try {
        const { username, password, } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        };

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Username not found !",

            })
        };

        // hash password matching function
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false

            })
        };
        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        console.log('login successfully!');
        const name = user.fullname;
        // these code print values in client side....
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true }).json({
            message: `Wellcome ${name}`,
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            profilePhoto: user.profilephoto,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal error!" });
    }
}



// logout api
export const logout = (req, res) => {

    try {

        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: `logout successfully` })


    }

    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal error!" });
    }
};

// to show others user data

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers)
    }
    catch (error) {
        console.log(error)
    }
}

