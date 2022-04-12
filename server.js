const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const corsHandler = require("./config/corsHandler");
const reqHandler = require("./middleware/reqHandler");
const errHandler = require("./middleware/errHandler");

const PORT = process.env.PORT || 3500;

// REQ LOG HANDLER
app.use(reqHandler);

//CORS ORIGIN RESOURCE SHARING
app.use(cors(corsHandler));

// PUBLIC ASSET
app.use("/", express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/", require("./routes/root"));

app.all("*", (req, res, next) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ error: "404 Not Found" });
	} else {
		res.type("txt").send("404 Not Found");
	}
});

// ERR LOG HANDLER
app.use(errHandler);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
