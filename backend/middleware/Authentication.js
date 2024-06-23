import jwt from "jsonwebtoken";
const isauth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "user not authentication" })
        };
        // take userid from token in userCon..
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decode)
        if (!decode) {
            return res.status(401).json({ message: "invalid" })
        };

        req.id = decode.userId;
        next();

    } catch (error) {
        console.log(error)

    }
};
export default isauth;

