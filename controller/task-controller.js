const db = require('../models');
const d = new Date();
const {passError} = require('../util/errorhandle');

exports.allTasks = async (req, res, next) => {
    try {
        if (!(Object.keys(req.query).length === 0)) {
            if (req.query.user_id) {
                var noteTask = await db.Note.findAll({where: {UserId: req.query.user_id},
                include: [{
                    model: db.Task
                }]});
            
                if (noteTask.length != 0){
                    var Tasks = [];
                    for(var i = 0 ; i < noteTask.length ; i++){
                        Tasks[i] = noteTask[i].Tasks
                    }
                    if (Tasks.length != 0) {
                        res.json({
                            message: `All Task For User ${req.query.user_id}`,
                            tasks:  Tasks  
                        })
                        
                    } else {
                        throw new passError(404, "No Tasks Found For This user");
                    }

                    
                } else {

                    throw new passError(404, "No Tasks Found For This user");
                }

                
            } else {

                throw new passError(400, "Query is not right")
            }
            
        } else {
            var alltask = await db.Task.findAll();
            if (alltask.length != 0) {
                res.json({
                    message: `All Tasks`,
                    Tasks: alltask
                });
            } else {
    
                throw new passError(404, "No tasks Found");
            }
            
        }
    
        //next()
    } catch (error) {
        next(error)
    }
};



exports.addTask = async (req, res, next) => {
    try {
        var task = await db.Task.create(req.body);
        console.log(task);
        if (task.length != 0) {
            res.json({
                Message: "Task Created Successfully",
            });
        } else {
            throw new passError(500, "Something went wrong Failed to create Task");
        }

        // next();

    } catch (error) {
        next(error);
    }

};

exports.updateTask = async (req, res, next) => {
    try {

        var task = await db.Task.findAll({
            where: {
                id: req.params.id
            }
        });
        console.log("Task Found", task);
        console.log(typeof (task), task.length);
        if (task.length) {
            await db.Task.update({
                task: req.body.task,
                task_status: req.body.task_status,
                updatedAt: d
            }, {
                where: {
                    id: req.params.id
                }
            });

            res.json({
                message: `Task Updated Succssfully`
            })
        } else {
            console.log("Else");

            throw new passError(400, "No Such Task Found");
        }

        // next()
    } catch (error) {
        next(error);

    }
}

exports.deleteTask = async (req, res, next) => {
    try {
        var task = await db.Task.findAll({
            where: {
                id: req.params.id
            }
        });

        if (task.length) {
            await db.Task.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json({
                message: "Task Deleted Successfully"
            })
        } else {
            throw new passError(400, "No Such Task Found !");
        }

        // next()
    } catch (error) {
        next(error);
    }

}

exports.noteOfTask = async (req, res, next) => {
    try {
        var noteWithtask = await db.Task.findAll({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.Note
            }]
        });

        if (noteWithtask.length != 0) {
            res.json({
                message: `Note Of Task ${req.params.id}`,
                Note: noteWithtask[0].Note
            })
        } else {
            throw new passError(404, "No Such Task Found");
        }
    } catch (error) {
        next(error)
    }
}