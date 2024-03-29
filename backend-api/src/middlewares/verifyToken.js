import jwt from "jsonwebtoken";

// This middleware verify for existing valid token at req.headers for each request
function verifyMyToken(req, res, next) {
    const authTokenHeader = req.headers.authtoken;
    console.log("You are browsing with this token: ", authTokenHeader)

    if (authTokenHeader) {
        const token = authTokenHeader.split(" ")[1] // Extract only token from "Bearer 'tokenHere'"
        jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
            if (error) res.status(403).json("Missing permissions for this Token!")
            req.user = user; // user is Data provided by jwt
            next();
        })
    } else {
        return res.status(401).json("Token no provided")
    }
}
export default verifyMyToken;
