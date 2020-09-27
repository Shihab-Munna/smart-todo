const noteStore =[];
const mysqlConnection = require('../connection');

exports.getNotes = function (req, res){
    var query = "SELECT * FROM `notes` LIMIT 50"
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({
                message: "All Notes",
                body: rows
            });
        }
        else{
            console.log(err);
        }
    });
    
}

exports.createNote = function (req, res) {
    const query = "INSERT INTO `notes` (`user_id`, `note_title`,`note_status`)\
    VALUES ('"+req.body.user_id+"', '"+req.body.note_title+"','"+req.body.note_status+"')";

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({
                message: "Note Added",
                body: req.body
            });
        }

        else{
            console.log(err);
        }
    })

}

exports.updateNote = function(req, res){
    const query = "UPDATE `notes`\
    SET `note_title` = '"+req.body.note_title+"', `note_status` = '"+req.body.note_status+"' \
    WHERE `note_id` = '"+req.params.id+"'"

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({
                message: "Note Updated Successfully",
                body: req.body
            })
        }

        else{
            console.log(err);
        }
    });
}

exports.deleteNote = function(req, res){
    var query = "DELETE FROM `notes`\
    WHERE ((`note_id` = '"+req.params.id+"'))"

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({
                message: `Note ${req.params.id} Deleted Successfully!`
            })
        }

        else{
            console.log(err);
        }
    });
}
