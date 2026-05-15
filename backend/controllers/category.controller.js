const Validator = require("fastest-validator");
const v = new Validator();

const { Category } = require("../models");

const { response } = require("../helpers/response.formatter");

module.exports = {
    createCategory: async (req, res) => {
        try {
            const schema = {
                name: {type: "string", min: 3},
                description: { type: "string", optional: true}
            };

            const validate = v.validate(req.body, schema);

            if (validate.length > 0) {
                return res.status(400).json(response(400, "Validation Error", validate));

            }
            const Category = await Category.create({
                name: req.body.name,
                description: req.body.description
            });

            return res.status(201).json(response(201, "Create Category Successful", Category ))
        } catch (error) {
            return res.status(500).json(response(500, "Server Error", error.message))

        };
    },
    
}