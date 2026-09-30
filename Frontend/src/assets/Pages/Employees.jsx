import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EmployeeTable from "../components/EmployeeTable";

import {
    getEmployees,
    deleteEmployee
} from "../services/employeeService";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadEmployees = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getEmployees();

            setEmployees(response.data || []);
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load employees. Check your backend server."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteEmployee(id);

            setEmployees((previousEmployees) =>
                previousEmployees.filter(
                    (employee) => employee._id !== id
                )
            );
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to delete employee"
            );
        }
    };

    return (
        <div className="page-container">

            <div className="page-header">

                <div>
                    <h1>Employees</h1>
                    <p>Manage all employees</p>
                </div>

                <Link
                    to="/employees/add"
                    className="primary-button"
                >
                    + Add Employee
                </Link>

            </div>


            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}


            {loading ? (
                <div className="loading">
                    Loading employees...
                </div>
            ) : (
                <EmployeeTable
                    employees={employees}
                    onDelete={handleDelete}
                />
            )}

        </div>
    );
}

export default Employees;