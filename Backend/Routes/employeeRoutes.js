const express = require("express");

const {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");

const validateEmployee = require("../middleware/validateEmployee");

const router = express.Router();

router.post("/", validateEmployee, createEmployee);

router.get("/", getEmployees);

router.get("/:id", getEmployeeById);

router.put("/:id", validateEmployee, updateEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;