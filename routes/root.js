const express = require("express");
const router = express.Router();
const path = require("path");
const cookieSession = require("cookie-session");
const { v4: uuid } = require("uuid");

router.use(
	cookieSession({
		name: "session",
		keys: [uuid()],
	})
);

router.get("^/$|/index(.html)?", (req, res) => {
	req.session.views = (req.session.views || 0) + 1;
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
