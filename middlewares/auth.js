const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, "secret", (error, decoded) => {
                if (error) {
                    res.status(error.code).send(error.message);
                } else {
                    req.user = decoded.result;
                    next();
                }
            });
        } else {
            res.status(403).send("Access denied ! No token");
        }
    }
};
