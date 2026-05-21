const Validator = require("fastest-validator");
const v = new Validator();
const exceljs = require("exceljs");

const {
    Location,
    Item
} = require("../models");

const { response } = require("../helpers/response.formatter");
const { Op } = require("sequelize");

module.exports = {
    createLocation: async (req, res) => {
        try {
            const schema = {
                name: { type: "string", min: 3 },
                description: { type: "string", min: 3, optional: true }
            };

            const data = {
                name: req.body.name,
                description: req.body.description
            };

            const validate = v.validate(data, schema);

            if (validate.length > 0) {
                return res.status(400).json(response(400, "Validation Error", validate));
            }

            const checkLocation = await Location.findOne({
                where: {
                    name: data.name
                }
            });

            if (checkLocation) {
                return res.status(400).json(response(400, "Location already exists"));
            }

            const location = await Location.create(data);

            return res.status(201).json(response(201, "Create Location Success", location));

        } catch (error) {
            return res.status(500).json(
                response(500, "Server Error", error.message)
            );

        }
    },

    getLocations: async (req, res) => {
        try {


            const { name, sortBy, order, page, limit } = req.query;
            const currentPage = Number(page) || 1;
            const dataLimit = Number(limit) || 5;
            const offset = (currentPage - 1) * dataLimit;

            const { count, rows } = await Location.findAndCountAll({
                offset: offset,
                limit: dataLimit,

                where: name ? {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                } : {},

                order: sortBy && order ? [
                    [sortBy, order]
                ] : [],

                include: [
                    {
                        model: Item,
                        as: "items"
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

            return res.status(200).json(response(200, "success get locations", formatPagination));
        } catch (error) {
            return res.status(500).json(
                response(500, "Server Error", error.message)
            );
        }
    },

    showLocation: async (req, res) => {
        try {

            const { id } = req.params;
            const location = await Location.findByPk(id);
            if (!location) {
                return res.status(400).json(response(400, "Data [id] Not Found"));
            }

            return res.status(200).json(response(200, "success get location", location))
        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));

        }
    },

    updateLocation: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const schema = {
                name: { type: "string", min: 3, optional: true },
                description: { type: "string", optional: true }
            };
            const data = {
                name: name,
                description: description
            };

            const validate = v.validate(data, schema);

            if (validate.length > 0) {

                return res.status(400).json(response(400, "Validation Error", validate));
            }
            const newLocation = await Location.findByPk(id);
            if (!newLocation) {

                return res.status(404).json(
                    response(404, "Location not found")
                );

            }
            await Location.update({
                name: name,
                description: description
            }, {
                where: { id: id }
            });

            return res.status(200).json(response(200, "Update Location Success", newLocation));

        } catch (error) {

            return res.status(500).json(response(500, "Server Error", error.message));

        }

    },

    deleteLocation: async (req, res) => {
        try {
            const {id} = req.params;
            const location = await Location.findByPk(id);
            if (!location) {

                return res.status(404).json(response(404, "Location not found"));

            } 
            const deleteProcess = await Location.destroy({
                where: {id, id}
            });
            return res.status(200).json(response(200, "Delete Location success",))
        }catch(error) {
            return res.status(500).json( response(500, "Server Error", error.message));     
        }
    },

    getTrashLocations: async (req, res) => {
    try {

        const locations = await Location.findAll({
            where: {
                deletedAt: {
                    [Op.ne]: null
                }
            },

            paranoid: false,

            include: [
                {
                    model: Item,
                    as: "items"
                }
            ]
        });

        return res.status(200).json(
            response(200, "Success get trash locations", locations)
        );

    } catch (error) {

        return res.status(500).json(
            response(500, "Server Error", error.message)
        );
    }
},

restoreLocation: async (req, res) => {
    try {
        const { id } = req.params;
        const location = await Location.findOne({
            where: { id },
            paranoid: false
        });

        if (!location) {
            return res.status(404).json(
                response(404, "Location not found")
            );
        }

        const restoreProcess = await Location.restore({
            where: { id }
        });

        return res.status(200).json(response(200, "Success restore location"));

    } catch (error) {

        return res.status(500).json(response(500, "Server Error", error.message));
    }
},

forceDeleteLocation: async (req, res) => {
    try {

        const { id } = req.params;

        const location = await Location.findOne({
            where: { id },
            paranoid: false
        });

        if (!location) {
            return res.status(404).json(response(404, "Location not found"));
        }

        await Location.destroy({
            where: { id },
            force: true
        });

        return res.status(200).json(response(200, "Force delete location success"));

    } catch (error) {
        return res.status(500).json(response(500, "Server Error", error.message));
    }
},

exportLocations: async (req, res) => {
    try {
        const locations = await Location.findAll({
            include: [
                {
                    model: Item,
                    as: "items"
                }
            ]
        });

        const workbook = new exceljs.Workbook();
        const sheet = workbook.addWorksheet("Daftar Locations");

        sheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Nama Location", key: "name", width: 25 },
            { header: "Description", key: "description", width: 35 },
            { header: "Total Items", key: "items", width: 20 },
            { header: "Created At", key: "createdAt", width: 25 },
        ];

        locations.forEach(location => {
            sheet.addRow({
                id: location.id,
                name: location.name,
                description: location.description,
                items: location.items.length,
                createdAt: location.createdAt
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
            "attachment; filename=daftar-locations.xlsx"
        );

        await workbook.xlsx.write(res);

        res.end();

    } catch (error) {
        return res.status(500).json(response(500, "Server Error", error.message));
    }
}

   
}