const jwt = require('jsonwebtoken')
const { response } = require('../helpers/response.formatter')
const { auth_secret } = require('../config/base.config')

module.exports = {
    

    checkToken: async (req, res, next) => {
       
        const token = req.header("Authorization");
        if (!token) {
           
            return res.status(401).json(response(401, "unauthorized", "Please login and try again!"));
        }

        try {
           
            const check = jwt.verify(token, auth_secret);
            
            req.user = check;
            next(); 
        } catch (error) {
            
            return res.status(401).json(response(401, "unauthorized", "Please login and try again!"));

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
