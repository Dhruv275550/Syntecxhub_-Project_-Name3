import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { createEmployee } from "../services/employeeService";

function AddEmployee() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (employeeData) => {
        try {
            setLoading(true);
            setError("");

            await createEmployee(employeeData);

            navigate("/employees");
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to create employee"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">

            <div className="page-header">
                <div>
                    <h1>Add Employee</h1>
                    <p>Create a new employee record</p>
                </div>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="form-card">

                <EmployeeForm
                    onSubmit={handleSubmit}
                    submitText="Create Employee"
                    loading={loading}
                />

            </div>

        </div>
    );
}

export default AddEmployee;