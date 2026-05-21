const Validator = require("fastest-validator");
const v = new Validator();
const exceljs = require("exceljs");
const { Category, Item } = require("../models");
const { response } = require("../helpers/response.formatter");
const { where, Op } = require("sequelize");

module.exports = {
    createCategory: async (req, res) => {
        try {
            const schema = {
                name: { type: "string", min: 3 },
                description: { type: "string", optional: true }
            };

            const validate = v.validate(req.body, schema);

            if (validate.length > 0) {
                return res.status(400).json(response(400, "Validation Error", validate));

            }
            const category = await Category.create({
                name: req.body.name,
                description: req.body.description
            });

            return res.status(201).json(response(201, "Create Category Successful", category))
        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message))

        };
    },
    getCategory: async (req, res) => {
        try {
            const { name, sortBy, order, page, limit } = req.query;
            const currentPage = Number(page) || 1;
            const dataLimit = Number(limit) || 5;
            const offset = (currentPage - 1) * dataLimit;

            const { count, rows } = await Category.findAndCountAll({
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
                rangeData: (offset + 1) + "-" + (offset + rows.length),
                currentPage: currentPage,
                totalPage: Math.ceil(count / dataLimit),
                total: count,
            };

            return res.status(200).json(response(200, "success, get categories", formatPagination));

        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    showCategory: async (req, res) => {
        try {

            const { id } = req.params;
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(400).json(response(400, "Data [id] Not Found"));
            }

            return res.status(200).json(response(200, "success get category", category))
        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));

        }
    },

    updateCategory: async (req, res) => {
        try {
            const { id } = req.params
            const { name, description } = req.body;

            const schema = {
                name: { type: "string", min: 3 },
                description: { type: "string", optional: true }
            };

            const validate = v.validate(req.body, schema);
            if (validate.length > 0) {
                return res.status(400).json(response(400, "Validasi Error", validate));
            }

            const newCategory = await Category.findByPk(id);


            if (!newCategory) {
                return res.status(400).json(response(400, "Category not found"));
            }

            const updateProcess = await Category.update({
                name: name,
                description: description
            }, {
                where: { id: id }
            });


            return res.status(200).json(
                response(200, "Update Category Success", newCategory)
            );

        } catch (error) {

            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);

            const deleteProcess = await Category.destroy({
                where: { id, id }
            });
            return res.status(200).json(response(200, "Delete Category success",))
        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },


    getTrashCategory: async (req, res) => {
        try {
            const categories = await Category.findAll({
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

            return res.status(200).json(response(200, "Success get trash category", categories));

        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    restoreCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findOne({
                where: { id },
                paranoid: false
            });

            if (!category) {
                return res.status(404).json(response(404, "Category not found"));
            }

            const restoreProcess = await Category.restore({
                where: { id, id }
            });

            return res.status(200).json(response(200, "Success restore category"));
        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    forceDeleteCategory: async (req, res) => {
        try {

            const { id } = req.params;
            const category = await Category.findOne({
                where: { id },
                paranoid: false
            });

            if (!category) {
                return res.status(404).json(response(404, "Category not found"));
            }

            await Category.destroy({
                where: { id },
                force: true
            });

            return res.status(200).json(response(200, "Force delete category success"));

        } catch (error) {

            return res.status(500).json(response(500, "Server Error", error.message));
        }
    },

    exportCategories: async (req, res) => {
    try {

        const categories = await Category.findAll({

            include: [
                {
                    model: Item,
                    as: "items"
                }
            ]
        });

        const workbook = new exceljs.Workbook();

        const sheet = workbook.addWorksheet("Daftar Categories");

        sheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Nama Category", key: "name", width: 25 },
            { header: "Description", key: "description", width: 35 },
            { header: "Total Items", key: "items", width: 20 },
            { header: "Created At", key: "createdAt", width: 25 },
        ];

        categories.forEach(category => {

            sheet.addRow({
                id: category.id,
                name: category.name,
                description: category.description,
                items: category.items.length,
                createdAt: category.createdAt
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
            "attachment; filename=daftar-categories.xlsx"
        );

        await workbook.xlsx.write(res);

        res.end();

    } catch (error) {

        return res.status(500).json(
            response(500, "Server Error", error.message)
        );
    }
},





}