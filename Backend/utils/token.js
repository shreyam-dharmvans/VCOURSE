import jwt from "jsonwebtoken"

export const createToken = (id, email, expiresIn) => {
    let payload = { id, email };

    let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn
    })

    return token;
}

export const verifyToken = (req, res, next) => {
    try {
        let token = req.signedCookies['auth_token'];
        if (!token || token.trim() == "") {
            return res.status(400).json({
                success: false,
                message: "token not present"
            });
        }

        const result = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.jwtData = result;
        // console.log(res.locals.jwtData);
        next();

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

}