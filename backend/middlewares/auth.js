const jwt = require("jsonwebtoken");

const { response } = require("../helpers/response.formatter");
const { auth_secret } = require("../config/base.config");

module.exports = {

    checkToken: async (req, res, next) => {

        try {

            const bearerToken = req.headers.authorization;

            if (!bearerToken) {
                return res.status(401).json(
                    response(401, "Unauthorized", "Silahkan Login terlbih dahulu")
                );
            }
            const token = bearerToken.split(" ")[1];

            const check = jwt.verify(token, auth_secret);

            req.user = check;

            next();

        } catch (error) {

            return res.status(401).json(
                response(401, "Unauthorized", "Invalid token")
            );

        }
    }

};