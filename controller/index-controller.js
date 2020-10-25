const db = require('../models');
exports.particularUser = function(req, res){
    db.User.findOne({
        where: {
            id: req.params.id
        },
        include : [{
            model: db.Note,
            include: [{
                model: db.Task
            }]
        }],       
    }).then(user => {
        var id = req.params.id;
        console.log(id);
        res.json({
            message: `Note And Task Of User`,
            body:user
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Error",
            body: err
        })
    })
}