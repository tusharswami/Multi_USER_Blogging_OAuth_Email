const Category = require("../models/category");
const slugify = require('slugify');

exports.create = (req, res) => {
    const { name } = req.body;
    let slug = slugify(name).toLowerCase();

    let newCategory = new Category({name, slug});
    newCategory.save((err, data) => {
        if(err.code === 11000){
            return res.status(400).json({
                error : "Category Already Exists" 
            })
        }else{
            return res.json(data);
        }
    });
};

exports.list = (req, res) => {
    Category.find({}).exec((err, data) => {
        if(data.length === 0){
            return res.status(400).json({
                errors : "No Category Found"
            })
        }
        else if(err){
            return res.status(400).json({
                errors : err
            })
        }else{
            return res.json(data);
        }
    });
};

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Category.findOne({slug}).exec((err, data) => {
        if(data === null){
            return res.status(400).json({
                errors : "This Category Does not exists or has been Removed by The Administrator"
            })
            
        }else if(err){
            return res.status(400).json({
                errors : err
            })
        }else{
            return res.json(data);
        }
    });
};

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Category.findOneAndRemove({slug}).exec((err, data) => {
        if(err){
            return res.status(400).json({
                errors : err
            })
        }else{
            return res.json({
                message : "Category Deleted Succesfully"
            });
        }
    });
};