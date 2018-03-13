var Blog = require('../models/blog.model')

_this = this


exports.getBlogs = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var blogs = await Blog.paginate(query, options)
        return blogs;
    } catch (e) {
        throw Error('Error while Paginating Blogs')
    }
}

exports.createBlog = async function(blog){

    var newBlog = new Blog({
        title: blog.title,
        description: blog.description,
        date: new Date(),
        status: blog.status
    })

    try{
        var savedBlog = await newBlog.save()
        return savedBlog;
    }catch(e){
        throw Error("Error while Creating Blog")
    }
}

exports.updateBlog = async function(blog){
    var id = blog.id

    try{
        var oldBlog = await Blog.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Blog")
    }

    if(!oldBlog){
        return false;
    }

    console.log(oldBlog)

    oldBlog.title = blog.title
    oldBlog.description = blog.description
    oldBlog.status = blog.status


    console.log(oldBlog)

    try{
        var savedBlog = await oldBlog.save()
        return savedBlog;
    }catch(e){
        throw Error("And Error occured while updating the Blog");
    }
}

exports.deleteBlog = async function(id){
    
    try{
        var deleted = await Blog.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Blog Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Blog")
    }
}