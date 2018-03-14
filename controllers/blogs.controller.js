var BlogService = require('../services/blogs.service')

_this = this


exports.getBlogs = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    console.log(page, limit)

    try{
        var blogs = await BlogService.getBlogs({}, page, limit)
        return res.status(200).json({status: 200, data: blogs, message: "Succesfully Blog Recieved"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createBlog = async function(req, res, next){
    var blog = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }

    try{
        var createdBlog = await BlogService.createBlog(blog)
        
        return res.status(201).json({status: 201, data: createdBlog, message: "Succesfully Created Blog"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Blog Creation was Unsuccesfull" })
    }
}

exports.updateBlog = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var blog = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        var updateBlog = await BlogService.updateBlog(blog)
        return res.status(200).json({status: 200, data: updateBlog, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeBlog = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await BlogService.deleteBlog(id)
        return res.status(204).json({status:204, message: "Succesfully Blog Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}