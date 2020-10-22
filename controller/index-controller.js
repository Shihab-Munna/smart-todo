const db = require('../models');

exports.particularUser = function(req, res){
    db.User.findAll({
        include:[{
            model: db.Note,
            include:[{
                model: db.Task
            }]
        }]
    }).then(user => {
        var id = req.params.id;
        console.log(id);
        res.json({
            message: `Note And Task Of ${user[id-1].user_name}`,
            body:user[id-1]
        })
    }).catch(err => {
        res.status(500).json({
            message: "Error",
            body: err
        })
    })
}