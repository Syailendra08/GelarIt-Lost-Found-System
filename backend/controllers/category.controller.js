const Validator = require("fastest-validator");
const v = new Validator();

const { Category } = require("../models");

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
            ] : []
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
                return res.status(400).json(response(400, "Validasi Error",validate));}

            const newCategory = await Category.findByPk(id);


            if (!newCategory) {
                return res.status(400).json(response(400, "Category not found"));
            }

            const updateProcess = await Category.update({
                name: name,
                description: description
            }, {
                where: {id: id} 
            });


            return res.status(200).json(
                response(200, "Update Category Success", newCategory)
            );

        } catch (error) {

            return res.status(500).json( response(500, "Server Error", error.message));
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const {id} = req.params;
            const category = await Category.findByPk(id);

            const deleteProcess = await Category.destroy({
                where: {id, id}
            });
            return res.status(200).json(response(200, "Delete Category success",))
        }catch(error) {
            return res.status(500).json( response(500, "Server Error", error.message));     
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
                where: {id, id}
            });

        return res.status(200).json(response(200, "Success restore category"));

    } catch (error) {

        return res.status(500).json(response(500, "Server Error", error.message));
    }
}


}