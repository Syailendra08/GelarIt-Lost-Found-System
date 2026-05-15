const Validator = require("fastest-validator");
const v = new Validator();
const passwordHash = require("password-hash");
const { User, Item } = require("../models");
const { response } = require("../helpers/response.formatter");

module.exports = {

    createUser: async (req, res) => {
        try {
            const schema = {
                name: { type: "string", min: 3 },
                email: { type: "email", },
                password: { type: "string", min: 6 },
                role: { type: "enum", values: ["admin", "student"] }
            }
            const data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            };

            const validate = v.validate(data, schema);
            if (validate.length > 0) {
                return res.status(400).json(response(400, "Validation Error", validate));
            }

            const checkEmail = await User.findOne({
                where: {
                    email: data.email
                }
            });


            if (checkEmail) {
                return res.status(400).json(response(400, "Email already exists"));
            }

            data.password = passwordHash.generate(data.password);
            const user = await User.create(data);
            return res.status(201).json(response(201, "Create User success", user));
        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message))

        }
    },

    getUsers: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;
            const offset = (page - 1) * limit;
            const { count, rows } = await User.findAndCountAll({
                offset: offset, limit: limit,
                attributes: {
                    exclude: ["password"]
                },

                include: [
                    {
                        model: Item,
                        as: "foundItems"
                    },
                    {
                        model: Item,
                        as: "receivedItems"
                    }
                ],



            });

            const formatPagination = {
                data: rows,
                limit: limit,
                rangeData: (offset + 1) + "-" + (offset + rows.length),
                currentPage: page,
                totalPage: Math.round(count / limit),
                total: count,
            }
            return res.status(200).json(response(200, "Success get all users", formatPagination));
        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    showUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                attributes: {
                    exclude: ["password"]
                },

                include: [
                    {
                        model: Item,
                        as: "foundItems"
                    },
                    {
                        model: Item,
                        as: "receivedItems"
                    }
                ]
            });
            if (!user) {
                return res.status(400).json(response(400, "Data [id] Not Found"));
            }

            return res.status(200).json(response(200, "Success get user", user));


        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, role } = req.body;

            const schema = {
                name: { type: "string", optional: true },
                email: { type: "email", optional: true },
                role: {
                    type: "enum",
                    values: ["admin", "student"],
                    optional: true
                }
            };

            const data = {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role
            };

            const validate = v.validate(data, schema);
            if (validate.length > 0) {
                
                return res.status(400).json(response(400, "Validasi Error",
                    validate));

            }

            const newUser = await User.findByPk(id);

            if (!newUser) {
                return res.status(400).json(
                    response(400, "User not found")
                );

            }

            const updateProcess = await User.update({
                name: name,
                email: email,
                role: role
            }, {
                where: {id: id} 
            });

             return res.status(200).json(
                response(200, "Update User Success", newUser)
            );
        } catch (error) {
             return res.status(500).json(response(500, "Server Error", error.message));

        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
           

            if(!user) {
                return res.status(400).json(response(400, "User not found "))
            }

             const deleteProcess = await User.destroy({
                where: {id, id}
            });
            return res.status(200).json(response(200, "Delete User success",))
        }catch(error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    }


}