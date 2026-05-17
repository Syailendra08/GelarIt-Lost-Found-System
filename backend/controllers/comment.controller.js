const Validator = require("fastest-validator");
const v = new Validator();

const {
    Comment,
    Item,
    User
} = require("../models");

const { response } = require("../helpers/response.formatter");
const { Op } = require("sequelize");

module.exports = {

    createComment: async (req, res) => {
        try {
            const { id } = req.params;
            const schema = {
                comment: { type: "string", min: 1 }
            };

            const item = await Item.findByPk(id);

            if (!item) {

                return res.status(404).json(response(404, "Item not found"));

            }

            const data = {
                item_id: Number(id),
                user_id: req.user.id,
                comment: req.body.comment
            };

            const validate = v.validate(data, schema);

            if (validate.length > 0) {

                return res.status(400).json(
                    response(400, "Validation Error", validate)
                );

            }

            const comment = await Comment.create(data);

            return res.status(201).json(
                response(201, "Create Comment Success", comment)
            );

        } catch (error) {

            return res.status(500).json(
                response(500, "Server Error", error.message)
            );

        }

    },


    getCommentsByItem: async (req, res) => {

        try {
            const { id } = req.params;
            const { comment, sortBy, order, page, limit } = req.query;

            const currentPage = Number(page) || 1;
            const dataLimit = Number(limit) || 5;
            const offset = (currentPage - 1) * dataLimit;

            const item = await Item.findByPk(id);

            if (!item) {
                return res.status(404).json(response(404, "Item not found"));

            }

            const { count, rows } = await Comment.findAndCountAll({

                offset: offset,
                limit: dataLimit,

                where: {
                    item_id: id,

                    ...(comment ? {
                        comment: {
                            [Op.like]: `%${comment}%`
                        }
                    } : {})
                },

                include: [

                    {
                        model: User,
                        as: "user",

                        attributes: {
                            exclude: ["password"]
                        }
                    }

                ],

                order: sortBy && order ? [
                    [sortBy, order]
                ] : [
                    ["createdAt", "DESC"]
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

            return res.status(200).json(response(200, "Success get item comments", formatPagination));

        } catch (error) {

            return res.status(500).json(response(500, "Server Error", error.message));

        }

    },

    updateComment: async (req, res) => {

    try {

        const { id } = req.params;
        const { comment } = req.body;

        const schema = {
            comment: { type: "string", min: 1 }
        };

        const data = {
            comment: comment
        };

        const validate = v.validate(data, schema);

        if (validate.length > 0) {

            return res.status(400).json(
                response(400, "Validation Error", validate)
            );

        }

        const newComment = await Comment.findByPk(id);

        if (!newComment) {

            return res.status(404).json(
                response(404, "Comment not found")
            );

        }

        if (
            newComment.user_id !== req.user.id &&
            req.user.role !== "admin"
        ) {

            return res.status(403).json(
                response(403, "Forbidden", "Access denied")
            );

        }

        await Comment.update({
            comment: comment
        }, {
            where: { id: id }
        });

        return res.status(200).json(
            response(200, "Update Comment Success", newComment)
        );

    } catch (error) {

        return res.status(500).json(
            response(500, "Server Error", error.message)
        );

    }

},

    deleteComment: async (req, res) => {

        try {

            const { id } = req.params;
            const comment = await Comment.findByPk(id);

            if (!comment) {

                return res.status(404).json(response(404, "Comment not found"));

            }
            if (
                comment.user_id !== req.user.id &&
                req.user.role !== "admin"
            ) {

                return res.status(403).json(
                    response(403, "Forbidden", "Access denied")
                );

            }

            const deleteProcess = await Comment.destroy({
                where: { id, id }
            });

            return res.status(200).json(
                response(200, "Delete Comment Success")
            );

        } catch (error) {

            return res.status(500).json(
                response(500, "Server Error", error.message)
            );

        }

    },


    restoreComment: async (req, res) => {

        try {

            const { id } = req.params;

            const comment = await Comment.findOne({

                where: { id },

                paranoid: false

            });

            if (!comment) {
                return res.status(404).json(response(404, "Comment not found"));

            }

            const restoreProcess = await Comment.restore({

                where: { id, id }

            });

            return res.status(200).json(
                response(200, "Restore Comment Success")
            );

        } catch (error) {

            return res.status(500).json(
                response(500, "Server Error", error.message)
            );

        }

    }

};