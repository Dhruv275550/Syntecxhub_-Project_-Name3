import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";

import {
    getEmployeeById,
    updateEmployee
} from "../services/employeeService";

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadEmployee = async () => {
            try {
                const response = await getEmployeeById(id);

                setEmployee(response.data);
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load employee"
                );
            } finally {
                setLoading(false);
            }
        };

        loadEmployee();
    }, [id]);

    const handleSubmit = async (employeeData) => {
        try {
            setSaving(true);
            setError("");

            await updateEmployee(id, employeeData);

            navigate("/employees");
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to update employee"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading">
                    Loading employee...
                </div>
            </div>
        );
    }

    if (!employee) {
        return (
            <div className="page-container">
                <div className="error-message">
                    {error || "Employee not found"}
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">

            <div className="page-header">
                <div>
                    <h1>Edit Employee</h1>
                    <p>Update employee information</p>
                </div>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="form-card">

                <EmployeeForm
                    initialData={employee}
                    onSubmit={handleSubmit}
                    submitText="Update Employee"
                    loading={saving}
                />

            </div>

        </div>
    );
}

export default EditEmployee;