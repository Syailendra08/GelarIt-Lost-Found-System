const Validator = require("fastest-validator");
const v = new Validator();

const { User } = require("../models");
const { response } = require("../helpers/response.formatter");

const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

const { auth_secret } = require("../config/base.config");

module.exports = {

    
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const schema = {
                email: { type: "email" },
                password: { type: "string", min: 6 }
            };

            const validate = v.validate(req.body, schema);

            if (validate.length > 0) {
                return res.status(400).json(
                    response(400, "Validation Error", validate)
                );
            }

            const user = await User.findOne({
                where: {
                    email: email
                }
            });

            if (!user) {
                return res.status(404).json(
                    response(404, "User tidak ditemukan")
                );
            }

            const checkPassword = passwordHash.verify(
                password,
                user.password
            );

            if (!checkPassword) {
                return res.status(400).json(
                    response(400, "Password salah!")
                );
            }
            const token = jwt.sign(
                {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                auth_secret,
                {
                    expiresIn: "1d"
                }
            );

            const formatData = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: token
            };

            return res.status(200).json(
                response(200, "Login Success", formatData)
            );

        } catch (error) {

            return res.status(500).json(
                response(500, "Server Error", error.message)
            );

        }
    },



  
    register: async (req, res) => {
        try {

            const { name, email, password, role } = req.body;

           
            const schema = {
                name: { type: "string", min: 3 },
                email: { type: "email" },
                password: { type: "string", min: 6 },
               
            };

            const validate = v.validate(req.body, schema);

            if (validate.length > 0) {
                return res.status(400).json(
                    response(400, "Validation Error", validate)
                );
            }

            
            const checkEmail = await User.findOne({
                where: {
                    email: email
                }
            });

            if (checkEmail) {
                return res.status(400).json(
                    response(400, "Email already exists")
                );
            }

            
            const hashedPassword = passwordHash.generate(password);

            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                role: "student"
            });

            return res.status(201).json(
                response(201, "Register Success", user)
            );

        } catch (error) {

            return res.status(500).json(
                response(500, "Server Error", error.message)
            );

        }
    }

};