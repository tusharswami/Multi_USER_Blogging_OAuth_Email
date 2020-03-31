const Tag = require('../models/tag');
const slugify = require('slugify');

exports.create = (req, res) => {
    const { name } = req.body;
    let slug = slugify(name).toLowerCase();

    const newTag = new Tag({name, slug});
    newTag.save((err, data) => {
        if(!err){
            return res.json(data);
        }
        if(err.code === 11000){
            return res.status(400).json({
                errors : "Tag Already Exists"
            })
        }else{
            return res.json(data);
        }
    });
};

exports.list = (req, res) => {
    Tag.find({}).exec((err, data) => {
        if(data.length === 0){
            return res.status(400).json({
                errors : "No Tag Found"
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
    Tag.findOne({slug}).exec((err, data) => {
        if(data === null){
            return res.status(400).json({
                errors : "This Tag Does not exists or has been Removed by The Administrator"
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
    Tag.findOneAndRemove({slug}).exec((err, data) => {
        if(err){
            return res.status(400).json({
                errors : err
            })
        }else{
            return res.json({
                message : "Tag Deleted Succesfully"
            });
        }
    });
};