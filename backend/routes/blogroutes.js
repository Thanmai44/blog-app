const express = require("express");
const router = express.Router();
const Blog = require("../models/blogmodels.js");


router.get("/get-all-blogs", async(req, res) => {
    try{
        const blogs = await Blog.find();
        res.send(blogs);
    }catch(err) {
        console.log(err);
        res.status(500).send("failed");
    }
})

router.get("/get-blog/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const blog = await Blog.findById(id);
        res.send(blog);
    }catch(err) {
        console.log(err);
        res.status(500).send("failed");
    }
})

router.put("/update-blog/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const blog = await Blog.findByIdAndUpdate(id, data,{returnOriginal: false});
        res.send(blog);
    }catch(err) {
        console.log(err);
        res.status(500).send("failed");
    }
})

router.delete("/delete-blog/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findByIdAndDelete(id);
        res.send("deleted");
    }catch(err) {
        console.log(err);
        res.status(500).send("failed");
    }
})

router.post("/create-blog", async(req, res) => {
    try {
        const data = req.body;
        const blog = new Blog(data);
        const response = await blog.save();
        console.log(response);
        res.send(response);
    }catch(err) {
        console.log(err);
        res.status(500).send("failed");
    }
})

module.exports = router;