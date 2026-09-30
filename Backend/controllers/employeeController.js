const mongoose = require("mongoose");
const Employee = require("../models/employee");

const createEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.create(req.body);

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: employee
        });
    } catch (error) {
        next(error);
    }
};

const getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        next(error);
    }
};


const getEmployeeById = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            data: employee
        });
    } catch (error) {
        next(error);
    }
};

const updateEmployee = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: employee
        });
    } catch (error) {
        next(error);
    }
};


// DELETE EMPLOYEE
const deleteEmployee = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            });
        }

        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};