const mysqlConnection = require('../connection');

exports.tasks = function(req, res){
    var query = "SELECT * FROM `task` LIMIT 50"
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({
                message: "All User",
                body: rows
            });
        }
        else{
            console.log(err);
        }
    })
};

exports.addTask = function(req, res){
    const query = "INSERT INTO `task` (`task_status`, `note_id`, `task`)\
    VALUES ('"+req.body.task_status+"', '"+req.body.note_id+"', '"+req.body.task+"')"

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({
                message: `Task Added under note${req.body.note_id}`,
                body: req.body
            })
        }

        else{
            console.log(err);
        }
    })

};

exports.updateTask = function(req, res){
   const query = "UPDATE `task` SET\
   `task_id` = '"+req.body.task_id+"',\
   `note_id` = '"+req.body.note_id+"',\
   `task` = '"+req.body.task+"',\
   `task_status` = '"+req.body.task_status+"'\
    WHERE `task_id` = '"+req.params.id+"'"

   mysqlConnection.query(query, (err, rows, fields) => {
       if(!err){
           res.json({
               message: "Task Updated Successfully",
               body: req.body
           })
       }
   })
};

exports.deleteTask = function(req, res){
    var query = "DELETE FROM `task`\
    WHERE ((`task_id` = '"+req.params.id+"'))"

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({
                message: `User ${req.params.id} Deleted Successfully!`
            })
        }

        else{
            console.log(err);
        }
    });
};



