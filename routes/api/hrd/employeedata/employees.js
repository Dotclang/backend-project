const express = require("express");
const router = express.Router();
const {
	getEmployees,
	createNewEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
} = require("../../../../controllers/hrd/employeedata/employeecontroller");

router
	.route("/")
	.get(getEmployees)
	.post(createNewEmployee)
	.put(updateEmployee)
	.delete(deleteEmployee);

router.route("/:ID?").get(getEmployee);

module.exports = router;
