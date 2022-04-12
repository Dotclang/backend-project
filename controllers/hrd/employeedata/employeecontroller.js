const data = {
	employees: require("../../../data/employees.json"),
	setEmployee: function (data) {
		this.employees = data;
	},
};

const getEmployees = (req, res) => {
	res.json(data.employees);
};

const createNewEmployee = (req, res) => {
	const newEmployee = {
		ID: data.employees[data.employees.length - 1].ID + 1 || 1,
		Name: req.body.Name,
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		Description: req.body.Description,
	};

	if (!newEmployee.FirstName || !newEmployee.LastName) {
		return res
			.status(400)
			.json({ message: "First and last names are required." });
	}

	data.setEmployee([...data.employees, newEmployee]);
	res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
	const employee = data.employees.find(
		(emp) => emp.ID === parseInt(req.body.ID)
	);
	if (!employee) {
		return res
			.status(400)
			.json({ message: `Employee ID ${req.body.ID} not found` });
	}
	if (req.body.FirstName) employee.FirstName = req.body.FirstName;
	if (req.body.LastName) employee.LastName = req.body.LastName;
	const filteredArray = data.employees.filter(
		(emp) => emp.ID !== parseInt(req.body.ID)
	);
	const unsortedArray = [...filteredArray, employee];

	data.setEmployee(
		unsortedArray.sort((a, b) => (a.ID > b.ID ? 1 : a.ID < b.ID ? -1 : 0))
	);

	res.status(201).json(data.employees);
};

const deleteEmployee = (req, res) => {
	const employee = data.employees.find(
		(emp) => emp.ID === parseInt(req.body.ID)
	);
	if (!employee) {
		return res
			.status(400)
			.json({ message: `Employee ID ${req.body.ID} not found` });
	}
	const filteredArray = data.employees.filter(
		(emp) => emp.ID !== parseInt(req.body.ID)
	);
	data.setEmployee([...filteredArray]);

	res.status(201).json(data.employees);
};

const getEmployee = (req, res) => {
	const employee = data.employees.find(
		(emp) => emp.ID === parseInt(req.params.ID)
	);
	if (!employee) {
		return res
			.status(400)
			.json({ message: `Employee ID ${req.params.ID} not found` });
	}
	res.status(201).json(employee);
};

module.exports = {
	getEmployees,
	createNewEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
};
