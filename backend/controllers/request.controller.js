const Validator = require("fastest-validator");
const v = new Validator();

const {
    sequelize,
    Request,
    Item,
    User
} = require("../models");

const { response } = require("../helpers/response.formatter");

module.exports = {

    createRequest: async (req, res) => {

        try {

            const schema = {
                message: { type: "string", min: 3 }
            };

            const item = await Item.findByPk(req.params.id);

            if (!item) {
                return res.status(404).json(response(404, "Item not found"));

            }

            const data = {
                item_id: Number(req.params.id),
                user_id: req.user.id,
                message: req.body.message
            };

            const validate = v.validate(data, schema);

            if (validate.length > 0) {
                return res.status(400).json(response(400, "Validation Error", validate));
            }


            if (item.finder_id === req.user.id) {

                return res.status(400).json(
                    response(400, "Validation Error", "Finder cannot request their own item")
                );

            }

            const request = await Request.create(data);

            return res.status(201).json(response(201, "Create Request Success", request));

        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));

        }

    },

    getAllRequests: async (req, res) => {

        try {

            const { sortBy, order, page, limit } = req.query;

            const currentPage = Number(page) || 1;
            const dataLimit = Number(limit) || 5;

            const offset = (currentPage - 1) * dataLimit;

            const { count, rows } = await Request.findAndCountAll({
                offset: offset,
                limit: dataLimit,

                order: sortBy && order ? [
                    [sortBy, order]
                ] : [
                    ["createdAt", "DESC"]
                ],

                include: [

                    {
                        model: Item,
                        as: "item"
                    },

                    {
                        model: User,
                        as: "user",
                        attributes: {
                            exclude: ["password"]
                        }
                    }

                ]

            });

            const formatPagination = {
                data: rows,
                limit: dataLimit,
                rows: (offset + 1) + "-" + (offset + rows.length),
                total: count,
                page: currentPage,
                totalPage: Math.ceil(count / dataLimit)
            };
            return res.status(200).json(response(200, "Success get all requests", formatPagination));
        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    getRequestById: async (req, res) => {

        try {
            const request = await Request.findByPk(req.params.id, {

                include: [
                    {
                        model: Item,
                        as: "item"
                    },

                    {
                        model: User,
                        as: "user",
                        attributes: {
                            exclude: ["password"]
                        }
                    }
                ]
            });

            if (!request) {
                return res.status(404).json(response(404, "Request not found"));
            }

            return res.status(200).json(response(200, "Success get request", request));

        } catch (error) {

            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    getRequestsByItem: async (req, res) => {
        try {
            const requests = await Request.findAll({
                where: {
                    item_id: req.params.id
                },

                include: [

                    {
                        model: User,
                        as: "user",
                        attributes: {
                            exclude: ["password"]
                        }
                    }

                ]

            });

            return res.status(200).json(response(200, "Success get item requests", requests));

        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));

        }
    },

    approveRequest: async (req, res) => {

        const transaction = await sequelize.transaction();

        try {

            const request = await Request.findByPk(req.params.id, {
                transaction
            });

            if (!request) {
                await transaction.rollback();
                return res.status(404).json(response(404, "Request not found"));

            }

            const item = await Item.findByPk(request.item_id, {
                transaction
            });

            if (!item) {

                await transaction.rollback();
                return res.status(404).json(response(404, "Item not found"));

            }

            await request.update({
                status: "approved"
            }, {
                transaction
            });

            await item.update({
                receiver_id: request.user_id,
                status: "claimed"

            }, {
                transaction
            });

            await transaction.commit();

            return res.status(200).json(response(200, "Approve Request Success"));

        } catch (error) {
            await transaction.rollback();
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    rejectRequest: async (req, res) => {

        try {

            const request = await Request.findByPk(req.params.id);
            if (!request) {
                return res.status(404).json(response(404, "Request not found"));
            }

            await request.update({
                status: "rejected"
            });

            return res.status(200).json(response(200, "Reject Request Success"));

        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    markAsTaken: async (req, res) => {
        try {

            const item = await Item.findByPk(req.params.id);

            if (!item) {
                return res.status(404).json(response(404, "Item not found"));
            }

            await item.update({ status: "taken" });

            return res.status(200).json(response(200, "Item marked as taken"));

        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    deleteRequest: async (req, res) => {

        try {
            const request = await Request.findByPk(req.params.id);
            if (!request) {
                return res.status(404).json(response(404, "Request not found"));
            }

            await request.destroy();

            return res.status(200).json(response(200, "Delete Request Success"));

        } catch (error) {

            return res.status(500).json(
                response(500, "Server Error", error.message)
            );
        }
    },

    restoreRequest: async (req, res) => {
        try {
            const request = await Request.findOne({
                where: {
                    id: req.params.id
                },

                paranoid: false

            });

            if (!request) {
                return res.status(404).json(
                    response(404, "Request not found")
                );

            }

            await Request.restore({

                where: {
                    id: req.params.id
                }

            });

            return res.status(200).json(response(200, "Restore Request Success"));

        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));

        }

    }


}