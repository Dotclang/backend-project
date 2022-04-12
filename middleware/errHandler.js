const logEvents = require("./logEvents");

const errHandler = (err, req, res, next) => {
	logEvents(`${err.name}: ${err.message}`, "errLog.txt");
	console.log("New error message", { cause: err.message, stack: err.stack });
	res.status(500).send(err.message);
};

module.exports = errHandler;
