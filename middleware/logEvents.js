const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

const fs = require("fs");
const fsPromises = require("fs");
const path = require("path");

const logEvents = async (msg, logName) => {
	const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
	const logItem = `${dateTime}\t${uuid()}\t${msg}\n`;
	const logFolder = path.join(
		__dirname,
		"..",
		"logs",
		`${format(new Date(), "yyyyMM")}`
	);

	try {
		if (!fs.existsSync(logFolder)) {
			await fsPromises.mkdirSync(logFolder, { recursive: true }, (err) => {
				if (err)
					console.error("New error create folder logs date message", {
						cause: err.message,
						stack: "\n" + err.stack,
					});
			});
		}
		await fsPromises.appendFile(
			path.join(
				__dirname,
				"..",
				"logs",
				`${format(new Date(), "yyyyMM")}`,
				logName
			),
			logItem,
			(err) => {
				if (err)
					console.error("New error create folder logs date message", {
						cause: err.message,
						code: err.code,
						stack: err.stack,
					});
			}
		);
	} catch (err) {
		if (err)
			console.error("New error message", {
				cause: err.message,
				code: err.code,
				stack: err.stack,
			});
	}
};

module.exports = logEvents;
