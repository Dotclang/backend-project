const whitelist = ["http://localhost:3000", "http://localhost:3500"];
const corsHandler = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccesStatus: 200,
};

module.exports = corsHandler;
