const mysqlConnection = require('../connection');

//For user one All notes 
exports.allNotes =  function(req, res){
    var query = "SELECT * FROM `notes` WHERE `user_id` = '"+req.params.id+"' LIMIT 50";

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({
                message: `All Notes For User ${req.params.id}`,
                body: rows
            });
        }
        else{
            console.log(err);
        }
    });
}

exports.allTask = function(req, res){
    var query = "SELECT * FROM `task` \
    WHERE `note_id` = '"+req.params.id+"'\
    and `task_status` != 'Done'";
    console.log(req.params.id);
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({
                message: `All Tasks For Node ${req.params.id}`,
                body: rows
            });
        }
        else{
            console.log(err);
        }
    });
}


exports.particularTask = function(req, res){
    
    var query = "select task.task  from task where\
    note_id = '"+req.params.note_id+"'  and task_id  = '"+req.params.task_id+"'"
    var task_exist = "SELECT `task` from `task` WHERE `task_id` = '"+req.params.task_id+"'"

    mysqlConnection.query(task_exist, (err, rows, fields) =>{
        if(!err){
            var data = [];
            data = rows ;

        if (data.length != 0 ){
            mysqlConnection.query(query, (err, rows, fields) => {
                if(!err){
                    res.json({
                        message: `tasks ${req.params.task_id} from note ${req.params.note_id}`,
                        body: rows 
                    })
                }
               
                else {
                    console.log(err);
                }
            })
        }

        else {
            var sts = 400;

            res.status(sts).json({
                message: "No task Found!"
            })
        }

        }

        else {
            console.log(err);
        }
    })

}