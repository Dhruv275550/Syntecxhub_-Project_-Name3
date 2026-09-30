import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees } from "../services/employeeService";

function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                const response = await getEmployees();
                setEmployees(response.data || []);
            } catch (error) {
                console.error(error);
                setError(
                    "Unable to connect to the backend. Make sure the server is running."
                );
            } finally {
                setLoading(false);
            }
        };

        loadEmployees();
    }, []);

    const totalSalary = employees.reduce(
        (total, employee) => total + Number(employee.salary || 0),
        0
    );

    const departments = new Set(
        employees.map((employee) => employee.department)
    ).size;

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="page-container">

            <div className="page-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Employee Management System</p>
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


            <div className="stats-grid">

                <div className="stat-card">
                    <h3>Total Employees</h3>
                    <p>{employees.length}</p>
                </div>

                <div className="stat-card">
                    <h3>Departments</h3>
                    <p>{departments}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Salary</h3>
                    <p>
                        ₹{totalSalary.toLocaleString("en-IN")}
                    </p>
                </div>

            </div>


            <div className="dashboard-card">

                <h2>Employee Overview</h2>

                {employees.length === 0 ? (
                    <p>No employees available yet.</p>
                ) : (
                    <div className="recent-employees">

                        {employees.slice(0, 5).map((employee) => (
                            <div
                                className="recent-employee"
                                key={employee._id}
                            >
                                <div>
                                    <strong>{employee.name}</strong>
                                    <span>{employee.role}</span>
                                </div>

                                <span>
                                    {employee.department}
                                </span>
                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Dashboard;