const jwt = require('jsonwebtoken')
const { response } = require('../helpers/response.formatter')
const { auth_secret } = require('../config/base.config')

module.exports = {


    checkToken: async (req, res, next) => {
        let token = req.header('Authorization')
        if (!token) {
            return res.status(401).json(response(401, 'Unauthorized'))
        }

        try {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }

            const decoded = jwt.verify(token, auth_secret);

            // simpan full user payload
            req.user = decoded;

            next();
        } catch (error) {
            return res.status(401).json(response(401, 'Unauthorized'))
        }
    },

    checkAdmin: async (req, res, next) => {

        try {

            if (req.user.role !== "admin") {

                return res.status(403).json(
                    response(403, "Forbidden", "Admin access only")
                );

            }
            next();

        } catch (error) {
            return res.status(500).json(
                response(500, "Server Error", error.message)
            );
        }
    }
};
