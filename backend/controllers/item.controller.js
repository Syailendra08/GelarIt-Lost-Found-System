const Validator = require("fastest-validator");
const v = new Validator();
const { Item, Category, Location, User, Comment, Request } = require("../models");
const { response } = require("../helpers/response.formatter");
const fs = require('fs');
const path = require('path');

module.exports = {
    createItem: async (req, res) => {
        try {

            const schema = {
                categories_id: { type: "number", integer: true, positive: true },
                locations_id: { type: "number", integer: true, positive: true },
                name: { type: "string", min: 3 },
                description: { type: "string", min: 3 },
                color: { type: "string", min: 3 },
                status: {
                    type: "enum",
                    values: [
                        "lost",
                        "found",
                        "claimed",
                        "taken",
                        "swapped"
                    ]
                }
            };

            const data = {
                categories_id: Number(req.body.categories_id),
                locations_id: Number(req.body.locations_id),
                finder_id: req.user.id,
                name: req.body.name,
                description: req.body.description,
                image: req.file.filename,
                color: req.body.color,
                status: req.body.status
            };

            const validate = v.validate(data, schema);
            if (validate.length > 0) {
                return res.status(400).json(response(400, "Validation Error", validate));

            }

            if (!req.file) {
                return res.status(400).json(response(400, "Validation Error", "Image not found"));
            }

            const item = await Item.create(data);

            return res.status(201).json(response(201, "Create Item success", item));

        } catch (error) {

        }
    },

    getItems: async (req, res) => {
        try {
            const items = await Item.findAll({
                include: [

                    {
                        model: Category,
                        as: "category"

                    },
                    {
                        model: Location,
                        as: "location"

                    },
                    {
                        model: User,
                        as: "finder",
                        attributes: {
                            exclude: ["password"]
                        }
                    },
                    {
                        model: User,
                        as: "receiver",
                        attributes: {
                            exclude: ["password"]
                        }
                    },

                    {
                        model: Request,
                        as: "requests"
                    }
                ]
            });

            return res.status(200).json(response(200, "Success get all items", items));

        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    showItem: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Item.findByPk(id, {
                include: [
                    {
                        model: Category,
                        as: "category"

                    },
                    {
                        model: Location,
                        as: "location"

                    },


                    {
                        model: Comment,
                        as: "comments",

                        include: [
                            {
                                model: User,
                                as: "user",
                                attributes: {
                                    exclude: ["password"]
                                }
                            }
                        ]
                    }
                ]
            });

            if (!item) {
                return res.status(400).json(response(400, "Data [id] not found"));
            }
            return res.status(200).json(response(200, "success", item))
        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    updateItem: async (req, res) => {

        try {

            const { id } = req.params;

            const item = await Item.findByPk(id);

            if (!item) {

                return res.status(404).json(
                    response(404, "Item not found")
                );

            }

            const schema = {

                categories_id: {
                    type: "number",
                    integer: true,
                    positive: true,
                    optional: true
                },

                locations_id: {
                    type: "number",
                    integer: true,
                    positive: true,
                    optional: true
                },

                receiver_id: {
                    type: "number",
                    integer: true,
                    positive: true,
                    optional: true
                },

                name: {
                    type: "string",
                    min: 3,
                    optional: true
                },

                description: {
                    type: "string",
                    min: 3,
                    optional: true
                },

                color: {
                    type: "string",
                    min: 3,
                    optional: true
                },

                status: {
                    type: "enum",
                    values: [
                        "lost",
                        "found",
                        "claimed",
                        "taken",
                        "swapped"
                    ],
                    optional: true
                }

            };

            const data = {
                categories_id: req.body.categories_id
                    ? Number(req.body.categories_id)
                    : undefined,

                locations_id: req.body.locations_id
                    ? Number(req.body.locations_id)
                    : undefined,

                receiver_id: req.body.receiver_id
                    ? Number(req.body.receiver_id)
                    : undefined,

                name: req.body.name,
                description: req.body.description,
                color: req.body.color,
                status: req.body.status

            };

            const validate = v.validate(data, schema);
            if (validate.length > 0) {
                return res.status(400).json(
                    response(400, "Validation Error", validate)
                );

            }

            if (req.file) {
                const imageName = item.getDataValue("image");
                const filePath = path.join(
                    __dirname,
                    "../uploads",
                    imageName
                );

                if (fs.existsSync(filePath)) {

                    fs.unlinkSync(filePath);
                }
            }

            await item.update({
                categories_id: data.categories_id ?? item.categories_id,
                locations_id: data.locations_id ?? item.locations_id,
                receiver_id: data.receiver_id ?? item.receiver_id,
                name: data.name ?? item.name,
                description: data.description ?? item.description,
                color: data.color ?? item.color,
                status: data.status ?? item.status,
                image: req.file
                    ? req.file.filename
                    : item.getDataValue("image")

            });


            const newItem = await Item.findByPk(id);

            return res.status(200).json(response(200, "Update Item Success", newItem));

        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    deleteItem: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Item.findByPk(id);

            if (!item) {

                return res.status(404).json(response(404, "Item not found"));

            }

            await Item.destroy({
                where: { id }
            });

            return res.status(200).json(response(200, "Delete Item Success"));

        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    restoreItem: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Item.findOne({
                where: { id },
                paranoid: false
            });

            if (!item) {
                return res.status(404).json(response(404, "Item not found"));
            }

            const restoreProcess = await Item.restore({
                where: { id, id }
            });

            return res.status(200).json(response(200, "Success restore item"));

        } catch (error) {

            return res.status(500).json(response(500, "Server Error", error.message));
        }
    }
}
