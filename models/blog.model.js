var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
})

BlogSchema.plugin(mongoosePaginate)
const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog;