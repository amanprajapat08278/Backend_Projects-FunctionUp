const { isValidObjectId } = require("mongoose");
const blogModel = require("../models/blogModel")

const createBlog = async function (req, res) {

    try {
        let data = req.body;
        let { title, body, authorId, tags, category, subcategory } = data;

        if (!title || !body || !authorId || !tags || !category || !subcategory) {
            res.status(400).send("All fields are mandatory")
        }

        let result = await blogModel.create(data)
        res.status(201).send({ status: true, msg: result })

    } catch (err) {
        res.status(500).send(err.message)
    }

}


const getBlogs = async function (req, res) {

    try {
        let data = req.query       
        data.isDeleted = false;
        data.isPublished = true;

        let id = req.query.authorId
        if (id) {
            if (!isValidObjectId(id)) {
                res.status(400).send("please enter a valid author id")
            }
        }

        let result = await blogModel.find(data).populate("authorId")
    
        if (result.length <= 0) {
            res.status(404).send({ status: false, msg: "blog not found" })
        } else {
            res.status(200).send({ status: true, msg: result })
        }

    } catch (err) {
        res.status(500).send(err.message)
    }


}

module.exports = { createBlog, getBlogs }