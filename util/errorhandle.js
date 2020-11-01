class passError extends Error {
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }
}

const errorHandler =  (err, res) => {
    var status = err.status
    if(typeof(err.status) == "undefined") status = 500
    res.status(err.status).json({
        status: "Error",
        message: err.message
    });
}


module.exports = {
    passError: passError,
    errorHandler: errorHandler
}