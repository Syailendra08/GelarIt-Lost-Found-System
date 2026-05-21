const Validator = require("fastest-validator");
const v = new Validator();
const passwordHash = require("password-hash");
const exceljs = require("exceljs");
const { User, Item } = require("../models");
const { response } = require("../helpers/response.formatter");
const { Op } = require("sequelize");


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


            const { name, email, sortBy, order, page, limit } = req.query;

            // pagination
            const currentPage = Number(page) || 1;
            const dataLimit = Number(limit) || 5;
            const offset = (currentPage - 1) * dataLimit;

            const { count, rows } = await User.findAndCountAll({
                offset: offset,
                limit: dataLimit,
                where: {
                    ...(name && {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    }),

                    ...(email && {
                        email: {
                            [Op.like]: `%${email}%`
                        }
                    })
                },
                order: sortBy && order ? [
                    [sortBy, order]
                ] : [],
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

            const formatPagination = {
                data: rows,
                limit: dataLimit,
                rangeData: (offset + 1) + "-" + (offset + rows.length),
                currentPage: currentPage,
                totalPage: Math.ceil(count / dataLimit),
                total: count,
            };

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
                where: { id: id }
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


            if (!user) {
                return res.status(400).json(response(400, "User not found "))
            }

            const deleteProcess = await User.destroy({
                where: { id, id }
            });
            return res.status(200).json(response(200, "Delete User success",))
        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    getTrashUsers: async (req, res) => {
    try {

        const users = await User.findAll({
            where: {
                deletedAt: {
                    [Op.ne]: null
                }
            },
            paranoid: false,
            attributes: {
                exclude: ["password"]
            }
        });

        return res.status(200).json(response(200, "Success get trash users", users));

    } catch (error) {
        return res.status(500).json(response(500, "Server Error", error.message));
    }
},

    restoreUser: async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: { id },
            paranoid: false 
        });

        if (!user) {
            return res.status(404).json(response(404, "User not found"));
        }

       const restoreProcess = await User.restore({
                where: {id, id}
            });

        return res.status(200).json(response(200, "Success restore user"));

    } catch (error) {

        return res.status(500).json(response(500, "Server Error", error.message));
    }
},

forceDeleteUser: async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({
            where: { id },
            paranoid: false
        });

        if (!user) {
            return res.status(404).json(
                response(404, "User not found")
            );
        }

        await User.destroy({
            where: { id },
            force: true
        });

        return res.status(200).json(response(200, "Force delete user success"));

    } catch (error) {
        return res.status(500).json(response(500, "Server Error", error.message));
    }
},

exportUsers: async (req, res) => {
        try {
            const users = await User.findAll({
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

            const workbook = new exceljs.Workbook();

            const sheet = workbook.addWorksheet("Daftar Users");

            sheet.columns = [
                { header: "ID", key: "id", width: 10 },
                { header: "Nama", key: "name", width: 25 },
                { header: "Email", key: "email", width: 30 },
                { header: "Role", key: "role", width: 15 },
                { header: "Total Found Items", key: "foundItems", width: 20 },
                { header: "Total Received Items", key: "receivedItems", width: 22 },
                { header: "Created At", key: "createdAt", width: 25 },
            ];

            users.forEach(user => {

                sheet.addRow({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,

                    foundItems: user.foundItems.length,
                    receivedItems: user.receivedItems.length,

                    createdAt: user.createdAt
                });

            });

          
            sheet.getRow(1).font = {
                bold: true
            };

           
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );

            res.setHeader(
                "Content-Disposition",
                "attachment; filename=daftar-users.xlsx"
            );

            //! kirim file excel ke response
            await workbook.xlsx.write(res);

            //! tutup response
            res.end();

        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    }

}