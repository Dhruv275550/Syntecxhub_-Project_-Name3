import { Link } from "react-router-dom";

function EmployeeTable({ employees, onDelete }) {
    if (employees.length === 0) {
        return (
            <div className="empty-state">
                <h3>No Employees Found</h3>
                <p>Add your first employee to get started.</p>

                <Link
                    to="/employees/add"
                    className="primary-button"
                >
                    Add Employee
                </Link>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="employee-table">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Joining Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>

                            <td>{employee.name}</td>

                            <td>{employee.email}</td>

                            <td>{employee.phone}</td>

                            <td>{employee.role}</td>

                            <td>{employee.department}</td>

                            <td>
                                ₹{Number(employee.salary).toLocaleString("en-IN")}
                            </td>

                            <td>
                                {new Date(employee.joiningDate).toLocaleDateString(
                                    "en-IN"
                                )}
                            </td>

                            <td>
                                <div className="action-buttons">

                                    <Link
                                        to={`/employees/edit/${employee._id}`}
                                        className="edit-button"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => onDelete(employee._id)}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>

                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default EmployeeTable;