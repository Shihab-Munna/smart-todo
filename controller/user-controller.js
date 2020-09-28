//const user =[];
const { connect } = require('../connection');
const mysqlConnection = require('../connection');


exports.users = function(req, res) {
    var query = "SELECT * FROM `user` LIMIT 50"
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({
                message: "All User",
                body: rows
            });
        }
        else{
            res.status(500).json({
                error : "Something Went Wrong! Or Server Error"
            })
        }
    })
};

exports.createUser = function (req, res){
   var query_email = "SELECT `email`  FROM `user`\
   WHERE `email`  =  '"+req.body.email+"'"
   var query = "INSERT INTO `user` (`user_name`, `email`)\
   VALUES ('"+req.body.user_name+"', '"+req.body.email+"')";
  
   mysqlConnection.query(query_email, (err, rows, fields)=> {
        var data = [];
        data = rows;
        if (data.length == 0){
            mysqlConnection.query(query, (err, rows, fields)=> {
                if(!err){
                    res.json({
                        message: `Welcome ${req.body.user_name}`,
                    })
                }
                
                else {
                    
                    res.status(500).json({
                        error : "Something Went Wrong! Or Server Error"
                    })
                }
            })
        }

        else {
            var status_id = 400; 
            res.status(status_id).json({
                message: "This email has been used once! Try with another email"
            })
        }
   })
}; 

exports.updateUser = function (req, res){ 

    const select_user = "SELECT `user_name` FROM `user` \
    WHERE `user_id` = '"+req.params.id+"'";
    
    const query = "UPDATE `user`\
    \SET `user_name` = '"+req.body.user_name+"',\
    `email` = '"+req.body.email+"'\
    WHERE `user_id` = '"+req.params.id+"'";

    mysqlConnection.query(select_user, (err, rows, fields) => {
        var data = [];
        data = rows;
        if( data.length != 0){
            mysqlConnection.query(query, (err, rows, fields) => {
                if(!err){
                    res.json({
                        message: "User Updated Successfully",
                        body: req.body
                    })
                }
        
                else{
                    
                    res.status(500).json({
                        error : "Something Went Wrong! Or Server Error"
                    })
                }
            });

        }

        else{
            var status_id = 404;

            res.status(status_id).json({
                message: "No User Found!"
            })
        }
    })
};

exports.deleteUser = function(req, res){
    var query = "DELETE FROM `user`\
    WHERE ((`user_id` = '"+req.params.id+"'))"

    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({
                message: `User ${req.params.id} Deleted Successfully!`
            })
        }

        else{
            res.status(500).json({
                error : "Something Went Wrong! Or Server Error"
            })
        }
    });
};