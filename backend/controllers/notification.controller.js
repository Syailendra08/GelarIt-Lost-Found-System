const {
    sequelize,
    Notification,
    User
} = require("../models");

const { response } = require("../helpers/response.formatter");

module.exports = {

   
    getMyNotifications: async (req, res) => {
        try {
            const notifications = await Notification.findAll({
                where: {
                    user_id: req.user.id,
                    is_read: false,
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

                order: [
                    ["createdAt", "DESC"]
                ]

            });

            return res.status(200).json(response(200, "Success get notifications", notifications));

        } catch (error) {
            return res.status(500).json(response(500, "Server Error",error.message));
        }
    },



    getNotificationById: async (req, res) => {
        try {
            const notification = await Notification.findByPk(
                req.params.id,

                {

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
            );

            if (!notification) {

                return res.status(404).json(
                    response(404, "Notification not found")
                );

            }

            if (notification.user_id !== req.user.id) {

                return res.status(403).json(
                    response(403, "Forbidden")
                );

            }

            return res.status(200).json(
                response(
                    200,
                    "Success get notification",
                    notification
                )
            );

        } catch (error) {

            return res.status(500).json(response(500,
                "Server Error",
                error.message
            )
            );
        }
    },



    readNotification: async (req, res) => {

        const transaction = await sequelize.transaction();

        try {

            const notification = await Notification.findByPk(
                req.params.id,
                { transaction }
            );

            if (!notification) {

                await transaction.rollback();

                return res.status(404).json(response(404, "Notification not found"));

            }


            if (notification.user_id !== req.user.id) {

                await transaction.rollback();

                return res.status(403).json(response(403, "Forbidden"));

            }

            await notification.update(

                {
                    is_read: true
                },

                {
                    transaction
                }

            );

            await transaction.commit();

            return res.status(200).json(
                response(200, "Read Notification Success", notification));

        } catch (error) {

            await transaction.rollback();

            return res.status(500).json(response(500, "Server Error", error.message));

        }
    },


    readAllNotifications: async (req, res) => {

        const transaction = await sequelize.transaction();

        try {

            await Notification.update(

                {
                    is_read: true
                },

                {
                    where: {
                        user_id: req.user.id,
                        is_read: false
                    },

                    transaction
                }

            );

            await transaction.commit();

            return res.status(200).json(response(200, "Read All Notifications Success"));

        } catch (error) {

            await transaction.rollback();

            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },


   
};