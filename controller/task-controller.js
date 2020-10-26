const db = require('../models');
const d = new Date();

exports.allTasks = function (req, res) {
    db.Task.findAll().then(tasks => {
        res.json({
            message: "All tasks",
            body: tasks
        })
    }).catch(err => {
        res.status(500).json({
            message: "Something Went Wrong :",
            body: err
        })
    })
};

exports.addTask = function (req, res) {
    db.Task.create({
        task: req.body.task,
        task_status: req.body.task_status,
        createAt: d,
        updatedAt: d,
        NoteId: req.body.NoteId
    }).then(task => {
        res.json({
            message: "Task Created Successfully!"
        })
    }).catch(err => {
        res.status(500).json({
            message: "Error",
            body: err
        })
    })
}

exports.updateTask = function (req, res) {
    db.Task.update({
        task: req.body.task,
        task_status: req.body.task_status,
        updatedAt: d
    }, {
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json({
            message: "Task Updated!!"
        })

    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong: Error",
            body: err
        })
    })
};

exports.deleteTask = function (req, res) {
    db.Task.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json({
            message: "Task Removed!!"
        })
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong: Error",
            body: err
        })
    })
}

// exports.deleteTask = function(req, res){
//     var query = "DELETE FROM `task`\
//     WHERE ((`task_id` = '"+req.params.id+"'))"

//     mysqlConnection.query(query, (err, rows, fields) => {
//         if(!err){
//             res.json({
//                 message: `User ${req.params.id} Deleted Successfully!`
//             })
//         }

//         else{
//             res.status(500).json({
//                 error : "Something Went Wrong! Or Server Error"
//             })
//         }
//     });
// };